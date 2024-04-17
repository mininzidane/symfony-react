import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import VehicleImageCarousel from 'frontend/js/views/Shared/VehicleImageCarousel';
import SliderSectionBgPng from './img/slider-section-bg-desktop.png';
import SliderSectionBgMobilePng from './img/slider-section-bg-mobile.png';
import Slide1Jpg from './img/lounge-photo-1.jpg';
import Slide2Jpg from './img/lounge-photo-2.jpg';
import Slide3Jpg from './img/lounge-photo-3.jpg';
import useStyles from './useStyles';

function SliderSection() {
  const classes = useStyles();

  return (
    <ContainerFullScreen
      className={classes.root}
      background={{ xl_x1: SliderSectionBgPng, sm_x1: SliderSectionBgMobilePng, color: '#f1f1f8' }}
    >
      <Container>
        <div className={classes.grid}>
          <div>
            <h2 className={classes.title}>
              <FormattedMessage id="landings.loungeOperatorRecruitmentPage.sliderSectionTitle" />
            </h2>
            <p className={classes.subtitle}>
              <FormattedMessage id="landings.loungeOperatorRecruitmentPage.sliderSectionSubtitle" />
            </p>
          </div>

          <div className={classes.sliderContainer}>
            <VehicleImageCarousel
              images={[Slide1Jpg, Slide2Jpg, Slide3Jpg]}
              title="Lounge Photo"
              classes={{ slides: classes.slider }}
            />
          </div>
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default SliderSection;
