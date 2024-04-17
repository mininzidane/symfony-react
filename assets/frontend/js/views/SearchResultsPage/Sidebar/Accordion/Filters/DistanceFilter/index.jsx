import React from 'react';
import CountryService from 'frontend/js/api/CountryService';
import ZipFilter from './ZipFilter';
import PortFilter from './PortFilter';

function DistanceFilter() {
  if (CountryService.isDomestic()) {
    return <ZipFilter />;
  }

  return <PortFilter />;
}

export default DistanceFilter;
