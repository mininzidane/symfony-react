import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import CountryCodeService from 'frontend/js/lib/utils/CountryCodeService';
import BaseApiService from '../BaseApiService';
import RouterService from '../RouterService';
import CustomerService from '../CustomerService';
import LocationService from '../LocationService';

function addIpDetectionFlag(userLocation) {
  if (!userLocation || typeof userLocation !== 'object') {
    return userLocation;
  }

  userLocation.isDetectedByIp = true;

  return userLocation;
}

function validateLocationObject(location) {
  return location && (location.zip !== undefined || location.destination !== undefined);
}

class UserLocationService extends BaseApiService {
  constructor() {
    super();

    this.customerLocationStorageKey = 'Abm::CustomerLocation';
    this.shippingLocationStorageKey = 'Abm::ShippingLocation';
    this.geoLocationStorageKey = 'Abm::GeoLocation';

    this.customerService = CustomerService;
    this.locationService = LocationService;
  }

  getUserLocation() {
    return LocalStorageService.get(this.customerLocationStorageKey);
  }

  setUserLocation(userLocation) {
    if (validateLocationObject(userLocation)) {
      LocalStorageService.set(this.customerLocationStorageKey, userLocation);
    }

    return this;
  }

  getShippingLocation() {
    return LocalStorageService.get(this.shippingLocationStorageKey);
  }

  setShippingLocation(userLocation) {
    if (validateLocationObject(userLocation)) {
      LocalStorageService.set(this.shippingLocationStorageKey, userLocation);
    }

    return this;
  }

  isUserNigerian() {
    const currentLocation = this.getUserLocation();
    const ngCountryCode = CountryCodeService.getIso2Code('Nigeria');

    return currentLocation && currentLocation.country_code === ngCountryCode;
  }

  async retrieveUserLocation(detectOnly = false) {
    let userLocation = this.getUserLocation();
    if (userLocation) {
      return userLocation;
    }

    if (!detectOnly) {
      userLocation = await this.requestUserProfileLocation(true);
    }

    if (!userLocation) {
      userLocation = await this.requestDetectedLocation(true);
    }

    return userLocation;
  }

  async requestUserProfileLocation(persist = false) {
    try {
      const userLocation = await this.customerService.getCustomerData().then(({ data }) => {
        if (validateLocationObject(data.contents.location)) {
          return data.contents.location;
        }

        return undefined;
      });

      if (userLocation && persist) {
        this.setUserLocation(userLocation);
      }

      return userLocation;
    } catch (e) {
      /** Ignore */
    }

    return undefined;
  }

  async requestDetectedLocation(persist = false) {
    try {
      const pos = await this.getUserGeoLocation();

      let userLocation = await this.locationService.getLocationInformationByLatAndLong(pos.latitude, pos.longitude);
      if (userLocation) {
        userLocation.lat = pos.latitude;
        userLocation.lon = pos.longitude;
        userLocation = addIpDetectionFlag(userLocation);

        if (persist) {
          this.setUserLocation(userLocation);
        }
      }

      return userLocation;
    } catch (e) {
      /** Ignore */
    }

    return undefined;
  }

  async getUserGeoLocation() {
    let geoLocation = LocalStorageService.get(this.geoLocationStorageKey);

    if (geoLocation) {
      return geoLocation;
    }

    let queryString = '';
    const detectedIp = RouterService.getQueryParam('ip_address');
    if (detectedIp) {
      queryString += `?ip_address=${detectedIp}`;
    }

    geoLocation = await this.get(this.buildExternalEhRequestPath(`geo/detect${queryString}`)).then(({ data }) => data);

    if (geoLocation && geoLocation.latitude && geoLocation.longitude) {
      LocalStorageService.set(this.geoLocationStorageKey, geoLocation);
    }

    return geoLocation;
  }

  async getLocationByZipCode(zipcode) {
    return this.get(this.buildRequestPath(`member/location/${zipcode}`)).then(({ data }) => data?.data?.contents);
  }
}

export default UserLocationService;
