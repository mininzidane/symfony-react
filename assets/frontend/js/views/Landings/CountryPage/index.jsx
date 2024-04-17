import React from 'react';
import StringService from 'frontend/js/lib/utils/StringService';
import RouterService from 'frontend/js/api/RouterService';

import PopularVehicles from 'frontend/js/views/Shared/PageSections/PopularVehicles';
import HowToBuyAndShip from 'frontend/js/views/Shared/PageSections/HowToBuyAndShip';
import Benefits from 'frontend/js/views/Shared/PageSections/Benefits';
import PaymentCalculator from 'frontend/js/views/Shared/PageSections/PaymentCalculator';
import CheckVinHistory from 'frontend/js/views/Shared/PageSections/CheckVinHistory';

import Registration from './Registration';
import Steps from './Steps';
import PopularTypes from './PopularTypes';
import HowToBuyDescription from './HowToBuyDescription';
import PaymentOptions from './PaymentOptions';

function CountryLandingPage() {
  const match = RouterService.match('importCarsFromUsa');
  const country = StringService.capitalizeEachWord((match.country || '').replace(/-/g, ' '));

  return (
    <>
      <Registration country={country} />
      <Steps />
      <PopularVehicles isIntlPage={false} />
      <PopularTypes />
      <HowToBuyAndShip country={country} isGrayBackground />
      <HowToBuyDescription country={country} />
      <PaymentOptions />
      <PaymentCalculator />
      <Benefits country={country} />
      <CheckVinHistory />
    </>
  );
}

export default CountryLandingPage;
