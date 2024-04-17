/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useInvoiceType from '../useInvoiceType';

function InvoiceTypeCell({ invoice }) {
  const { isShipping, isLotPurchase, isMembership, isShippingACP, isLotPurchaseACP } = useInvoiceType(invoice);

  if (isMembership) {
    return <FormattedMessage id="receiptPage.membership" />;
  }

  if (isShipping || isShippingACP) {
    return <FormattedMessage id="lotsWonPage.shippingOrder" />;
  }

  if (isLotPurchase || isLotPurchaseACP) {
    return <FormattedMessage id="shared.label.purchase" />;
  }

  return null;
}

export { InvoiceTypeCell };
