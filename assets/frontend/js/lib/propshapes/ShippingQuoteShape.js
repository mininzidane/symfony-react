import PropTypes from 'prop-types';

const ShippingQuoteShape = PropTypes.shape({
  destination: PropTypes.shape({
    country: PropTypes.shape({
      id: PropTypes.number,
      iso_2: PropTypes.string,
      name: PropTypes.string,
    }),
    id: PropTypes.number,
    name: PropTypes.string,
    zip: PropTypes.shape({
      city: PropTypes.string,
      state_code: PropTypes.string,
      zip: PropTypes.string,
    }),
  }),
  origin: PropTypes.shape({
    city: PropTypes.string,
    state_code: PropTypes.string,
    zip: PropTypes.string,
  }),
  quote: PropTypes.shape({
    ground: PropTypes.number,
    ocean: PropTypes.number,
    total: PropTypes.number,
    ref_id: PropTypes.string,
    url: PropTypes.string,
  }),
  transit: PropTypes.shape({
    ground: PropTypes.string,
    ocean: PropTypes.string,
  }),
  us_port: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    preferred: PropTypes.bool,
  }),
  type: PropTypes.string,
  additionalCharges: PropTypes.object,
});

export default ShippingQuoteShape;
