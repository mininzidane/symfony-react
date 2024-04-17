import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';

import linkBannerImg from '../Layout/LinkBanner/img/copart-coupon-code-driver.jpg';
import linkBannerImgSm from '../Layout/LinkBanner/img/copart-coupon-code-driver-sm.jpg';

import Layout from '../Layout';

function Lp4() {
  const intl = useIntl();
  const code = 'COPART';
  const value = '$50';

  return (
    <Layout
      title={intl.formatMessage({ id: 'landings.abmIsEasyToUse.disc100.pageTitle' })}
      couponCode={code}
      couponTitle={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.couponTitle' }, { value })}
      couponDescription={intl.formatMessage({ id: 'landings.abmIsEasyToUse.disc.couponDescription' }, { code, value })}
      linkBannerImg={linkBannerImg}
      linkBannerImgSm={linkBannerImgSm}
    />
  );
}

export default Lp4;
