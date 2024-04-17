import PropTypes from 'prop-types';
import InvoiceShape from './InvoiceShape';
import LocationShape from './LocationShape';

const LotPurchaseShape = PropTypes.shape({
  token: PropTypes.string,
  paymentDueDate: PropTypes.string,
  pickupBy: PropTypes.string,
  pickedUp: PropTypes.string,
  invoice: InvoiceShape,
  saleLocation: LocationShape,
});

export default LotPurchaseShape;
