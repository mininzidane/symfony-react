/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';
import StringService from 'frontend/js/lib/utils/StringService';
import SalesStatusFormattedMessage from 'frontend/js/views/Shared/SalesStatusFormattedMessage';

function SaleStatusCell({ lot }) {
  const saleStatusKey = StringService.getStatusKeyFormString(lot.saleStatusString);
  if (!saleStatusKey) {
    return null;
  }

  return <SalesStatusFormattedMessage salesStatus={saleStatusKey} />;
}

export { SaleStatusCell };
