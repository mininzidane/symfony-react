import React from 'react';
import PropTypes from 'prop-types';
import VehicleCard from '../VehicleCard';
import useStyles from './useStyles';

function DesktopCards({ vehicles }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={index} {...vehicle} />
      ))}
    </div>
  );
}

DesktopCards.propTypes = {
  vehicles: PropTypes.array.isRequired,
};

export default DesktopCards;
