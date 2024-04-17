/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Alert({ icon, text }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>{icon}</div>
      <div>{text}</div>
    </div>
  );
}

export default Alert;
