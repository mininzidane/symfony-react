import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';

import RegisterNow from './RegisterNow';
import BgImg from './img/banner-lg.jpg';
import BgImgMobile from './img/banner-sm.jpg';
import useStyles from './useStyles';

function Banner() {
  const classes = useStyles();

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
          <div>
            <h2 className={classes.title}>
              <FormattedMessage id="landings.abmIsEasyToUse.shared.noDealerLicenseNeeded" />
            </h2>
            <RegisterNow />
          </div>
        </Container>
      </ContainerFullScreen>
    </section>
  );
}

export default Banner;
