/* eslint-disable react/prop-types */
import React from 'react';
import Header from './Header';
import Grid from './Grid';
import Description from './Description';
import useStyles from './useStyles';

function PaymentGuide({ method }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header method={method} />
      <Grid method={method} />
      <Description />
    </div>
  );
}

export default PaymentGuide;
