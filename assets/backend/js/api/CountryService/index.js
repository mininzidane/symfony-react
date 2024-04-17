import BaseApiService from '../BaseApiService';

class CountryService extends BaseApiService {
  getCountries() {
    return this.get(this.buildProtectedRequestPath(`api/v1/countries`)).then((data) => data);
  }

  getStates(countryId) {
    return this.get(this.buildProtectedRequestPath(`api/v1/country/${countryId}/states`)).then((data) => data);
  }
}

CountryService.COUNTRIES = {
  usa: { name: 'USA', code: 223, iso2: 'US', iso3: 'USA' },
  unitedKingdom: { name: 'United Kingdom', code: 222, iso2: 'GB', iso3: 'GBR' },
  bulgaria: { name: 'Bulgaria', code: 33, iso2: 'BG', iso3: 'BGR' },
};

export default CountryService;
