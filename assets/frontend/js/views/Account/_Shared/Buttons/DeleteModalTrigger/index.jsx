/* eslint-disable react/prop-types */
import React from 'react';
import BinSvg from './img/bin.svg';
import useStyles from './useStyles';

function DeleteModalTrigger({ onClick }) {
  const classes = useStyles();

  return (
    <button type="button" onClick={onClick} className={classes.root}>
      <img className={classes.icon} src={BinSvg} alt="Pen" />
    </button>
  );
}

export default DeleteModalTrigger;
