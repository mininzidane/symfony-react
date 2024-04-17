import PropTypes from 'prop-types';

const CountryShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  iso_2: PropTypes.string,
  type: PropTypes.string,
});

export default CountryShape;
