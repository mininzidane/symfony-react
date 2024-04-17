import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import PaymentService from 'frontend/js/api/PaymentService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CheckoutPage from '../CheckoutPage';

function MembershipPaymentPage() {
  const { plan } = useParams();
  const { membershipType } = useCustomerHelper();
  const { name, visible, upgradable } = membershipType;

  if (!visible && !upgradable) {
    RouterService.redirect('renewalSettings');
    return null;
  }

  if (!plan || plan === name) {
    RouterService.redirect('renewalSettings');
    return null;
  }

  const coupon = RouterService.getQueryParam('coupon');
  const { isLoading, data } = useQuery(['coupon', coupon], () => PaymentService.coupon(coupon, true, 'membership'), {
    enabled: Boolean(coupon),
  });

  if (isLoading) {
    return null;
  }

  return <CheckoutPage coupon={data?.coupon} />;
}

export default MembershipPaymentPage;
