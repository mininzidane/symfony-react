import React from 'react';
import { useParams } from 'react-router-dom';
import HowToBuyAndShip from 'frontend/js/views/Shared/PageSections/HowToBuyAndShip';
import CheckVinHistory from 'frontend/js/views/Shared/PageSections/CheckVinHistory';
import Mission from 'frontend/js/views/Shared/PageSections/Mission';
import MoreAboutConditions from 'frontend/js/views/Shared/PageSections/MoreAboutConditions';
import PopularVehicles from 'frontend/js/views/Shared/PageSections/PopularVehicles';
import Container from 'frontend/js/components/Container';
import CountryService from 'frontend/js/api/CountryService';
import SimpleHeader from 'frontend/js/views/Shared/SimpleHeader';
import HeroBusiness from './HeroBusiness';
import Hero from './Hero';
import Benefits from './Benefits';
import Advantages from './Advantages';
import useStyles from './useStyles';

function SalvadorCopartLoungePage() {
  const classes = useStyles();
  const country = CountryService.COUNTRIES.elSalvador.name;
  const { isBusiness } = useParams();

  return (
    <div>
      <SimpleHeader />
      {isBusiness ? (
        <>
          <HeroBusiness />
          <Advantages />
        </>
      ) : (
        <>
          <Hero />
          <Container className={classes.container}>
            <PopularVehicles isIntlPage maxLots={3} isInline title="Explorar vehículos populares en El Salvador" />
          </Container>
          <div style={{ backgroundColor: '#fff' }}>
            <Container className={classes.container}>
              <HowToBuyAndShip country={country} />
            </Container>
          </div>
          <Benefits isBusiness={isBusiness} />
          <CheckVinHistory />
          <Mission />
          <MoreAboutConditions />
        </>
      )}
    </div>
  );
}

export default SalvadorCopartLoungePage;
