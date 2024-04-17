import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import InvoiceService from 'frontend/js/api/InvoiceService';
import CheckoutPage from '../CheckoutPage';

function InvoicePaymentPage() {
  const { token } = useParams();

  const { isLoading, data } = useQuery(['invoice_payment_availability', token], () =>
    InvoiceService.isInvoicePaymentAvailable(token),
  );

  if (isLoading) {
    return null;
  }

  if (!data?.available) {
    RouterService.redirect('purchases');
    return null;
  }

  return <CheckoutPage />;
}

export default InvoicePaymentPage;
