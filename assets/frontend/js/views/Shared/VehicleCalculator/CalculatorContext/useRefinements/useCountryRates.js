import LotService from 'frontend/js/api/LotService';
import CountryService from 'frontend/js/api/CountryService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import CurrencyService from 'frontend/js/api/CurrencyService';

function getCustomsDutyTypeDefault(vehicleCategory) {
  const { CUSTOMS_DUTY_TYPES } = ShippingOrderService;

  if (LotService.isAutomobile(vehicleCategory)) {
    return CUSTOMS_DUTY_TYPES.CAR;
  }

  if (LotService.isMotorcycle(vehicleCategory)) {
    return CUSTOMS_DUTY_TYPES.MOTORCYCLE;
  }

  if (LotService.isTruck(vehicleCategory)) {
    return CUSTOMS_DUTY_TYPES.TRUCK;
  }

  if (LotService.isJetSki(vehicleCategory) || LotService.isBoat(vehicleCategory)) {
    return CUSTOMS_DUTY_TYPES.BOAT_AND_JET_SKI;
  }

  return CUSTOMS_DUTY_TYPES.CAR;
}

function useCountryRates(refinements) {
  if (!refinements.countryId) {
    return null;
  }

  if (refinements.countryId === CountryService.COUNTRIES.poland.code) {
    const vatRateType = refinements.vatRateType || ShippingOrderService.VAT_RATE_TYPE_DEFAULT_POLAND;
    const customsDutyType = refinements.customsDutyType || getCustomsDutyTypeDefault(refinements.vehicleCategory);

    return { vatRateType, customsDutyType, currency: CurrencyService.CURRENCY_EUR };
  }

  return null;
}

export default useCountryRates;
