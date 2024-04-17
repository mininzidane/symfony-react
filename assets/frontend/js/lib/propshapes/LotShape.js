import PropTypes from 'prop-types';

const lotImageShape = PropTypes.shape({
  thumbnail: PropTypes.string,
  full: PropTypes.string,
  hdr: PropTypes.string,
});

const LotShape = PropTypes.shape({
  id: PropTypes.number,
  year: PropTypes.number,
  make: PropTypes.string,
  model: PropTypes.string,
  bodyStyle: PropTypes.string,
  color: PropTypes.string,
  primaryDamage: PropTypes.string,
  vin: PropTypes.string,
  vinHash: PropTypes.string,
  sold: PropTypes.bool,
  description: PropTypes.string,
  sealedBid: PropTypes.bool,
  largeImage: PropTypes.string,
  prebiddingClosed: PropTypes.bool,
  slug: PropTypes.string,
  images: PropTypes.arrayOf(lotImageShape),
  currentBid: PropTypes.number,
  odometerBrand: PropTypes.string,
  viewAccessIfSold: PropTypes.bool,
  inventoryAuction: PropTypes.string,
});

export default LotShape;
