/* eslint-disable react/prop-types */
import React from 'react';
import CrossSvg from './img/cross.svg';
import useStyles from './useStyles';

function ClearButton({ onClick }) {
  const classes = useStyles();

  return (
    <button type="button" onClick={onClick} className={classes.root}>
      <img src={CrossSvg} className="d-b" alt="Cross" />
    </button>
  );
}

export default ClearButton;
