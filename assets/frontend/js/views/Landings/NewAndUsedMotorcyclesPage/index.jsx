import React from 'react';
import CountryService from 'frontend/js/api/CountryService';
import OurLounge from 'frontend/js/views/Landings/Shared/OurLounge';
import Faq from 'frontend/js/views/Landings/Shared/Faq';
import useLoungeCountry from 'frontend/js/hooks/useLoungeCountry';
import MetaData from './MetaData';
import ContactUs from './ContactUs';
import CarsInStock from './CarsInStock';
import Hero from './Hero';
import Benefits from './Benefits';
import SearchForm from './SearchForm';

function NewAndUsedMotorcyclesPage() {
  const userCountryIso2 = CountryService.getUserCountryIso2();
  const loungeCountry = useLoungeCountry(userCountryIso2);

  return (
    <div>
      <MetaData />
      <Hero />
      <Benefits />
      <SearchForm />
      <CarsInStock />
      {loungeCountry && <OurLounge iso2={userCountryIso2} />}
      <ContactUs loungeCountry={loungeCountry} />
      {loungeCountry && <Faq iso2={userCountryIso2} />}
    </div>
  );
}

export default NewAndUsedMotorcyclesPage;
