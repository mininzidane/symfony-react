/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function Description({ isCash }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {isCash ? (
        <FormattedMessage id="checkoutPage.paymentMethods.desc.canBeUsed" />
      ) : (
        <FormattedMessage id="checkoutPage.paymentMethods.desc.canNotBeUsed" />
      )}
    </div>
  );
}

export default Description;
