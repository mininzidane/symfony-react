import LotService from 'frontend/js/api/LotService';

function calcYearMultiplier(year) {
  const age = new Date().getFullYear() - year;
  let yearMultiplier = 1;

  if (age > 2) {
    yearMultiplier = age - 1;
  }

  return Math.min(yearMultiplier, 15);
}

function calcBase(fuel, engineCapacity) {
  const { FUEL_TYPES } = LotService;
  if (
    FUEL_TYPES.GASOLINE_TYPES.includes(fuel) ||
    fuel === FUEL_TYPES.FLEXIBLE_FUEL ||
    FUEL_TYPES.HYBRID.includes(fuel)
  ) {
    return engineCapacity > 3 ? 100 : 50;
  }

  if (fuel === FUEL_TYPES.DIESEL) {
    return engineCapacity > 3 ? 150 : 75;
  }

  return NaN;
}

function calcCustomClearance(params) {
  const SHIPPING_INVOICE = 1000;

  const { refinements, values } = params;
  const { lot, lotExchangeRate, fees, exchangeRate } = values;
  const { price } = refinements;

  const invoicePrice = (price + fees.copartAuctionFees) / lotExchangeRate + SHIPPING_INVOICE;

  const engineCapacity = parseFloat(lot.engineSize);
  const base = calcBase(lot.fuel?.toUpperCase(), engineCapacity);
  const yearMultiplier = calcYearMultiplier(lot.year);

  const exciseFee = (engineCapacity * base * yearMultiplier) / exchangeRate;
  const customsFee = invoicePrice * 0.1;
  const tax = (invoicePrice + exciseFee + customsFee) * 0.2;

  return Math.round(exciseFee + customsFee + tax);
}

function calcUkraineCustomsRates(params) {
  const CUSTOMS_BROKERAGE_SERVICES_FEE = 600;
  const customClearance = calcCustomClearance(params);

  return {
    customClearance,
    brokerFee: CUSTOMS_BROKERAGE_SERVICES_FEE,
  };
}

export default { calc: calcUkraineCustomsRates };
