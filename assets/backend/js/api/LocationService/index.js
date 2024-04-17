import NumberService from 'backend/js/lib/utils/NumberService';
import RouterService from 'backend/js/api/RouterService';
import BaseApiService from 'backend/js/api/BaseApiService';

class LocationService extends BaseApiService {
  static formatCityStateZip(city, stateCode, zip) {
    let value = '';

    if (city || stateCode) {
      value = [city, stateCode].filter(Boolean).join(', ');
    }

    if (zip) {
      value = [value, zip].filter(Boolean).join(' ');
    }

    return value;
  }

  static formatStateZip(stateCode, zip) {
    return [stateCode, zip].filter(Boolean).join(' ');
  }

  static formatInternationalStateCountry(state, country) {
    return `${state}, ${country}`;
  }

  getValidZip(zipcode) {
    return this.get(this.buildExternalEhRequestPath(`zip/${zipcode}`)).then(({ data }) => data);
  }

  getAllCountries() {
    return this.get(this.buildExternalEhRequestPath(`destination-country`)).then(({ data }) => data);
  }

  getCountriesList() {
    return this.get(this.buildRequestPath(`countries`, true)).then(({ data }) => data);
  }

  getDestinationsByCountry(countryId) {
    return this.get(this.buildExternalEhRequestPath(`destination?country=${countryId}`)).then(({ data }) => data);
  }

  getPortsByDestination(destinationId, lat, lon) {
    return this.get(this.buildExternalEhRequestPath(`destination/${destinationId}/port?lat=${lat}&lon=${lon}`)).then(
      ({ data }) => data,
    );
  }

  getStatesByCountry(countryId) {
    return this.get(this.buildRequestPath(`countries/${countryId}/states`, true)).then(({ data }) => data);
  }

  getLocationInformationByLatAndLong(lat, lon) {
    const payload = {
      latitude: NumberService.formatGeoLocationValue(lat),
      longitude: NumberService.formatGeoLocationValue(lon),
    };

    const queryString = RouterService.serializeQueryParams(payload);
    return this.get(this.buildExternalEhRequestPath(`geolocation?${queryString}`)).then(({ data }) => data);
  }

  getLocationDetailsByAuctionAndSource(auction, sourceId) {
    return this.get(this.buildRequestPath(`inventory-location/${auction}/${sourceId}`, true)).then(({ data }) => data);
  }
}

LocationService.COUNTRY_US = 'US';
LocationService.STATE_CODE_CALIFORNIA = 'CA';

export default LocationService;
