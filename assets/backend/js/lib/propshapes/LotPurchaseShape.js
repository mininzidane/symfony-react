import PropTypes from 'prop-types';

const LotPurchaseShape = PropTypes.shape({
  id: PropTypes.string,
  vehicleYearMakeModel: PropTypes.string,
  price: PropTypes.string,
  shipping: PropTypes.shape({
    id: PropTypes.number,
    destination: PropTypes.string,
    quote: PropTypes.number,
    oceanQuote: PropTypes.number,
    isCancelled: PropTypes.bool,
    isShipped: PropTypes.bool,
    isComplete: PropTypes.bool,
    isPaid: PropTypes.bool,
    invoiceUrl: PropTypes.string,
    isCancellable: PropTypes.bool,
  }),
  lot: PropTypes.shape({
    id: PropTypes.number,
    vin: PropTypes.string,
    locationId: PropTypes.number,
    locationZip: PropTypes.string,
    locationState: PropTypes.string,
    locationStateCode: PropTypes.string,
    locationCity: PropTypes.string,
    locationPhone: PropTypes.string,
    locationName: PropTypes.string,
    locationLat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    locationLon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isDrivable: PropTypes.bool,
    images: PropTypes.array,
  }),
  invoice: PropTypes.shape({
    isPaid: PropTypes.bool,
  }),
});

export default LotPurchaseShape;
