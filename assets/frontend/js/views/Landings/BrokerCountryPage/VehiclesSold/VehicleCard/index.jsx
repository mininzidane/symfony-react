import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function VehicleCard({ data }) {
  const classes = useStyles();
  const { img, price, description, vin, damage, mileage } = data;

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img src={img} alt="Vehicle" />
        <div className={classes.price}>
          {price} <span className={classes.currency}>USD</span>
        </div>
      </div>

      <div className={classes.details}>
        <div className={classes.description}>{description}</div>

        <div className={classes.stats}>
          <div>
            VIN: <strong>{vin}</strong>
          </div>
          <div>
            Повреждения: <strong>{damage}</strong>{' '}
          </div>
          <div>
            Пробег: <strong>{mileage}</strong>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

VehicleCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default VehicleCard;
