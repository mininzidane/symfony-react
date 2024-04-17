import PropTypes from 'prop-types';

const CustomerParentShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  customers: PropTypes.arrayOf(PropTypes.object),
});

export default CustomerParentShape;
