import React from 'react';

import useIntl from 'frontend/js/hooks/useIntl';

import Layout from '../Layout';
import linkBannerImg from '../Layout/LinkBanner/img/tavarish-poster.jpg';
import linkBannerImgSm from '../Layout/LinkBanner/img/tavarish-poster-sm.jpg';
import youtubeChannelIcon from '../Layout/LinkBanner/img/tavarish-avatar.png';

function Tavarish() {
  const intl = useIntl();
  const code = 'TAVARISH';
  const value = '$50';

  return (
    <Layout
      title={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.youtubChannels.pageTitle' })}
      couponCode={code}
      couponTitle={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.couponTitle' }, { value })}
      couponDescription={intl.formatMessage(
        { id: 'landings.abmIsEasyToUse.shared.couponDescription' },
        { code, value },
      )}
      isSport
      linkBannerImg={linkBannerImg}
      linkBannerImgSm={linkBannerImgSm}
      linkBannerHref="https://www.youtube.com/user/tavarish"
      youtubeChannelIcon={youtubeChannelIcon}
    />
  );
}

export default Tavarish;
