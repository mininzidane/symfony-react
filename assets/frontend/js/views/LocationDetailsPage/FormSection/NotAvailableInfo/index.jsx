/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function NotAvailableInfo({ message }) {
  const classes = useStyles();

  return <div className={classes.root}>{message}</div>;
}

export default NotAvailableInfo;
