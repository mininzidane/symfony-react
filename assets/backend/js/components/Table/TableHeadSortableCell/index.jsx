import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';
import TableCell from '../TableCell';

function TableHeadSortableCell({ children, id, className, sortField, sortOrder, onSort, ...props }) {
  const classes = useStyles();
  const sortedByThisColumn = id === sortField;

  function handleSort() {
    if (sortedByThisColumn) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      onSort(id, newSortOrder);
    } else {
      onSort(id, 'asc');
    }
  }

  if (!id) {
    return (
      <TableCell className={className} {...props}>
        {children}
      </TableCell>
    );
  }

  return (
    <TableCell {...props} className={className}>
      <div
        className={classNames(classes.sortable, 'op-h easy-hover')}
        onClick={handleSort}
        onKeyPress={handleSort}
        role="button"
        tabIndex={0}
      >
        {children}

        <div
          className={classNames(
            'svg-icon',
            classes.arrow,
            sortedByThisColumn && classes.arrowDisplay,
            sortOrder === 'desc' && classes.arrowRotate,
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.667 10.666">
            <path
              fill="#000"
              d="M14.667,9.333l-.94-.94L10,12.113V4H8.667v8.113L4.947,8.387,4,9.333l5.333,5.333Z"
              transform="translate(14.667 14.665) rotate(180)"
            />
          </svg>
        </div>
      </div>
    </TableCell>
  );
}

TableHeadSortableCell.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  onSort: PropTypes.func,
};

TableHeadSortableCell.defaultProps = {
  id: '',
  className: '',
  sortOrder: 'asc',
  sortField: undefined,
  onSort: () => null,
};

export default TableHeadSortableCell;
