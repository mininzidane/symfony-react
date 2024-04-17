/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function TableHeadControl({ id, label, isNowrap, sortField, sort, setSort, sortOptions }) {
  if (!sortField) {
    return <FormattedMessage id={id} />;
  }

  const { field, order } = sort;
  const isActive = sortField === field;
  const classes = useStyles({ isActive, order, isNowrap });

  function handleClick() {
    const nextSort = sortOptions.find(
      (o) => o.field === sortField && (isActive ? o.order !== order : o.order === 'asc'),
    );
    setSort(nextSort);
  }

  return (
    <button type="button" className={classes.root} onClick={handleClick}>
      <span className={classes.label}>
        {id && <FormattedMessage id={id} />}
        {label}
      </span>

      <svg width="9" height="12" viewBox="0 0 9 12" fill="none" className={classes.icon}>
        <path d="M1.60934e-06 7L9 7L4.5 12L1.60934e-06 7Z" className={classes.upArrow} />
        <path d="M9 5L-4.66253e-07 5L4.5 0L9 5Z" className={classes.downArrow} />
      </svg>
    </button>
  );
}

TableHeadControl.propTypes = {
  id: PropTypes.string,
  sortField: PropTypes.string,
  isNowrap: PropTypes.bool,
};

TableHeadControl.defaultProps = {
  sortField: '',
  isNowrap: false,
  id: null,
};

export default TableHeadControl;
