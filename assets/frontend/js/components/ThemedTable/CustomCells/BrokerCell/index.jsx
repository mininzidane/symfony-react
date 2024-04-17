/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';

const BrokerCellStyles = { style: { paddingLeft: '14px' } };

function BrokerCell({ lotPurchase }) {
  const EMPTY_VALUE = '—';
  const { firstName, lastName } = lotPurchase.customer || {};

  return <>{firstName || lastName ? `${firstName} ${lastName}` : EMPTY_VALUE}</>;
}

export { BrokerCell, BrokerCellStyles };
