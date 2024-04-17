/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function VehicleCell({ lot, lotPurchase }) {
  const classes = useStyles();
  const { description, year, make, model } = lot || {};
  const ymm = lotPurchase
    ? `${lotPurchase.vehicleYear} ${lotPurchase.vehicleMake} ${lotPurchase.vehicleModel}`
    : description || `${year} ${make} ${model}`;
  const vin = lotPurchase ? lotPurchase.vehicleVin : lot.vin;

  return (
    <div>
      <div>{ymm}</div>
      <div className={classes.vin}>{vin}</div>
    </div>
  );
}

export { VehicleCell };
