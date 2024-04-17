/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';

function ShippingPaymentButton({ token }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        label={<FormattedMessage id="depositsPage.transactions.purchases.payNow" />}
        href={RouterService.getRoute('shippingPayment', null, false, { token })}
        size="sm"
        isInline
        className={classes.cta}
      />
    </div>
  );
}

export default ShippingPaymentButton;
