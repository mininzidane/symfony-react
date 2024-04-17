/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Step({ title, subtitle, icon }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>{icon}</div>

      <div>
        <div className={classes.title}>{title}</div>
        <div className={classes.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
}

export default Step;
