import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BackgroundJpg from './img/eh-international-banner.jpg';
import EHLogoSvg from './img/EH_Logo_Horizontal_White.svg';
import useStyles from './useStyles';

function Hero() {
  const classes = useStyles();

  return (
    <ContainerFullScreen
      background={{ xl_x1: BackgroundJpg, sm_x1: BackgroundJpg, color: '#66885A' }}
      className={classes.root}
    >
      <Container>
        <img src={EHLogoSvg} alt="EasyHaul" className={classes.logo} />
        <h2 className={classes.title}>
          <FormattedMessage id="internationalAutoShippingPage.hero.title" />
        </h2>
        <div className={classes.subtitle}>
          <FormattedMessage id="internationalAutoShippingPage.hero.subtitle" />
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default Hero;
