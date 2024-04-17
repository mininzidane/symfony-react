import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import MuiTableBody from '@material-ui/core/TableBody';
import SortingContext from '../Contexts/Sorting';

function TableBody({ children, data, className, shadow, ...props }) {
  const { sort } = useContext(SortingContext);

  const rows = [...data].sort((a, b) => {
    if (!sort.field) {
      return 0;
    }

    let comparison = 0;
    const comparator = sort.comparators[sort.field];
    if (typeof comparator === 'function') {
      comparison = comparator(a, b);
    } else {
      const path = sort.comparators[sort.field] || sort.field;
      const valueA = get(a, path);
      const valueB = get(b, path);

      if (!valueA) {
        return 1;
      }
      if (!valueB) {
        return -1;
      }

      if (valueA > valueB) {
        comparison = 1;
      } else if (valueB > valueA) {
        comparison = -1;
      }
    }

    return sort.order !== 'asc' ? -comparison : comparison;
  });

  return (
    <MuiTableBody {...props} className={className}>
      {typeof children === 'function' ? children(rows) : children}
    </MuiTableBody>
  );
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  className: PropTypes.string,
  shadow: PropTypes.bool,
};

TableBody.defaultProps = {
  data: [],
  className: '',
  shadow: false,
};

export default TableBody;
