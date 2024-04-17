/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classnames from 'classnames';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import ApplePayService from 'frontend/js/api/ApplePayService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function ApplePay() {
  const classes = useStyles();
  const { invoices, error, payload, amount, onSuccess } = useCheckoutContext();
  const { hasBillingAddressSet } = useCustomerHelper();

  function handleError() {
    error.show();
  }

  async function handleApplePayClick() {
    error.hide();

    try {
      ApplePayService.makeApplePayment(payload, invoices, amount, onSuccess, handleError, !hasBillingAddressSet);
    } catch (e) {
      if (window.Sentry) {
        window.Sentry.captureException(e);
      }
      handleError();
    }
  }

  return (
    <button
      type="button"
      className={classnames(classes.root, 'apple-pay-button apple-pay-button-black')}
      onClick={handleApplePayClick}
    />
  );
}

export default ApplePay;
