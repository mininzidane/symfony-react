/* eslint-disable react/prop-types */
import React from 'react';
import NumberService from 'frontend/js/lib/utils/NumberService';

const EstRetailValueCellStyles = {};

function EstRetailValue({ lot }) {
  const { currency, acv } = lot;

  return (
    <>
      <strong>{NumberService.formatCurrency(acv, currency)}</strong> {currency}
    </>
  );
}

export { EstRetailValue, EstRetailValueCellStyles };
