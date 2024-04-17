import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import Row from './Row';
import Total from './Total';
import Footer from './Footer';
import useStyles from './useStyles';

function Receipt() {
  const classes = useStyles();
  const { getCurrentQueryParams } = RouterService;
  const {
    bidAmount,
    hstFee,
    gstFee,
    copartFees,
    documentationFees,
    autoBidMasterTransactionFees,
    intlWirePaymentFee,
    stateTax,
    salesTaxState,
    surtax,
    groundAmount,
    groundDuration,
    groundDestination,
    oceanAmount,
    oceanDuration,
    oceanDestination,
    cargoInsurance,
    brokerFee,
    customClearance,
    discount,
    subtotal,
    finalPrice,
    exchangeRate,
    currencyCode,
    lotYear,
    lotMake,
    lotModel,
    lotId,
    lotVIN,
    lotCurrency,
  } = getCurrentQueryParams();

  const YMM = [lotYear, lotMake, lotModel].filter(Boolean).join(' ');

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <span>
          <FormattedMessage id="vehicleCalculator.finalPriceYouWillPay" />
        </span>
      </div>

      <div className={classes.content}>
        {YMM && (
          <div>
            <b>{YMM}</b>
          </div>
        )}
        {lotId && (
          <div>
            <b>
              <FormattedMessage id="shared.label.lotId" /> {lotId}
            </b>
          </div>
        )}
        {lotVIN && (
          <div>
            <b>
              <FormattedMessage id="shared.label.vin" /> {lotVIN}
            </b>
          </div>
        )}

        <Row
          title={<FormattedMessage id="vehicleCalculator.finalPriceAtAuction" />}
          value={bidAmount}
          currency={lotCurrency}
        />

        <Row title={<FormattedMessage id="shared.fee.hstTax" />} value={hstFee} currency={lotCurrency} />
        <Row title={<FormattedMessage id="shared.fee.gstTax" />} value={gstFee} currency={lotCurrency} />
        <Row
          title={<FormattedMessage id="vehicleCalculator.copartsFees" />}
          value={copartFees}
          currency={lotCurrency}
        />
        <Row
          title={<FormattedMessage id="vehicleCalculator.autoBidMasterTransactionFees" />}
          value={autoBidMasterTransactionFees}
        />
        <Row title={<FormattedMessage id="vehicleCalculator.documentationFees" />} value={documentationFees} />
        <Row title={<FormattedMessage id="shared.fee.intlWirePayment" />} value={intlWirePaymentFee} />
        <Row
          title={<FormattedMessage id="shared.fee.stateSalesTax" values={{ stateCode: salesTaxState }} />}
          value={stateTax}
        />
        <Row title={<FormattedMessage id="shared.fee.discretionarySurtax" />} value={surtax} />

        <Row
          title={
            <FormattedMessage
              id="vehicleCalculator.shippingTo"
              values={{
                destination: groundDestination,
                duration: groundDuration,
                span: (chunks) => <span>{chunks}</span>,
              }}
            />
          }
          value={groundAmount}
        />
        <Row
          title={
            <>
              <FormattedMessage
                id={
                  /NG$/.test(oceanDestination)
                    ? 'vehicleCalculator.shippingInContainerTo'
                    : 'vehicleCalculator.shippingTo'
                }
                values={{
                  destination: oceanDestination,
                  duration: oceanDuration,
                  span: (chunks) => <span>{chunks}</span>,
                }}
              />
              *
            </>
          }
          value={oceanAmount}
        />

        <Row
          title={
            <FormattedMessage
              id="vehicleCalculator.cargoInsurance"
              values={{ value: `${ShippingOrderService.CARGO_INSURANCE_PERCENTAGE}%` }}
            />
          }
          value={cargoInsurance}
        />
        <Row title={<FormattedMessage id="vehicleCalculator.brokerFee" />} value={brokerFee} />
        <Row title={<FormattedMessage id="vehicleCalculator.customClearance" />} value={customClearance} />
        <Row title={<FormattedMessage id="vehicleCalculator.discount" values={{ value: '50%' }} />} value={discount} />

        {Boolean(subtotal) && !finalPrice && (
          <div className={classes.subtotal}>
            <Row title={<FormattedMessage id="vehicleCalculator.subTotal" />} value={subtotal} />
          </div>
        )}
        {Boolean(finalPrice) && <Total value={finalPrice} />}
        <Footer exchangeRate={exchangeRate} currencyCode={currencyCode} />
      </div>
    </div>
  );
}

export default Receipt;
