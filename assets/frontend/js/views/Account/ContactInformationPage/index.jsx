import React from 'react';
import CheckoutContextProvider from './_Context';
import Caption from './Caption';
import ContactInformation from './ContactInformation';
import useStyles from './useStyles';

function ContactInformationPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Caption />
      <ContactInformation />
    </div>
  );
}

export default () => (
  <CheckoutContextProvider>
    <ContactInformationPage />
  </CheckoutContextProvider>
);
