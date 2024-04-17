/* eslint-disable react/prop-types */
import React from 'react';
import PenSvg from './img/pen.svg';
import useStyles from './useStyles';

function EditTitleModalTrigger({ onClick }) {
  const classes = useStyles();

  return (
    <button type="button" onClick={onClick} className={classes.root}>
      <img className={classes.icon} src={PenSvg} alt="Pen" />
    </button>
  );
}

export default EditTitleModalTrigger;
