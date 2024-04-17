/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';

function LotPurchase({ lotPurchase }) {
  const classes = useStyles();
  const { vehicleYear, vehicleMake, vehicleModel, lotNumber, vehicleVin, slug } = lotPurchase;

  return (
    <span className={classes.wrap}>
      <a href={RouterService.getRoute('lot', null, false, { id: lotNumber, slug: slug ?? '' })}>
        {vehicleYear} {vehicleMake} {vehicleModel}
      </a>
      {', '}
      <span className={classes.vin}>
        <span>VIN</span> #{vehicleVin}
      </span>
    </span>
  );
}

export default LotPurchase;
