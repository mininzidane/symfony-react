/* eslint-disable react/prop-types */
import React from 'react';
import NumberService from 'frontend/js/lib/utils/NumberService';

function PreAccidentValue({ lot }) {
  return (
    <>
      {NumberService.formatCurrency(lot.acv, lot.currency)}
      &nbsp;
      {lot.currency}
    </>
  );
}

export default PreAccidentValue;
