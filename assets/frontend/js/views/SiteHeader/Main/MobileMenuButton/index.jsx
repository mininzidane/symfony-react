/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function MenuButton({ onClick, isActive }) {
  const classes = useStyles();

  return (
    <button type="button" onClick={onClick} className={classes.root}>
      {isActive ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={classes.crossIcon}>
          <path d="M1.33332 0L11.9999 10.6667L10.6665 12L0 1.33333L1.33332 0Z" fill="white" />
          <path d="M0.000142398 10.6667L10.6667 1.16887e-05L12 1.33334L1.33346 12L0.000142398 10.6667Z" fill="white" />
        </svg>
      ) : (
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" className={classes.hamburgerIcon}>
          <rect width="16" height="2" fill="white" />
          <rect y="6" width="16" height="2" fill="white" />
          <rect y="12" width="16" height="2" fill="white" />
        </svg>
      )}
    </button>
  );
}

export default MenuButton;
