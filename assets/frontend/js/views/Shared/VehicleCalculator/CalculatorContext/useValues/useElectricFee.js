import get from 'lodash/get';
import CountryService from 'frontend/js/api/CountryService';
import LotService from 'frontend/js/api/LotService';

function useElectricFee({ values }) {
  const isIntl = !CountryService.isDomestic();
  if (!isIntl || values.auction === LotService.AUCTION_COPART_DE) {
    return 0;
  }
  const { FUEL_TYPES } = LotService;
  const ELECTRIC_FEE_AMOUNT = 100;

  const fuel = get(values, 'lot.fuel', '')?.toUpperCase();
  return [FUEL_TYPES.ELECTRIC, FUEL_TYPES.HYBRID].flat().includes(fuel) ? ELECTRIC_FEE_AMOUNT : 0;
}

export default useElectricFee;
