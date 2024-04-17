import React from 'react';
import Mission from 'frontend/js/views/Shared/PageSections/Mission';
import MoreAboutConditions from 'frontend/js/views/Shared/PageSections/MoreAboutConditions';
import Hero from './Hero';
import Benefits from './Benefits';
import Features from './Features';
import Advantages from './Advantages';

function BusinessPage() {
  return (
    <div>
      <Hero />
      <Benefits />
      <Features />
      <Advantages />
      <Mission />
      <MoreAboutConditions />
    </div>
  );
}

export default BusinessPage;
