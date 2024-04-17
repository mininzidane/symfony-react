function calcCustomClearance(params) {
  const LOWER_PRICE_THRESHOLD = 3000;
  const MIN_FEE_AMOUNT = 600000;
  const { refinements, values } = params;
  const { lot, lotExchangeRate, exchangeRate } = values;
  const { price } = refinements;

  const priceUSDollars = price / lotExchangeRate;

  let customsFee;

  if (lot.year <= 2010) {
    customsFee = priceUSDollars <= LOWER_PRICE_THRESHOLD ? MIN_FEE_AMOUNT / exchangeRate : priceUSDollars * 0.6;
  } else {
    customsFee = priceUSDollars * (lot.year >= 2016 ? 0.7 : 0.6);
  }

  const vat = priceUSDollars * 0.075;

  return Math.round(customsFee + vat);
}

function calcNigeriaCustomsRates(params) {
  const CUSTOMS_BROKERAGE_SERVICES_FEE = 125;
  const customClearance = calcCustomClearance(params);

  return {
    customClearance,
    brokerFee: CUSTOMS_BROKERAGE_SERVICES_FEE,
  };
}

export default { calc: calcNigeriaCustomsRates };
