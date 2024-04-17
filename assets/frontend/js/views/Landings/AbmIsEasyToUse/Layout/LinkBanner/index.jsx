import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';

import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';

import YoutubeBanner from './YoutubeBanner';
import useStyles from './useStyles';

function LinkBanner({ imgSrc, imgSrcSm, title, link, bgColor, youtubeChannelIcon }) {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();
  const isYoutube = Boolean(youtubeChannelIcon);

  return (
    <section className={classes.root} style={{ backgroundColor: bgColor }}>
      <Container>
        <div className={classes.content}>
          {title && <h2 className={classes.title}>{title}</h2>}

          {isYoutube && (
            <YoutubeBanner bannerSrc={imgSrc} bannerSrcSm={imgSrcSm} channelIcon={youtubeChannelIcon} href={link} />
          )}

          {!isYoutube && link && (
            <Link className={classes.banner} href={link} isTargetBlank>
              <img src={isBelowSm ? imgSrcSm : imgSrc} alt="banner" className={classes.bannerImg} />
            </Link>
          )}

          {!isYoutube && !link && (
            <div className={classes.banner}>
              <img src={isBelowSm ? imgSrcSm : imgSrc} alt="banner" className={classes.bannerImg} />
            </div>
          )}

          <div className={classes.columns}>
            <div className={classes.column}>
              <h3 className={classes.columnTitle}>
                <FormattedMessage id="landings.abmIsEasyToUse.shared.linkBanner.title1" />
              </h3>
              <p className={classes.columnText}>
                <FormattedMessage id="landings.abmIsEasyToUse.shared.linkBanner.text1" />
              </p>
            </div>
            <div className={classes.column}>
              <h3 className={classes.columnTitle}>
                <FormattedMessage id="landings.abmIsEasyToUse.shared.linkBanner.title2" />
              </h3>
              <p className={classes.columnText}>
                <FormattedMessage id="landings.abmIsEasyToUse.shared.linkBanner.text2" />
              </p>
            </div>
            <div className={classes.column}>
              <h3 className={classes.columnTitle}>
                <FormattedMessage id="landings.abmIsEasyToUse.shared.linkBanner.title3" />
              </h3>
              <p className={classes.columnText}>
                <FormattedMessage id="landings.abmIsEasyToUse.shared.linkBanner.text3" />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

LinkBanner.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgSrcSm: PropTypes.string.isRequired,
  link: PropTypes.string,
  title: PropTypes.string,
  bgColor: PropTypes.string,
  youtubeChannelIcon: PropTypes.string,
};

LinkBanner.defaultProps = {
  link: '',
  title: '',
  bgColor: '#fff',
  youtubeChannelIcon: null,
};

export default LinkBanner;
