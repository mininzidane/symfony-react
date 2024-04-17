import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';

function VehicleCard({ vehicleImage, origin, lotId, vin }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {vehicleImage && <div className={classes.image} style={{ backgroundImage: `url(${vehicleImage})` }} />}

      <div className={classes.details}>
        <div className={classes.detail}>
          <div>{intl.formatMessage({ id: 'shared.label.location' })}:</div>
          <div>{origin}</div>
        </div>
        {lotId && (
          <div className={classes.detail}>
            <div>{intl.formatMessage({ id: 'shared.label.lotId' })}:</div>
            <div>{lotId}</div>
          </div>
        )}
        <div className={classes.detail}>
          <div>{intl.formatMessage({ id: 'shared.label.vin' })}#:</div>
          <div>{vin}</div>
        </div>
      </div>
    </div>
  );
}

VehicleCard.defaultProps = {
  vehicleImage: '',
  origin: '',
  lotId: '',
  vin: '',
};

VehicleCard.propTypes = {
  vehicleImage: PropTypes.string,
  origin: PropTypes.string,
  lotId: PropTypes.number,
  vin: PropTypes.string,
};

export default VehicleCard;
