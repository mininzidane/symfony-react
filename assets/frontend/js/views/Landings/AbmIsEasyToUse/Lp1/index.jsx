import React from 'react';
import SimpleHeader from 'frontend/js/views/Shared/SimpleHeader';
import Steps from './Steps';
import Testimonials from './Testimonials';
import Hero from './Hero';
import Features from './Features';

function Lp1Page() {
  return (
    <>
      <SimpleHeader />
      <Hero />
      <Steps />
      <Testimonials />
      <Features />
    </>
  );
}

export default Lp1Page;
