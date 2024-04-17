import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';

import RegisterNow from './RegisterNow';
import Description from './Description';
import BgImg from './img/banner-lg.jpg';
import BgImgMobile from './img/banner-sm.jpg';
import ArrowSection from './ArrowSection';
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
          <div className={classes.content}>
            <div className={classes.promo}>
              <h1 className={classes.title}>
                <FormattedMessage id="landings.lp3.title" />
              </h1>
              <Description />
              <ArrowSection />
            </div>

            <RegisterNow />
          </div>
        </Container>
      </ContainerFullScreen>
    </section>
  );
}

export default Banner;
