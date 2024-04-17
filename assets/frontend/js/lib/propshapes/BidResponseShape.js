import PropTypes from 'prop-types';
import BidShape from './BidShape';

const BidResponseShape = PropTypes.shape({
  title: PropTypes.string,
  result: PropTypes.string,
  message: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonUrl: PropTypes.string,
  ctaBlock: PropTypes.bool,
  reload: PropTypes.bool,
  currentCustomerBid: BidShape,
});

export default BidResponseShape;
