import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

function calcVAT(vatRateType, price) {
  const { VAT_RATE_POLAND } = ShippingOrderService;
  const vatRate = VAT_RATE_POLAND[vatRateType] ?? 0;
  return vatRate * price;
}

function calcCustomsDuty(customsDutyType, price) {
  const { CUSTOMS_DUTY_RATE_POLAND } = ShippingOrderService;
  const customsDutyRate = CUSTOMS_DUTY_RATE_POLAND[customsDutyType] ?? 0;
  return customsDutyRate * price;
}

function calcDestinationCharges(exchangeRate) {
  const DESTINATION_CHARGES = 390; // EUR
  const amountUSDollars = DESTINATION_CHARGES / exchangeRate;
  return amountUSDollars;
}

function calcCustomClearance(params) {
  const { refinements, values } = params;
  const { lotExchangeRate, countryRatesExchangeRate, shipping } = values;

  if (!shipping || !shipping.groundAmount || !shipping.oceanAmount) {
    return 0;
  }

  const { price, vatRateType, customsDutyType } = refinements;

  const priceUSDollars = price / lotExchangeRate;
  const totalAmount = priceUSDollars + shipping.groundAmount + shipping.oceanAmount;

  const vat = calcVAT(vatRateType, totalAmount);
  const customsDuty = calcCustomsDuty(customsDutyType, totalAmount);
  const destinationCharges = calcDestinationCharges(countryRatesExchangeRate);

  return { vat, customsDuty, destinationCharges };
}

function calcPolandCustomsRates(params) {
  return calcCustomClearance(params);
}

export default { calc: calcPolandCustomsRates };
