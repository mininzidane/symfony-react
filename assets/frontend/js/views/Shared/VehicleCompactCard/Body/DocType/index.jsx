/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

function DocType({ className, lot, lotPurchase }) {
  const isCopartAuction = Boolean(lot);
  let docType = null;
  if (isCopartAuction && lot?.title?.name) {
    docType = lot.title.name;
  }
  if (!isCopartAuction && lotPurchase?.ownershipDocType) {
    docType = `${lotPurchase.ownershipDocState} ${lotPurchase.ownershipDocType}`;
  }

  if (docType) {
    return (
      <div className={className}>
        <FormattedMessage id="shared.label.titleCode" />: {docType}
      </div>
    );
  }

  return null;
}

export default DocType;
