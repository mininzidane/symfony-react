import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';

import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RegisterNow from '../RegisterNow';
import BgImg from './img/banner-lg.png';
import BgImgMobile from './img/banner-sm.png';
import useStyles from './useStyles';

function Banner({ code, description, couponTitle }) {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  return (
    <section>
      <ContainerFullScreen
        className={classes.root}
        background={{
          xl_x1: BgImg,
          sm_x1: BgImgMobile,
          color: 'transparent',
        }}
        isBeyondBackground
      >
        <Container>
          <div className={classes.content}>
            {isAboveSm && (
              <div className={classes.left}>
                <RegisterNow />
              </div>
            )}
            <div className={classes.right}>
              <div className={classNames(classes.coupon, { [classes.hide]: !code })}>
                <div className={classes.couponTitle}>{couponTitle}</div>
                <div className={classes.couponCode}>{code}</div>
                <div className={classes.couponSubtitle}>
                  <FormattedMessage id="landings.abmIsEasyToUse.shared.banner.couponSubtitle" />
                </div>
              </div>
              <p className={classNames(classes.couponDesc, { [classes.hide]: !code })}>{description}</p>
              <ul className={classes.features}>
                <li className={classes.feature}>
                  <FormattedMessage id="landings.abmIsEasyToUse.shared.banner.feature1" />
                </li>
                <li className={classes.feature}>
                  <FormattedMessage id="landings.abmIsEasyToUse.shared.banner.feature2" />
                </li>
                <li className={classes.feature}>
                  <FormattedMessage id="landings.abmIsEasyToUse.shared.banner.feature3" />
                </li>
                <li className={classes.feature}>
                  <FormattedMessage id="landings.abmIsEasyToUse.shared.banner.feature4" />
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </ContainerFullScreen>
    </section>
  );
}

Banner.propTypes = {
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  couponTitle: PropTypes.string.isRequired,
};

export default Banner;
