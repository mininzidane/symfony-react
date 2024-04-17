/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function FormLabel({ text }) {
  const classes = useStyles();

  return <div className={classes.root}>{text}:</div>;
}

export default FormLabel;
