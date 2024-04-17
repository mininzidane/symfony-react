import React from 'react';

import useIntl from 'frontend/js/hooks/useIntl';
import Reviews from 'frontend/js/views/Shared/PageSections/Reviews';
import Container from 'frontend/js/components/Container';

import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Title from '../Layout/Title';
import Banner from '../Layout/Banner';
import LinkBanner from '../Layout/LinkBanner';
import RegisterNow from '../Layout/RegisterNow';
import Features from '../Layout/Features';

import titleIcon from '../Layout/Title/img/motion-auto-tv.png';
import titleIcon2x from '../Layout/Title/img/motion-auto-tv@2x.png';
import linkBannerImg from '../Layout/LinkBanner/img/motion-auto-tv.jpg';
import linkBannerImgSm from '../Layout/LinkBanner/img/motion-auto-tv-sm.jpg';

function MotionAutoTv() {
  const intl = useIntl();
  const code = 'MOTIONAUTOTV';
  const value = '$50';
  const { isBelowSm } = useBreakpoint();

  return (
    <>
      <Title
        title={intl.formatMessage({ id: 'landings.abmIsEasyToUse.motionAutoTv.pageTitle' })}
        iconSrcSet={[titleIcon, titleIcon2x]}
        iconLink="https://motionautotv.com/"
      />
      <Banner
        code={code}
        description={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.couponDescription' }, { value })}
        couponTitle={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.couponTitle' }, { code, value })}
      />
      {isBelowSm && (
        <section style={{ padding: '24px 0' }}>
          <Container>
            <RegisterNow />
          </Container>
        </section>
      )}
      <Features />
      <LinkBanner
        title={intl.formatMessage({ id: 'landings.abmIsEasyToUse.motionAutoTv.linkBannerTitle' })}
        imgSrc={linkBannerImg}
        imgSrcSm={linkBannerImgSm}
        link="https://www.youtube.com/user/MotionAutoTv"
        bgColor="#F1F1F8"
      />
      <Reviews />
    </>
  );
}

export default MotionAutoTv;
