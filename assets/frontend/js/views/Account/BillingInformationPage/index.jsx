import React from 'react';
import CheckoutContextProvider from './_Context';
import Caption from './Caption';
import BillingInformation from './BillingInformation';
import useStyles from './useStyles';

function BillingInformationPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Caption />
      <BillingInformation />
    </div>
  );
}

export default () => (
  <CheckoutContextProvider>
    <BillingInformationPage />
  </CheckoutContextProvider>
);
