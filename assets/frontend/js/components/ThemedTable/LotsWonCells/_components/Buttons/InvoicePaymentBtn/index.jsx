import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';

function InvoicePaymentBtn({ token, isCombineShippingWithLotPurchase, ...props }) {
  let query = null;
  if (isCombineShippingWithLotPurchase) {
    query = { purchaseWithShipping: 1 };
  }
  return (
    <Button
      href={RouterService.getRoute('invoicePayment', query, false, { token })}
      label={<FormattedMessage id="shared.cta.payNow" />}
      size="sm"
      isNowrap
      {...props}
    />
  );
}

InvoicePaymentBtn.propTypes = {
  token: PropTypes.string.isRequired,
  isCombineShippingWithLotPurchase: PropTypes.bool,
};

InvoicePaymentBtn.defaultProps = {
  isCombineShippingWithLotPurchase: false,
};

export default InvoicePaymentBtn;
