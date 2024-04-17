import LocationService from 'frontend/js/api/LocationService';

const DomesticLocationDestinationMask = (value) => {
  if (typeof value !== 'object') {
    return value;
  }

  return LocationService.formatCityStateZip(value.city, value.state_code, value.zip).toUpperCase();
};

export default DomesticLocationDestinationMask;
