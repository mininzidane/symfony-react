/* eslint-disable react/prop-types */
import React from 'react';
import PaymentService from 'frontend/js/api/PaymentService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import Button from 'frontend/js/components/Button';

function MoneyGram({ ctaLabel }) {
  const { setPaymentGuide, logPaymentActivity } = useCheckoutContext();

  function handleClick() {
    logPaymentActivity();
    setPaymentGuide(PaymentService.METHOD.MONEYGRAM);
  }

  return <Button label={ctaLabel} color="yellow" onClick={handleClick} />;
}

export default MoneyGram;
