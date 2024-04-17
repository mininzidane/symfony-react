import PropTypes from 'prop-types';

const BidShape = PropTypes.shape({
  currentBid: PropTypes.number,
  maxBid: PropTypes.number,
  status: PropTypes.string,
  addedAt: PropTypes.string,
  lostAt: PropTypes.string,
  active: PropTypes.bool,
});

export default BidShape;
