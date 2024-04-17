/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function SaleDate({ lotPurchase }) {
  const EMPTY_VALUE = '—';
  return <div>{lotPurchase?.saleDate ? DateTimeService.formatFromISOString(lotPurchase.saleDate) : EMPTY_VALUE}</div>;
}

export { SaleDate };
