/* eslint-disable react/prop-types */
import React from 'react';
import Amount from 'frontend/js/components/Amount';
import BidService from 'frontend/js/api/BidService';

function AmountCell({ value, bidStatus }) {
  if (BidService.STATUS_YOU_WON === bidStatus) {
    return null;
  }

  return <Amount value={value} hasCurrency />;
}

export default AmountCell;
