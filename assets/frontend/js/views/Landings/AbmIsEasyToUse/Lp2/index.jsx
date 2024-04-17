import React from 'react';
import SimpleHeader from 'frontend/js/views/Shared/SimpleHeader';
import Hero from './Hero';
import Steps from './Steps';
import Reviews from './Reviews';
import Features from './Features';
import TrustShield from './TrustShield';

function Lp1Page() {
  return (
    <>
      <SimpleHeader />
      <Hero />
      <Steps />
      <Reviews />
      <Features />
      <TrustShield />
    </>
  );
}

export default Lp1Page;
