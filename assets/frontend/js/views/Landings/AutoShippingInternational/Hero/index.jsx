import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import BackgroundImg from './img/background.jpg';
import useStyles from './useStyles';
import StarsSvg from './img/stars.svg';
import CheckmarkSvg from './img/checkmark.svg';
import Form from './Form';

function Hero() {
  const classes = useStyles();

  return (
    <ContainerFullScreen
      className={classes.root}
      background={{
        xl_x1: BackgroundImg,
        sm_x1: BackgroundImg,
        color: 'transparent',
      }}
      isBeyondBackground
    >
      <Container>
        <div className={classes.grid}>
          <div>
            <div className={classes.supTitle}>
              <img src={StarsSvg} alt="Stars" />
              <span>
                <FormattedMessage id="autoShippingInternationalPage.title" />
              </span>
            </div>
            <h1 className={classes.title}>
              <FormattedMessage id="autoShippingInternationalPage.subtitle" />
            </h1>

            <div className={classes.features}>
              <div className={classes.feature}>
                <img src={CheckmarkSvg} alt="Checkmark" />
                <div>
                  <FormattedMessage id="autoShippingInternationalPage.feature1" />
                </div>
              </div>
              <div className={classes.feature}>
                <img src={CheckmarkSvg} alt="Checkmark" />
                <div>
                  <FormattedMessage id="autoShippingInternationalPage.feature3" />
                </div>
              </div>
              <div className={classes.feature}>
                <img src={CheckmarkSvg} alt="Checkmark" />
                <div>
                  <FormattedMessage id="autoShippingInternationalPage.feature2" />
                </div>
              </div>
              <div className={classes.feature}>
                <img src={CheckmarkSvg} alt="Checkmark" />
                <div>
                  <FormattedMessage id="autoShippingInternationalPage.feature4" />
                </div>
              </div>
            </div>
          </div>

          <Form />
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default Hero;
