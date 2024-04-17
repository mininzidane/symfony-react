import React from 'react';
import PropTypes from 'prop-types';

import Reviews from 'frontend/js/views/Shared/PageSections/Reviews';
import Container from 'frontend/js/components/Container';

import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Title from './Title';
import Banner from './Banner';
import LinkBanner from './LinkBanner';
import RegisterNow from './RegisterNow';
import Features from './Features';
import FindNewCar from './FindNewCar';

import useStyles from './useStyles';

const Layout = ({
  title,
  couponCode,
  couponDescription,
  couponTitle,
  titleIconSrcSet,
  isSport,
  linkBannerImg,
  linkBannerImgSm,
  linkBannerHref,
  youtubeChannelIcon,
}) => {
  useStyles();
  const { isBelowMd } = useBreakpoint();

  return (
    <>
      <Title title={title} iconSrcSet={titleIconSrcSet} />
      <Banner code={couponCode} description={couponDescription} couponTitle={couponTitle} />
      {isBelowMd && (
        <section style={{ padding: '24px 0' }}>
          <Container>
            <RegisterNow />
          </Container>
        </section>
      )}
      <Features />
      <FindNewCar isSport={isSport} />
      <LinkBanner
        imgSrc={linkBannerImg}
        imgSrcSm={linkBannerImgSm}
        link={linkBannerHref}
        youtubeChannelIcon={youtubeChannelIcon}
      />
      <Reviews bgColor="#F1F1F8" />
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  couponCode: PropTypes.string.isRequired,
  couponDescription: PropTypes.string.isRequired,
  couponTitle: PropTypes.string.isRequired,
  titleIconSrcSet: PropTypes.array,
  isSport: PropTypes.bool,
  linkBannerImg: PropTypes.string.isRequired,
  linkBannerImgSm: PropTypes.string.isRequired,
  linkBannerHref: PropTypes.string,
  youtubeChannelIcon: PropTypes.string,
};

Layout.defaultProps = {
  titleIconSrcSet: [],
  isSport: false,
  linkBannerHref: null,
  youtubeChannelIcon: null,
};

export default Layout;
