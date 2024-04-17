/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import SalesStatusFormattedMessage from 'frontend/js/views/Shared/SalesStatusFormattedMessage';

function SaleStatus({ lot }) {
  const saleStatusKey = lot.saleStatusString.replace(/\s/g, '_').replace(/\W/g, '').toLowerCase();

  return (
    <>
      <SalesStatusFormattedMessage salesStatus={saleStatusKey} />

      <TooltipOnHover
        badgeTop={-1}
        isFlipEnabled={false}
        content={<FormattedMessage id={`dynamic.saleStatus.description${lot.saleStatus}`} />}
      />
    </>
  );
}

export default SaleStatus;
