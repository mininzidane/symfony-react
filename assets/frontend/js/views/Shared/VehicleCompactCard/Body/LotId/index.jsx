/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

function LotId({ className, lot, lotPurchase }) {
  const isCopartAuction = Boolean(lot);
  let lotId = null;
  if (isCopartAuction && lot?.id) {
    lotId = lot.id;
  }
  if (!isCopartAuction && lotPurchase?.lotNumber) {
    lotId = `${lotPurchase.auction} ${lotPurchase.lotNumber}`;
  }

  if (lotId) {
    return (
      <div className={className}>
        <FormattedMessage id="shared.label.lotId" />: {lotId}
      </div>
    );
  }

  return null;
}

export default LotId;
