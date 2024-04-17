/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';

function DocTypeCell({ lotPurchase }) {
  const EMPTY_VALUE = '—';
  const docType = lotPurchase?.ownershipDocType
    ? `${lotPurchase.ownershipDocState} ${lotPurchase.ownershipDocType}`
    : null;

  return <>{docType || EMPTY_VALUE}</>;
}

export { DocTypeCell };
