import React, { useContext } from 'react';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import CallRequiredBanner from './CallRequiredBanner';
import Summary from './Summary';

function Footer() {
  const { values, config } = useContext(CalculatorContext);
  const { receipt } = config;

  const { lot, shipping, fees, total, subTotal } = values;
  const isSummaryReady = Object.keys(fees).length > 0 && shipping.isLoaded;

  const isFinalPrice = total && isSummaryReady;
  const showSummary = isFinalPrice || (receipt.subTotal && subTotal !== total);

  const amount = isFinalPrice ? total : subTotal;

  return (
    <>
      {showSummary && <Summary value={amount} isFinalPrice={isFinalPrice} currency={lot && lot.currencyFeeFormat} />}
      {isSummaryReady && total !== subTotal && <CallRequiredBanner />}
    </>
  );
}

export default Footer;
