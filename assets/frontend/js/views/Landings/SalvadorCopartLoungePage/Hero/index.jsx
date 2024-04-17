import React from 'react';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import HeroBackgroundJpg from 'frontend/images/shared/landings/hero/hero-background.jpg';
import HeroBackgroundMobileJpg from 'frontend/images/shared/landings/hero/hero-background-mobile.jpg';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RegistrationCard from '../RegistrationCard';
import Features from './Features';
import useStyles from './useStyles';

function Hero() {
  const classes = useStyles();
  const { isAboveMd, isBelowMd } = useBreakpoint();

  return (
    <>
      <ContainerFullScreen
        background={{ xl_x1: HeroBackgroundJpg, sm_x1: HeroBackgroundMobileJpg, color: '#082340' }}
        className={classes.root}
      >
        <Container>
          <div className={classes.grid}>
            <div>
              <h1 className={classes.title}>Encuentre su próximo vehículo en la una subasta de Estados Unidos.</h1>
              <p className={classes.subtitle}>
                ¿Está importando automóviles de Estados Unidos? ¡Elija AutoBidMaster! Tenemos ofertas especiales para
                comprar y enviar vehículos de subastas de EE. UU. y Canadá.
              </p>
              <Features />
            </div>

            {isAboveMd && <RegistrationCard />}
          </div>
        </Container>
      </ContainerFullScreen>

      {isBelowMd && (
        <Container>
          <RegistrationCard />
        </Container>
      )}
    </>
  );
}

export default Hero;
