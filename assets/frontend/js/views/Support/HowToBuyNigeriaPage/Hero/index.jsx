import React from 'react';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useStyles from './useStyles';
import heroBgJpg from './img/hero-bg.jpg';
import heroBgMobileJpg from './img/hero-bg-sm.jpg';

function Hero() {
  const classes = useStyles();

  return (
    <ContainerFullScreen
      background={{
        xl_x1: heroBgJpg,
        sm_x1: heroBgMobileJpg,
        color: '#3B3A17',
      }}
      className={classes.root}
      wrapperClassName={classes.wrapper}
      isBeyondBackground
    >
      <Container>
        <h1 className={classes.title}>
          Ready to buy a vehicle <br />
          from AutoBidMaster?
        </h1>
        <h2 className={classes.subtitle}>
          Let us help you understand how in 10 easy steps! We’ve <br />
          prepared this special guide for Nigerians to help you get <br />
          the car of your dreams.
        </h2>
      </Container>
    </ContainerFullScreen>
  );
}

export default Hero;
