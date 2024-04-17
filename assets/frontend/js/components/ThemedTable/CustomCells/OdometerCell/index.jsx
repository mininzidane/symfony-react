/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import NumberService from 'frontend/js/lib/utils/NumberService';
import React from 'react';

function OdometerCell({ lot }) {
  const { odometer, odometerType, odometerBrand } = lot;

  const odometerString = [NumberService.formatNumber(odometer), odometerType, odometerBrand].filter(Boolean).join(' ');

  return <>{odometerString}</>;
}

export { OdometerCell };
