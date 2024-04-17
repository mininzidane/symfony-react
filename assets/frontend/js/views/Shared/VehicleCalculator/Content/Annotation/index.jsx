import React from 'react';
import ExchangeRate from './ExchangeRate';
import useStyles from './useStyles';

function Annotation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExchangeRate />
    </div>
  );
}

export default Annotation;
