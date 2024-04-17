import LotService from 'frontend/js/api/LotService';
import CountryService from 'frontend/js/api/CountryService';

function calcVehicleCategory(vehicleCategory, price) {
  if (LotService.isAutomobile(vehicleCategory)) {
    return price * 0.1;
  }

  if (LotService.isMotorcycle(vehicleCategory)) {
    return price * 0.06;
  }

  if (LotService.isTruck(vehicleCategory)) {
    return price * 0.22;
  }

  if (LotService.isJetSki(vehicleCategory) || LotService.isBoat(vehicleCategory)) {
    return price * 0.017;
  }

  return NaN;
}

function calcVAT(countryId, price) {
  const vatRate =
    {
      [CountryService.COUNTRIES.germany.code]: 0.19,
      [CountryService.COUNTRIES.netherlands.code]: 0.21,
    }[countryId] || 0;
  return vatRate * price;
}

function calcEngine(engineCapacity, price) {
  if (!engineCapacity || !price) {
    return 0;
  }
  return price * (engineCapacity > 2 ? 0.186 : 0.031);
}

function isClassicCar(year) {
  const age = new Date().getFullYear() - year;
  return age > 30;
}

function calcCustomClearance(params) {
  const { refinements, values } = params;
  const { lotExchangeRate, shipping, lot } = values;

  if (!shipping || !shipping.groundAmount || !shipping.oceanAmount) {
    return 0;
  }

  if (isClassicCar(lot.year)) {
    return 0;
  }

  const { price, vehicleCategory, countryId } = refinements;
  const priceUSDollars = price / lotExchangeRate;
  const engineCapacity = parseFloat(lot.engineSize);

  const totalAmount = priceUSDollars + shipping.groundAmount + shipping.oceanAmount;

  const vehicleCategoryFee = calcVehicleCategory(vehicleCategory, totalAmount);
  const engineFee = calcEngine(engineCapacity, totalAmount);

  const customClearance = Math.round(vehicleCategoryFee + engineFee) || 0;
  const vat = calcVAT(countryId, totalAmount);

  return { vat, customClearance };
}

function calcEUCustomsRates(params) {
  return calcCustomClearance(params);
}

export default { calc: calcEUCustomsRates };
