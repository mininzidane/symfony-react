import PropTypes from 'prop-types';

const ShippingOrderShape = PropTypes.shape({
  createdAt: PropTypes.string,
  destination: PropTypes.string,
  groundQuote: PropTypes.number,
  oceanQuote: PropTypes.number,
  orderInformation: PropTypes.object,
  orderStatus: PropTypes.string,
  token: PropTypes.string,
  updatedAt: PropTypes.string,
});

export default ShippingOrderShape;
