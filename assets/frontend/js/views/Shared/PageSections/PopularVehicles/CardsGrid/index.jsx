import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import VehicleCard from '../VehicleCard';
import useStyles from './useStyles';

function DesktopCards({ vehicles }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {vehicles.map((props, index) => (
        <VehicleCard key={index} {...props} className={classnames({ 'is-big': index === 0 })} />
      ))}
    </div>
  );
}

DesktopCards.propTypes = {
  vehicles: PropTypes.array.isRequired,
};

export default DesktopCards;
