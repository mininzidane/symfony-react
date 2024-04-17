import React from 'react';
import PropTypes from 'prop-types';
import Vehicle from './Vehicle';
import useStyles from './useStyles';

function Vehicles({ availableNumber, onClick }) {
  const maxVehiclesNumber = 10;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {new Array(maxVehiclesNumber).fill(0).map((item, index) => (
        <Vehicle index={index + 1} availableNumber={availableNumber} onClick={onClick} key={index} />
      ))}
    </div>
  );
}

Vehicles.propTypes = {
  availableNumber: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Vehicles;
