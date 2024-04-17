import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';

import Layout from '../Layout';
import linkBannerImg from '../Layout/LinkBanner/img/legit-street-cars-poster.jpg';
import linkBannerImgSm from '../Layout/LinkBanner/img/legit-street-cars-poster-sm.jpg';
import youtubeChannelIcon from '../Layout/LinkBanner/img/legit-street-cars-avatar.png';

function LegitStreetCars() {
  const intl = useIntl();
  const code = 'LEGITSTREETCARS';
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
      linkBannerHref="https://www.youtube.com/channel/UCT-2OPZT6P8j4nEKW3DXpOA"
      youtubeChannelIcon={youtubeChannelIcon}
    />
  );
}

export default LegitStreetCars;
