import PropTypes from 'prop-types';

const DestinationShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  preferred: PropTypes.bool,
});

export default DestinationShape;
