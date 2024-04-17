/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import CountryService from 'frontend/js/api/CountryService';
import useMapPosition from './useMapPosition';
import useZoom from './useZoom';
import WorldMap from './WorldMap';
import Pins from './Pins';
import CountryLabels from './CountryLabels';
import UsaMap from './Countries/UsaMap';
import GuatemalaMap from './Countries/GuatemalaMap';
import HondurasMap from './Countries/HondurasMap';
import ElSalvadorMap from './Countries/ElSalvadorMap';
import NigeriaMap from './Countries/NigeriaMap';
import AlbaniaMap from './Countries/AlbaniaMap';
import BulgariaMap from './Countries/BulgariaMap';
import RomaniaMap from './Countries/RomaniaMap';
import UkraineMap from './Countries/UkraineMap';
import BelarusMap from './Countries/BelarusMap';
import GeorgiaMap from './Countries/GeorgiaMap';
import RussiaMap from './Countries/RussiaMap';
import SouthKoreaMap from './Countries/SouthKoreaMap';
import useStyles from './useStyles';

function Map({ country, onCountryChange }) {
  const classes = useStyles();
  const { COUNTRIES } = CountryService;
  const mapWrapRef = useRef();
  const [countryLabel, setCountryLabel] = useState();
  const { zoom, scale, handleZoomUpdate, isZoomInDisabled, isZoomOutDisabled } = useZoom();
  const { shiftX, shiftY, handleMouseMove, handleTouchMove, isDragging, setIsDragging } = useMapPosition(
    country,
    scale,
  );

  return (
    <div className={classes.root}>
      <div ref={mapWrapRef} className={classes.mapWrap} style={{ transform: `scale(${scale})` }}>
        <div
          className={classnames(classes.map, isDragging && 'is-dragging')}
          style={{ transform: `translate(${shiftX}px, ${shiftY}px)` }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <svg width="1778" height="923" viewBox="0 0 1778 923" fill="none" xmlns="http://www.w3.org/2000/svg">
            <WorldMap />
            <UsaMap
              iso2={COUNTRIES.usa.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.usa.iso2)}
              setCountryLabel={setCountryLabel}
              scale={scale}
            />
            <GuatemalaMap
              iso2={COUNTRIES.guatemala.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.guatemala.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <HondurasMap
              iso2={COUNTRIES.honduras.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.honduras.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <ElSalvadorMap
              iso2={COUNTRIES.elSalvador.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.elSalvador.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <NigeriaMap
              iso2={COUNTRIES.nigeria.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.nigeria.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <AlbaniaMap
              iso2={COUNTRIES.albania.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.albania.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <BulgariaMap
              iso2={COUNTRIES.bulgaria.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.bulgaria.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <RomaniaMap
              iso2={COUNTRIES.romania.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.romania.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <UkraineMap
              iso2={COUNTRIES.ukraine.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.ukraine.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <BelarusMap
              iso2={COUNTRIES.belarus.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.belarus.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <GeorgiaMap
              iso2={COUNTRIES.georgia.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.georgia.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <RussiaMap
              iso2={COUNTRIES.russia.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.russia.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <SouthKoreaMap
              iso2={COUNTRIES.southKorea.iso2}
              currentCountry={country}
              onClick={() => onCountryChange(COUNTRIES.southKorea.iso2)}
              setCountryLabel={setCountryLabel}
            />
            <Pins scale={scale} />
          </svg>

          <CountryLabels scale={scale} zoom={zoom} country={countryLabel} />
        </div>
      </div>

      <div className={classes.controls}>
        <button
          className={classnames(classes.control, isZoomInDisabled && 'is-disabled')}
          type="button"
          onClick={() => handleZoomUpdate(true)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <rect y="6.73682" width="16" height="2.52632" rx="1.26316" />
            <rect x="6.73682" y="16" width="16" height="2.52632" rx="1.26316" transform="rotate(-90 6.73682 16)" />
          </svg>
        </button>

        <button
          className={classnames(classes.control, isZoomOutDisabled && 'is-disabled')}
          type="button"
          onClick={() => handleZoomUpdate(false)}
        >
          <svg width="16" height="3" viewBox="0 0 16 3">
            <rect width="16" height="2.5" rx="1.25" />
          </svg>
        </button>
      </div>
    </div>
  );
}

Map.propTypes = {};

export default Map;
