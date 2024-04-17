import LotService from 'frontend/js/api/LotService';

function calcCustomsDutyRate(age, engineCapacity, price) {
  if (age < 3) {
    const rate =
      price *
      {
        [price <= 8500]: 0.54,
        [price > 8501 && price <= 16700]: 0.48,
        [price > 16700 && price <= 42300]: 0.48,
        [price > 42300 && price <= 84500]: 0.48,
        [price > 84500 && price <= 169000]: 0.48,
        [price > 169000]: 0.48,
      }.true;
    const minimalRate =
      engineCapacity *
      {
        [price <= 8500]: 2.5,
        [price > 8501 && price <= 16700]: 3.5,
        [price > 16700 && price <= 42300]: 5.5,
        [price > 42300 && price <= 84500]: 7.5,
        [price > 84500 && price <= 169000]: 15,
        [price > 169000]: 20,
      }.true;

    return Math.max(rate, minimalRate);
  }

  if (age >= 3 && age < 5) {
    return (
      engineCapacity *
      {
        [engineCapacity <= 1000]: 1.5,
        [engineCapacity > 1001 && engineCapacity <= 1500]: 1.7,
        [engineCapacity > 1501 && engineCapacity <= 1800]: 2.5,
        [engineCapacity > 1801 && engineCapacity <= 2300]: 2.7,
        [engineCapacity > 2301 && engineCapacity <= 3000]: 3,
        [engineCapacity > 3001]: 3.6,
      }.true
    );
  }

  if (age > 5) {
    return (
      engineCapacity *
      {
        [engineCapacity <= 1000]: 3,
        [engineCapacity > 1001 && engineCapacity <= 1500]: 3.2,
        [engineCapacity > 1501 && engineCapacity <= 1800]: 3.5,
        [engineCapacity > 1801 && engineCapacity <= 2300]: 4.8,
        [engineCapacity > 2301 && engineCapacity <= 3000]: 5,
        [engineCapacity > 3001]: 5.7,
      }.true
    );
  }

  return 0;
}

function calcCustomClearance(params) {
  const CUSTOMS_DUTY = 47;

  const { refinements, values } = params;
  const { fees, lot, exchangeRate, lotExchangeRate } = values;
  const { price, vehicleCategory } = refinements;

  const year = parseInt(lot.year, 10);
  const priceUSDollars = price / lotExchangeRate;

  if (LotService.isMotorcycle(vehicleCategory)) {
    // trying to get engine size from model
    const cc = parseFloat((lot.model || '').replace(/^\D+/g, ''));
    const rate = cc <= 800 ? 0.428 : 0.416;
    const vehicleCost = priceUSDollars + fees.copartAuctionFees / lotExchangeRate;

    return Math.round(vehicleCost * rate);
  }

  const isElectric = lot.fuel?.toUpperCase() === LotService.FUEL_TYPES.ELECTRIC || lot.engineSize === 'U';
  if (isElectric && year <= 2022) {
    return CUSTOMS_DUTY;
  }

  const age = new Date().getFullYear() - year;
  const engineCapacity = parseFloat(lot.engineSize) * 1000;
  const customsDutyRate = calcCustomsDutyRate(age, engineCapacity, priceUSDollars * exchangeRate) / exchangeRate;

  return Math.round(customsDutyRate + CUSTOMS_DUTY);
}

function calcBelarusCustomsRates(params) {
  const customClearance = calcCustomClearance(params);

  return {
    customClearance,
    discount: Math.round(-customClearance * 0.5),
  };
}

export default { calc: calcBelarusCustomsRates };
