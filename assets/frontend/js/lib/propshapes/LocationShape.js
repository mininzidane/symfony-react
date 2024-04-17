import PropTypes from 'prop-types';

const LocationShape = PropTypes.shape({
  name: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.string,
  state_code: PropTypes.string,
});

export default LocationShape;
