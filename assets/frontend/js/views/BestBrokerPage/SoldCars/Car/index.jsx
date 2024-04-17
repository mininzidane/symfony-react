import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Car({ name, location }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{name}</div>
      <div className={classes.container}>
        <div className={classes.column}>
          Location: <strong className="text-gray">{location}</strong>
        </div>
        <div className={classes.column}>
          Broker: <strong className="text-gray">AutoBidMaster, LLC</strong>
        </div>
        <div className={classes.column}>
          Sale type: <strong className="text-gray">Copart US</strong>
        </div>
      </div>
    </div>
  );
}

Car.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default Car;
