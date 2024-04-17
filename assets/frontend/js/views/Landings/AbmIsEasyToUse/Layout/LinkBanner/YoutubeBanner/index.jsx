import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';

import Link from 'frontend/js/components/Link';
import Image from 'frontend/js/components/Image';

import youtubeLogo from '../img/youtube-logo.svg';
import useStyles from './useStyles';

function YoutubeBanner({ bannerSrc, bannerSrcSm, channelIcon, href }) {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classes.banner}>
      <Image ratio={57} lazy src={isBelowSm ? bannerSrcSm : bannerSrc} alt="banner" className={classes.bannerImg} />
      <Link href={href} isTargetBlank className={classes.channelLink}>
        <img src={channelIcon} alt="channelIcon" className={classes.channelIcon} />
        <img src={youtubeLogo} alt="youtubeLogo" className={classes.youtubeLogo} />
      </Link>
    </div>
  );
}

YoutubeBanner.propTypes = {
  bannerSrc: PropTypes.string.isRequired,
  bannerSrcSm: PropTypes.string.isRequired,
  channelIcon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default YoutubeBanner;
