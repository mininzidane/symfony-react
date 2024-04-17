/* eslint-disable react/prop-types */
import React from 'react';
import PaymentService from 'frontend/js/api/PaymentService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import Button from 'frontend/js/components/Button';

function WireTransferSubmit({ ctaLabel }) {
  const { setPaymentGuide, logPaymentActivity } = useCheckoutContext();

  function handleClick() {
    setPaymentGuide(PaymentService.METHOD.WIRE_TRANSFER);
  }

  return <Button label={ctaLabel} color="yellow" onClick={handleClick} />;
}

export default WireTransferSubmit;
