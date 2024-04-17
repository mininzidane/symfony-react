/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import CopartAuction from './CopartAuction';
import Title from './Title';

function VehicleCardHeader({ lot, lotPurchase, onWatchlistButtonClick }) {
  if (lot) {
    return <CopartAuction lot={lot} onWatchlistButtonClick={onWatchlistButtonClick} />;
  }
  if (lotPurchase) {
    return <Title title={`${lotPurchase.vehicleYear} ${lotPurchase.vehicleMake} ${lotPurchase.vehicleModel}`} />;
  }
  return null;
}

export default VehicleCardHeader;
