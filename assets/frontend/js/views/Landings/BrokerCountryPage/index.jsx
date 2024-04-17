/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import CountryService from 'frontend/js/api/CountryService';
import SimpleHeader from 'frontend/js/views/Shared/SimpleHeader';
import Hero from './Hero';
import VehiclesSold from './VehiclesSold';
import ExtraServices from './ExtraServices';
import ReviewsSection from './ReviewsSection';
import Features from './Features';
import RegisterCtaSection from './RegisterCtaSection';

function BrokerPage({ country }) {
  const { COUNTRIES } = CountryService;
  const { russia, ukraine, belarus } = COUNTRIES;

  const params = useParams();
  const iso2 = String(country || params.country || belarus.iso2).toUpperCase();
  const countryIso2 = iso2 === russia.iso2 ? ukraine.iso2 : iso2;

  return (
    <div>
      <SimpleHeader />
      <Hero iso2={countryIso2} />
      <VehiclesSold iso2={countryIso2} />
      <ExtraServices iso2={countryIso2} />
      <ReviewsSection />
      <Features iso2={countryIso2} />
      <RegisterCtaSection iso2={countryIso2} />
    </div>
  );
}

export default BrokerPage;
