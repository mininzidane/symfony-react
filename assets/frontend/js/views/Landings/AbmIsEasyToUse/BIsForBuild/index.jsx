import React from 'react';

import useIntl from 'frontend/js/hooks/useIntl';

import Layout from '../Layout';
import titleIcon from '../Layout/Title/img/b-is-for-build.png';
import titleIcon2x from '../Layout/Title/img/b-is-for-build@2x.png';
import linkBannerImg from '../Layout/LinkBanner/img/b-is-for-build.jpg';
import linkBannerImgSm from '../Layout/LinkBanner/img/b-is-for-build-sm.jpg';

function BIsForBuild() {
  const intl = useIntl();
  const code = 'BIS4BUILD';
  const value = '$50';

  return (
    <Layout
      title={intl.formatMessage({ id: 'landings.abmIsEasyToUse.bIsForBuild.pageTitle' })}
      titleIconSrcSet={[titleIcon, titleIcon2x]}
      couponCode={code}
      couponTitle={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.couponTitle' }, { value })}
      couponDescription={intl.formatMessage(
        { id: 'landings.abmIsEasyToUse.shared.couponDescription' },
        { code, value },
      )}
      isSport
      linkBannerImg={linkBannerImg}
      linkBannerImgSm={linkBannerImgSm}
      linkBannerHref="https://www.youtube.com/channel/UCl4-WBRqWA2MlxmZorKOV7w"
    />
  );
}

export default BIsForBuild;
