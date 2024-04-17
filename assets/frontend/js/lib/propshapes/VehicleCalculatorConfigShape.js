import PropTypes from 'prop-types';

const VehicleCalculatorConfigShape = PropTypes.shape({
  input: PropTypes.shape({
    price: PropTypes.bool,
    lotId: PropTypes.bool,
    auctionLocationId: PropTypes.bool,
    vehicleType: PropTypes.bool,
    countryId: PropTypes.bool,
    destinationId: PropTypes.bool,
    USPortId: PropTypes.bool,
  }),
  receipt: PropTypes.shape({
    price: PropTypes.bool,
    fees: PropTypes.bool,
    shipping: PropTypes.bool,
    insurance: PropTypes.bool,
    electricFee: PropTypes.bool,
    vat: PropTypes.bool,
    countryRates: PropTypes.bool,
    subTotal: PropTypes.bool,
  }),
  preorder: PropTypes.bool,
});

export default VehicleCalculatorConfigShape;
