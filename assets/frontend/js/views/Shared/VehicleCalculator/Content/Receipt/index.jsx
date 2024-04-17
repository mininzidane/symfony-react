import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import LotService from 'frontend/js/api/LotService';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import VATSelect from './CountryRates/VATSelect';
import CustomsDutySelect from './CountryRates/CustomsDutySelect';
import CargoInsurance from './CargoInsurance';
import Row from './Row';
import Footer from './Footer';
import useStyles from './useStyles';

function Receipt() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { values, config, refinements } = useContext(CalculatorContext);
  const { receipt } = config;
  const {
    price,
    insurance,
    shipping,
    fees,
    electricFee,
    countryRates,
    lot,
    unlimitedAuctionStorage,
    countryRatesExchangeRate,
  } = values;

  const { inventoryAuction = LotService.AUCTION_COPART } = lot || {};

  return (
    <>
      <div className={classes.rows}>
        {theme.isLegacyView && (
          <div className={classes.title}>
            <FormattedMessage id="lotsWonPage.shippingOrder" />
          </div>
        )}
        {receipt.price && (
          <Row
            title={<FormattedMessage id="vehicleCalculator.finalPriceAtAuction" />}
            tooltip={<FormattedMessage id="vehicleCalculator.tooltip.finalPriceAtAuction" />}
            value={price}
            currency={lot && lot.currency}
            required
          />
        )}
        {receipt.fees && (
          <>
            <Row
              title={<FormattedMessage id="shared.fee.hstTax" />}
              value={fees.hstFee}
              currency={lot && lot.currency}
            />
            <Row
              title={<FormattedMessage id="shared.fee.gstTax" />}
              value={fees.gstFee}
              currency={lot && lot.currency}
            />
            {inventoryAuction === LotService.AUCTION_IAA ? (
              <Row
                title={<FormattedMessage id="shared.fee.auctionFees" />}
                value={fees.copartAuctionFees}
                currency={lot && lot.currency}
                required
              />
            ) : (
              <Row
                title={<FormattedMessage id="vehicleCalculator.copartsFees" />}
                tooltip={<FormattedMessage id="vehicleCalculator.tooltip.copartsFees" />}
                value={fees.copartAuctionFees}
                currency={lot && lot.currency}
                required
              />
            )}
            <Row
              title={<FormattedMessage id="vehicleCalculator.autoBidMasterTransactionFees" />}
              tooltip={<FormattedMessage id="vehicleCalculator.tooltip.autoBidMasterTransactionFees" />}
              value={fees.transactionFee}
              currency={lot && lot.currencyFeeFormat}
              required
            />
            <Row
              title={<FormattedMessage id="vehicleCalculator.documentationFees" />}
              tooltip={<FormattedMessage id="vehicleCalculator.tooltip.documentationFees" />}
              value={fees.documentationFee}
              currency={lot && lot.currencyFeeFormat}
            />
            <Row
              title={<FormattedMessage id="vehicleCalculator.inspectionFee" />}
              tooltip={<FormattedMessage id="vehicleCalculator.tooltip.inspectionFee" />}
              value={fees.inspectionFee}
              currency={lot && lot.currencyFeeFormat}
            />
            <Row
              title={<FormattedMessage id="shared.fee.intlWirePayment" />}
              value={fees.intlWirePaymentFee}
              currency={lot && lot.currencyFeeFormat}
            />
            <Row
              title={<FormattedMessage id="shared.fee.stateSalesTax" values={{ stateCode: fees.salesTaxState }} />}
              value={fees.stateTax}
              currency={lot && lot.currencyFeeFormat}
            />
            <Row
              title={<FormattedMessage id="shared.fee.discretionarySurtax" />}
              value={fees.surtax}
              currency={lot && lot.currencyFeeFormat}
            />
          </>
        )}
        {receipt.electricFee && (
          <Row
            title={<FormattedMessage id="shared.fee.EVHybridFee" />}
            tooltip={<FormattedMessage id="vehicleCalculator.tooltip.EVHybridFee" />}
            value={electricFee}
            currency={lot && lot.currencyFeeFormat}
          />
        )}
        {receipt.unlimitedAuctionStorage && (
          <Row
            title={<FormattedMessage id="vehicleCalculator.unlimitedAuctionStorage" />}
            tooltip={<FormattedMessage id="vehicleCalculator.tooltip.unlimitedAuctionStorage" />}
            value={unlimitedAuctionStorage}
            currency={lot && lot.currencyFeeFormat}
            field="unlimitedAuctionStorage"
          />
        )}
        {receipt.shipping && (
          <div className={classes.highlighted}>
            {!shipping.total ? (
              <Row
                title={<FormattedMessage id="shared.fee.shippingCost" />}
                currency={lot && lot.currencyFeeFormat}
                required
              />
            ) : (
              <>
                <Row
                  title={
                    <FormattedMessage
                      id="vehicleCalculator.shippingTo"
                      values={{
                        destination: shipping.groundDestination,
                        duration: shipping.groundDuration,
                        span: (chunks) => <span style={{ color: '#828282' }}>{chunks}</span>,
                      }}
                      currency={lot && lot.currencyFeeFormat}
                    />
                  }
                  tooltip={
                    <FormattedMessage
                      id="vehicleCalculator.tooltip.shippingToGround"
                      values={{ destination: shipping.groundDestination }}
                    />
                  }
                  value={shipping.groundAmount}
                  currency={lot && lot.currencyFeeFormat}
                  required
                />
                <Row
                  title={
                    <FormattedMessage
                      id={
                        /NG$/.test(shipping.oceanDestination)
                          ? 'vehicleCalculator.shippingInContainerTo'
                          : 'vehicleCalculator.shippingTo'
                      }
                      values={{
                        destination: shipping.oceanDestination,
                        duration: shipping.oceanDuration,
                        span: (chunks) => <span style={{ color: '#828282' }}>{chunks}</span>,
                      }}
                    />
                  }
                  tooltip={<FormattedMessage id="vehicleCalculator.tooltip.shippingToOcean" />}
                  value={shipping.oceanAmount}
                  currency={lot && lot.currencyFeeFormat}
                />
                {shipping.fees?.peakSeasonFee && (
                  <Row
                    title={<FormattedMessage id="shippingCalculator.peakSeasonFee" />}
                    tooltip={<FormattedMessage id="shippingCalculator.tooltip.peakSeasonFee" />}
                    value={shipping.fees.peakSeasonFee}
                    currency={lot && lot.currencyFeeFormat}
                  />
                )}
                {shipping.fees?.terminalHandlingCharge && (
                  <Row
                    title={<FormattedMessage id="shippingCalculator.terminalHandlingCharge" />}
                    value={shipping.fees.terminalHandlingCharge}
                    currency={lot && lot.currencyFeeFormat}
                  />
                )}
                {shipping.fees?.unloadingFeeInPotiGeorgia && (
                  <Row
                    title={<FormattedMessage id="shippingCalculator.unloadingFeeInPotiGeorgia" />}
                    value={shipping.fees.unloadingFeeInPotiGeorgia}
                    currency={lot && lot.currencyFeeFormat}
                  />
                )}
              </>
            )}
          </div>
        )}
        {insurance && (
          <div className={classes.highlighted}>
            <CargoInsurance />
          </div>
        )}
        {receipt.countryRates && (
          <>
            <Row
              title={<FormattedMessage id="vehicleCalculator.brokerFee" />}
              tooltip={<FormattedMessage id="vehicleCalculator.tooltip.brokerFee" />}
              value={countryRates.brokerFee}
              currency={lot && lot.currencyFeeFormat}
              field="brokerFee"
            />
            <Row
              title={<FormattedMessage id="vehicleCalculator.customClearance" />}
              tooltip={<FormattedMessage id="vehicleCalculator.tooltip.customClearance" />}
              value={countryRates.customClearance}
              currency={lot && lot.currencyFeeFormat}
              field="customClearance"
            />
            {Boolean(refinements.customsDutyType) && (
              <Row
                title={<FormattedMessage id="vehicleCalculator.customsDuty" />}
                tooltip={<FormattedMessage id="vehicleCalculator.tooltip.customsDuty" />}
                value={countryRates.customsDuty * countryRatesExchangeRate}
                currency={refinements.countryRatesCurrency}
                input={<CustomsDutySelect />}
                required
                hasAsterisk
              />
            )}
            {refinements.vatRateType ? (
              <Row
                title={<FormattedMessage id="vehicleCalculator.vat" />}
                tooltip={<FormattedMessage id="vehicleCalculator.tooltip.vat" />}
                value={countryRates.vat * countryRatesExchangeRate}
                currency={refinements.countryRatesCurrency || (lot && lot.currencyFeeFormat)}
                input={<VATSelect />}
                required
                hasAsterisk
              />
            ) : (
              <Row
                title={<FormattedMessage id="vehicleCalculator.vat" />}
                value={countryRates.vat}
                currency={lot && lot.currencyFeeFormat}
                field="vat"
              />
            )}
            {countryRates.destinationCharges && (
              <Row
                title={<FormattedMessage id="vehicleCalculator.destinationCharges" />}
                tooltip={<FormattedMessage id="vehicleCalculator.tooltip.destinationCharges" />}
                value={countryRates.destinationCharges * countryRatesExchangeRate || 0}
                currency={refinements.countryRatesCurrency || (lot && lot.currencyFeeFormat)}
                hasAsterisk
              />
            )}
            <Row
              title={<FormattedMessage id="vehicleCalculator.discount" values={{ value: '50%' }} />}
              tooltip={<FormattedMessage id="vehicleCalculator.tooltip.discount" />}
              value={countryRates.discount}
              currency={lot && lot.currencyFeeFormat}
              field="discount"
            />
          </>
        )}
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </>
  );
}

export default Receipt;
