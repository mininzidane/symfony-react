import React from 'react';
import Faq from './Faq';
import MetaData from './MetaData';
import ContactUs from './ContactUs';
import CarsInStock from './CarsInStock';
import Hero from './Hero';
import Benefits from './Benefits';
import SearchForm from './SearchForm';
import AboutAuction from './AboutAuction';

function GermanCarAuctions() {
  return (
    <div>
      <MetaData />
      <Hero />
      <Benefits />
      <SearchForm />
      <CarsInStock />
      <ContactUs />
      <AboutAuction />
      <Faq />
    </div>
  );
}

export default GermanCarAuctions;
