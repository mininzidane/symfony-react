/* eslint-disable react/prop-types */
import React from 'react';

function OtherAuction({ lotPurchase }) {
  return (
    <>
      {lotPurchase.auction} {lotPurchase.lotNumber}
    </>
  );
}

export default OtherAuction;
