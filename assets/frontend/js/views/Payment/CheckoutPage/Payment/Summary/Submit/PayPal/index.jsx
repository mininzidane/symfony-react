import React from 'react';
import PayPalButton from 'frontend/js/components/PayPalButton';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';

function PayPalSubmit() {
  const { error, form, payload, onSuccess, payPalEnabledFunds } = useCheckoutContext();

  function handleCancel() {
    form.setIsProcessing(false);
  }

  function handleClick() {
    error.hide();
    form.setIsProcessing(true);
  }

  function handleError() {
    error.show();
    form.setIsProcessing(false);
  }

  let style = {};
  if (payPalEnabledFunds.length === 0) {
    style = {
      width: '100%',
      height: 40,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      borderRadius: '25px',
      backgroundColor: '#ffc439',
    };
  }

  return (
    <PayPalButton
      payload={payload}
      onSuccess={onSuccess}
      onError={handleError}
      onCancel={handleCancel}
      onClick={handleClick}
      isProcessing={form.isProcessing}
      style={style}
      enableFunds={payPalEnabledFunds}
    />
  );
}

export default PayPalSubmit;
