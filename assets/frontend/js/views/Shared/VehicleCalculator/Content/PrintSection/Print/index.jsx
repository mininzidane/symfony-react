import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import ButtonLink from 'frontend/js/components/ButtonLink';
import PrintSvg from './img/print.svg';
import useStyles from './useStyles';

function Print() {
  const classes = useStyles();
  const { values, isRateEnabled } = useContext(CalculatorContext);
  const {
    price,
    shipping,
    fees,
    countryRates,
    total,
    subTotal,
    exchangeRate,
    currency,
    insurance,
    electricFee,
    vat,
    lot,
  } = values;
  const { groundAmount, groundDuration, groundDestination, oceanAmount, oceanDuration, oceanDestination } = shipping;

  const params = {
    bidAmount: price,
    hstFee: fees.hstFee,
    gstFee: fees.gstFee,
    copartFees: fees.copartAuctionFees,
    documentationFees: fees.documentationFee,
    autoBidMasterTransactionFees: fees.transactionFee,
    intlWirePaymentFee: fees.intlWirePaymentFee,
    stateTax: fees.stateTax,
    salesTaxState: fees.salesTaxState,
    surtax: fees.surtax,
    groundAmount,
    groundDuration,
    groundDestination,
    oceanAmount,
    oceanDuration,
    oceanDestination,
    cargoInsurance: isRateEnabled('insurance') && insurance,
    brokerFee: isRateEnabled('brokerFee') && countryRates.brokerFee,
    electricFee: isRateEnabled('electricFee') && electricFee,
    vat: isRateEnabled('vat') && vat,
    customClearance: isRateEnabled('customClearance') && countryRates.customClearance,
    discount: isRateEnabled('discount') && countryRates.discount,
    subtotal: subTotal,
    finalPrice: total,
    exchangeRate,
    currencyCode: currency,
  };

  if (lot) {
    params.lotYear = lot.year;
    params.lotMake = lot.make;
    params.lotModel = lot.model;
    params.lotId = lot.id;
    params.lotVIN = lot.vin;
    params.lotCurrency = lot.currency;
  }

  function handleClick() {
    const url = RouterService.getRoute('vehicleCalculatorPrint', params);

    window.open(url, '_blank');
  }

  return (
    <ButtonLink
      onClick={handleClick}
      label={
        <span className={classes.root}>
          <img width="20" height="18" src={PrintSvg} className={classes.icon} alt="Print" />

          <span className={classes.label}>
            <FormattedMessage id="vehicleCalculator.print" />
          </span>
        </span>
      }
    />
  );
}

export default Print;
