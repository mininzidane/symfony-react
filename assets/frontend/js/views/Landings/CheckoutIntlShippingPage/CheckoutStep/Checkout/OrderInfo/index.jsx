import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../Card';
import Destination from './Destination';
import VehicleCard from './VehicleCard';
import useStyles from './useStyles';
import CopartSvg from './img/Copart.svg';

function OrderInfo({ destination, ymm, vehicleImage, origin, lotId, vin }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Destination destination={destination} />
      <Card
        title={
          <div className={classes.title}>
            <div>{ymm}</div>
            <img src={CopartSvg} alt="Copart" />
          </div>
        }
        className={classes.card}
      >
        <VehicleCard vehicleImage={vehicleImage} origin={origin} lotId={lotId} vin={vin} />
      </Card>
    </div>
  );
}

OrderInfo.defaultProps = {
  destination: '',
  ymm: '',
  vehicleImage: '',
  origin: '',
  lotId: '',
  vin: '',
};

OrderInfo.propTypes = {
  destination: PropTypes.string,
  ymm: PropTypes.string,
  vehicleImage: PropTypes.string,
  origin: PropTypes.string,
  lotId: PropTypes.number,
  vin: PropTypes.string,
};

export default OrderInfo;
