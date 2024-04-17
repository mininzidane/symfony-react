import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import CheckoutPage from '../CheckoutPage';

function ShippingPaymentPage() {
  const { token } = useParams();

  const { isLoading, data } = useQuery(['shipping_payment_availability', token], () =>
    ShippingOrderService.isPaymentForShippingOrderAvailable(token),
  );

  if (isLoading) {
    return null;
  }

  if (!data?.available) {
    RouterService.redirect('lotsWon');
    return null;
  }

  return <CheckoutPage />;
}

export default ShippingPaymentPage;
