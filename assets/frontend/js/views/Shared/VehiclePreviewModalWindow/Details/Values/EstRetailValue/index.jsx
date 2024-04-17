/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import NumberService from 'frontend/js/lib/utils/NumberService';
import LotService from 'frontend/js/api/LotService';

function EstRetailValue({ lot }) {
  const { inventoryAuction } = lot;
  const isNpa = inventoryAuction === LotService.AUCTION_NPA;
  return (
    <>
      {NumberService.formatCurrency(lot.acv, lot.currency)}
      &nbsp;
      {lot.currency}
      {!isNpa && (
        <TooltipOnHover
          maxWidth={420}
          badgeTop={-1}
          boundariesElement="viewport"
          content={
            <FormattedMessage
              id="lotPage.details.estimatedRetailValue.tooltip"
              values={{
                title: (chunks) => <div className="fw-7 mb-15">{chunks}</div>,
                strong: (chunks) => <strong>{chunks}</strong>,
                br: <br />,
              }}
            />
          }
        />
      )}
    </>
  );
}

export default EstRetailValue;
