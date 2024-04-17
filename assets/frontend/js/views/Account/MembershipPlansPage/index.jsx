import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import PaymentService from 'frontend/js/api/PaymentService';
import Page from 'frontend/js/views/Account/_Shared/MembershipPlansBlock';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function Plans() {
  const { membershipType } = useCustomerHelper();
  const { visible } = membershipType;

  if (!visible) {
    RouterService.redirect('renewalSettings');
    return null;
  }

  useEffect(() => {
    try {
      window.gtag('event', 'conversion', {
        send_to: 'AW-1034905954/mORjCNGPnnsQ4tK97QM',
        aw_remarketing_only: true,
        value: 1.0,
        currency: 'USD',
      });
    } catch (e) {
      /* pass */
    }
  }, []);

  const coupon = RouterService.getQueryParam('coupon');
  const { isLoading, data } = useQuery(['coupon', coupon], () => PaymentService.coupon(coupon, true, 'membership'), {
    enabled: Boolean(coupon),
  });

  if (isLoading) {
    return null;
  }

  return <Page coupon={data?.coupon} />;
}

export default Plans;
