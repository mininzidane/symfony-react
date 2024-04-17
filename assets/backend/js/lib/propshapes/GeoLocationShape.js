import PropTypes from 'prop-types';

const GeoLocationShape = PropTypes.shape({
  name: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  state_code: PropTypes.string,
  country: PropTypes.string,
  country_code: PropTypes.string,
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  zip: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export default GeoLocationShape;
