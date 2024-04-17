import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'backend/js/api/RouterService';

function ShippingDistance({ instantOffer }) {
  const originAddress = [instantOffer.pickupAddress, instantOffer.pickupCity, instantOffer.zip]
    .filter(Boolean)
    .join(' ');
  const destinationAddress = [
    instantOffer.nearestLocation?.address,
    instantOffer.nearestLocation?.city,
    instantOffer.nearestLocation?.zip,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={RouterService.getRoute('googleMapDirection', {
        api: 1,
        origin: originAddress,
        destination: destinationAddress,
      })}
      target="_blank"
      rel="noopener noreferrer"
    >
      ({instantOffer.shippingDistance} mi)
    </a>
  );
}

ShippingDistance.propTypes = {
  instantOffer: PropTypes.object.isRequired,
};

export default ShippingDistance;
