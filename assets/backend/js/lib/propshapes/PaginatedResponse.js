import PropTypes from 'prop-types';

const PaginatedResponse = PropTypes.shape({
  currentPage: PropTypes.number,
  data: PropTypes.any,
  lastPage: PropTypes.number,
  size: PropTypes.number,
  total: PropTypes.number,
});

export default PaginatedResponse;
