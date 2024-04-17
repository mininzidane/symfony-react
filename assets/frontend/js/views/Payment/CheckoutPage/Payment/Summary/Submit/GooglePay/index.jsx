import React, { useEffect, useRef } from 'react';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import GooglePayService from 'frontend/js/api/GooglePayService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function GooglePay() {
  const ref = useRef();
  const classes = useStyles();
  const { form, error, payload, amount, onSuccess } = useCheckoutContext();
  const { hasBillingAddressSet } = useCustomerHelper();

  function handleCancel() {
    form.setIsProcessing(false);
  }

  function handleError() {
    error.show();
    form.setIsProcessing(false);
  }

  async function handleClick() {
    error.hide();
    form.setIsProcessing(true);

    try {
      const response = await GooglePayService.makePayment(payload, amount, !hasBillingAddressSet);
      onSuccess(response);
    } catch (e) {
      if (e && e.statusCode && e.statusCode === 'CANCELED') {
        handleCancel();
      } else {
        handleError();
      }
    }
  }

  useEffect(() => {
    const { current } = ref;
    GooglePayService.createButton(current, handleClick);

    return () => GooglePayService.destroyButtons(current);
  }, []);

  return (
    <div className={classes.root}>
      <div ref={ref} />
    </div>
  );
}

export default GooglePay;
