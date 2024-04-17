import React from 'react';
import { useParams } from 'react-router-dom';
import CountryService from 'frontend/js/api/CountryService';
import OurLounge from 'frontend/js/views/Landings/Shared/OurLounge';
import Faq from 'frontend/js/views/Landings/Shared/Faq';
import Hero from './Hero';
import Services from './Services';
import CarsInStock from './CarsInStock';
import Popular from './Popular';
import Benefits from './Benefits';
import Reviews from './Reviews';
import ContactUs from './ContactUs';
import OurTeam from './OurTeam';
import SchemaSearchBlock from './SchemaSearchBlock';
import MetaData from './MetaData';
import useStyles from './useStyles';

function LoungePage() {
  const classes = useStyles();
  let { country } = useParams();

  if (country === 'el-salvador') {
    country = 'elSalvador';
  }

  if (country === 'korea') {
    country = 'southKorea';
  }

  const { iso2, name } = CountryService.COUNTRIES[country];

  return (
    <div className={classes.root}>
      <Hero iso2={iso2} />
      <Services iso2={iso2} />
      <CarsInStock iso2={iso2} countryName={name} />
      <Popular country={country} countryName={name} />
      <Benefits countryName={name} />
      <Reviews iso2={iso2} countryName={name} />
      <ContactUs iso2={iso2} />
      <OurLounge iso2={iso2} />
      <OurTeam iso2={iso2} />
      <Faq iso2={iso2} />
      <MetaData iso2={iso2} />
      <SchemaSearchBlock country={country} iso2={iso2} />
    </div>
  );
}

export default LoungePage;
