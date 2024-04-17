import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import BackgroundJpg from './img/hero-bg.jpg';
import EHLogoSvg from './img/EH-logo.svg';
import useStyles from './useStyles';

function Hero() {
  const classes = useStyles();

  return (
    <ContainerFullScreen
      background={{ xl_x1: BackgroundJpg, sm_x1: BackgroundJpg, color: '#204E8D' }}
      className={classes.root}
    >
      <Container>
        <img className={classes.logo} src={EHLogoSvg} alt="EasyHaul" />
        <h1 className={classes.title}>
          Top-rated NVOCC provider of auto auction shipping services.
          <br className="md-hide" />
          Ship your car from any location in US or Canada to your country with AutoBidMaster
        </h1>
        <h2 className={classes.subtitle}>Our services make international shipping easy!</h2>
        <ul className={classes.advantages}>
          <li>Local Nigerian Shipping Agents</li>
          <li>Licensed & Insured Carrier Network</li>
          <li>Reasonably Priced Shipping & Container Clearing</li>
          <li>Online Shipment Tracking</li>
        </ul>
      </Container>
    </ContainerFullScreen>
  );
}

export default Hero;
