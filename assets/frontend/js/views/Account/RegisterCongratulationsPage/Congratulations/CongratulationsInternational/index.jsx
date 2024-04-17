import React, { useEffect } from 'react';

import Page from 'frontend/js/views/Account/_Shared/MembershipPlansBlock';

function CongratulationsInternational() {
  useEffect(() => {
    try {
      window.gtag('event', 'conversion', { send_to: 'AW‌-1034905954/eFV3CNuDmpYBEOLSve0D' });
    } catch (e) {
      /* pass */
    }
  }, []);

  return <Page />;
}

export default CongratulationsInternational;
