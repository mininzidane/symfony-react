import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SortingContext from '../Contexts/Sorting';

function TableContainer({ children, sorting }) {
  const [sort, setSort] = useState({ comparators: {}, ...sorting });

  function handleSortChange(field) {
    const order = sort.field === field && sort.order !== 'desc' ? 'desc' : 'asc';
    setSort({ ...sort, field, order });
  }

  return <SortingContext.Provider value={{ sort, setSortBy: handleSortChange }}>{children}</SortingContext.Provider>;
}

TableContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  sorting: PropTypes.shape({}),
};

TableContainer.defaultProps = {
  sorting: {
    field: '',
    order: 'asc',
  },
};

export default TableContainer;
