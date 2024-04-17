/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Wrapper({ children }) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}

export default Wrapper;
