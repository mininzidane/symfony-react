import BootstrapService from 'frontend/js/api/BootstrapService';
import get from 'lodash/get';

const OfficeLocationsService = {
  getOfficeLocations() {
    return Object.values(BootstrapService.getAppValue('officeLocations') || {});
  },

  getIntlOfficeLocation() {
    return BootstrapService.getAppValue('intlOfficeLocation') || {};
  },

  getOfficeCountryIso2List() {
    const officeLocations = OfficeLocationsService.getOfficeLocations();
    return officeLocations.map((v) => get(v, 'country.iso_2'));
  },

  getOfficeData(iso2) {
    const officeLocations = OfficeLocationsService.getOfficeLocations();
    return iso2 ? officeLocations.find((d) => get(d, 'country.iso_2') === iso2) : this.getIntlOfficeLocation();
  },
};

export default OfficeLocationsService;
