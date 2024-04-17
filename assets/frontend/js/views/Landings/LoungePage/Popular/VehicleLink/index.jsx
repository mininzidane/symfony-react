/* eslint-disable */
import React from 'react';
import useStyles from './useStyles';

function VehicleLink({ label, href }) {
  const classes = useStyles();

  return (
    <a href={href} className={classes.root}>
      {label}
    </a>
  );
}

export default VehicleLink;
