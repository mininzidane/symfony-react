import PropTypes from 'prop-types';

const FilterOptionShape = PropTypes.shape({
  label: PropTypes.any,
  value: PropTypes.any,
  selected: PropTypes.bool,
});

export default FilterOptionShape;
