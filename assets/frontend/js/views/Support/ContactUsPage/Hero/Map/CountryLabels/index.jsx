/* eslint-disable react/prop-types */
import React from 'react';
import CountryService from 'frontend/js/api/CountryService';
import CountryLabel from './CountryLabel';

function CountryLabels({ country, scale, zoom }) {
  const { COUNTRIES } = CountryService;

  return (
    <>
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={270}
        top={240}
        text={COUNTRIES.usa.name}
        isVisible={country === COUNTRIES.usa.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={874}
        top={448}
        text={COUNTRIES.nigeria.name}
        isVisible={country === COUNTRIES.nigeria.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={270}
        top={408}
        text={COUNTRIES.guatemala.name}
        isVisible={country === COUNTRIES.guatemala.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={294}
        top={410}
        text={COUNTRIES.honduras.name}
        isVisible={country === COUNTRIES.honduras.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={275}
        top={420}
        text={COUNTRIES.elSalvador.name}
        isVisible={country === COUNTRIES.elSalvador.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={943}
        top={230}
        text={COUNTRIES.albania.name}
        isVisible={country === COUNTRIES.albania.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={970}
        top={219}
        text={COUNTRIES.bulgaria.name}
        isVisible={country === COUNTRIES.bulgaria.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={965}
        top={197}
        text={COUNTRIES.romania.name}
        isVisible={country === COUNTRIES.romania.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={1002}
        top={173}
        text={COUNTRIES.ukraine.name}
        isVisible={country === COUNTRIES.ukraine.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={980}
        top={146}
        text={COUNTRIES.belarus.name}
        isVisible={country === COUNTRIES.belarus.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={1074}
        top={224}
        text={COUNTRIES.georgia.name}
        isVisible={country === COUNTRIES.georgia.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={1299}
        top={88}
        text={COUNTRIES.russia.name}
        isVisible={country === COUNTRIES.russia.iso2}
      />
      <CountryLabel
        scale={scale}
        zoom={zoom}
        left={1545}
        top={260}
        text={COUNTRIES.southKorea.name}
        isVisible={country === COUNTRIES.southKorea.iso2}
      />
    </>
  );
}

export default CountryLabels;
