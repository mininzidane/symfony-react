import CountryService from 'frontend/js/api/CountryService';
import Belarus from './Belarus';
import Ukraine from './Ukraine';
import Nigeria from './Nigeria';
import ElSalvador from './ElSalvador';
import Poland from './Poland';
import EU from './EU'; // Germany, Netherlands

function useCountryRates(params) {
  if (!params.values.lot) {
    return {};
  }

  const calc = {
    [CountryService.COUNTRIES.belarus.code]: Belarus.calc,
    [CountryService.COUNTRIES.ukraine.code]: Ukraine.calc,
    [CountryService.COUNTRIES.nigeria.code]: Nigeria.calc,
    [CountryService.COUNTRIES.elSalvador.code]: ElSalvador.calc,
    [CountryService.COUNTRIES.poland.code]: Poland.calc,
    [CountryService.COUNTRIES.germany.code]: EU.calc,
    [CountryService.COUNTRIES.netherlands.code]: EU.calc,
  }[params.refinements.countryId];

  return calc ? calc(params) : {};
}

export default useCountryRates;
