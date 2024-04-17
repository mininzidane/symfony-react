/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function SortBy({ label, onChange, asc, desc, value, disabled, name }) {
  const isActive = value === asc || value === desc;
  // eslint-disable-next-line no-nested-ternary
  const order = isActive ? (value === asc ? 'asc' : 'desc') : '';

  const classes = useStyles({ isActive, order });

  function handleChange() {
    if (order === 'asc') {
      onChange(name, desc);
    } else if (order === 'desc') {
      onChange(name, '');
    } else {
      onChange(name, asc);
    }
  }

  return (
    <button type="button" className={classnames(classes.root, disabled && 'pe-n')} onClick={handleChange}>
      <span className={classes.label}>{label}</span>

      <svg width="9" height="12" viewBox="0 0 9 12" fill="none" className={classes.icon}>
        <path d="M9 5L-4.66253e-07 5L4.5 0L9 5Z" className={classes.upArrow} />
        <path d="M1.60934e-06 7L9 7L4.5 12L1.60934e-06 7Z" className={classes.downArrow} />
      </svg>
    </button>
  );
}

export default SortBy;
