import React from 'react';
import HowToBuyAndShip from 'frontend/js/views/Shared/PageSections/HowToBuyAndShip';
import Benefits from 'frontend/js/views/Shared/PageSections/Benefits';
import PaymentCalculator from 'frontend/js/views/Shared/PageSections/PaymentCalculator';
import CheckVinHistory from 'frontend/js/views/Shared/PageSections/CheckVinHistory';
import AboutCompany from './AboutCompany';
import LeadForm from './LeadForm';
import CallBack from './CallBack';
import ImportInfo from './ImportInfo';

function IntlHomePage() {
  return (
    <>
      <HowToBuyAndShip />
      <Benefits />
      <PaymentCalculator />
      <LeadForm />
      <CheckVinHistory />
      <ImportInfo />
      <CallBack />
      <AboutCompany />
    </>
  );
}

export default IntlHomePage;
