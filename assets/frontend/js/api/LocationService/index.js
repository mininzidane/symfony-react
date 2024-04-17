import NumberService from 'frontend/js/lib/utils/NumberService';
import RouterService from 'frontend/js/api/RouterService';
import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const LocationService = {
  formatCityStateZip(city, stateCode, zip) {
    let value = '';

    if (city || stateCode) {
      value = [city, stateCode].filter(Boolean).join(', ');
    }

    if (zip) {
      value = [value, zip].filter(Boolean).join(' ');
    }

    return value;
  },

  formatStateZip(stateCode, zip) {
    return [stateCode, zip].filter(Boolean).join(' ');
  },

  formatInternationalStateCountry(state, country) {
    return `${state}, ${country}`;
  },

  getValidZip(zipcode) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildExternalEhRequestPath(`zip/${zipcode}`)).then(
      ({ data }) => data,
    );
  },

  getAllCountries() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildExternalEhRequestPath(`destination-country`)).then(
      ({ data }) => data,
    );
  },

  getDestinationsByCountry(countryId) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildExternalEhRequestPath(`destination?country=${countryId}`),
    ).then(({ data }) => data);
  },

  getPortsByDestination(destinationId, lat, lon) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildExternalEhRequestPath(`destination/${destinationId}/port?lat=${lat}&lon=${lon}`),
    ).then(({ data }) => data);
  },

  getStatesByCountry(countryId) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`countries/${countryId}/states`, true),
    ).then(({ data }) => data);
  },

  getLocationInformationByLatAndLong(lat, lon) {
    const payload = {
      latitude: NumberService.formatGeoLocationValue(lat),
      longitude: NumberService.formatGeoLocationValue(lon),
    };

    const queryString = RouterService.serializeQueryParams(payload);
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildExternalEhRequestPath(`geolocation?${queryString}`),
    ).then(({ data }) => data);
  },

  getPopularDomainsByIso2(iso2) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`countries/top-domains?country=${iso2}`, true),
    ).then(({ data }) => data);
  },
};

LocationService.STATE_CODE_CALIFORNIA = 'CA';
LocationService.SOURCE_ABM = 'abm';

export default LocationService;
