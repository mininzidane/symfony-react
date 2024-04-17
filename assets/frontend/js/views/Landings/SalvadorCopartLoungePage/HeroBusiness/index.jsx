import React from 'react';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import HeroBackgroundJpg from 'frontend/images/shared/landings/hero/hero-background.jpg';
import HeroBackgroundMobileJpg from 'frontend/images/shared/landings/hero/hero-background-mobile.jpg';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RegistrationCard from '../RegistrationCard';
import Benefits from './Benefits';
import useStyles from './useStyles';

function HeroBusiness() {
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
              <div className={classes.sticker}>Ofertas especiales para Importadores:</div>
              <h1 className={classes.title}>
                Compre en los estados de Alabama, Michigan y Wisconsin sin restricciones <br />
                <span>con AutoBidmaster, el corredor Oficial de Copart</span>
              </h1>
              <p className={classes.subtitle}>Si compra un mínimo de 15 vehículos al año, puede obtener:</p>
              <Benefits />
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

export default HeroBusiness;
