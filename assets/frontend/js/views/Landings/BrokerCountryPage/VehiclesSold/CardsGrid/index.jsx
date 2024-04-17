import React from 'react';
import VehicleCard from '../VehicleCard';
import data from '../data';
import useStyles from './useStyles';

function CardsGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {data.map((vehicle) => (
        <VehicleCard key={vehicle.vin} data={vehicle} />
      ))}
    </div>
  );
}

export default CardsGrid;
