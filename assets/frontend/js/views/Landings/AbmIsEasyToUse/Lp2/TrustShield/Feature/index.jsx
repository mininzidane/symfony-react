/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Feature({ title, text }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h4 className={classes.title}>{title}</h4>
      <p className={classes.text}>{text}</p>
    </div>
  );
}

export default Feature;
