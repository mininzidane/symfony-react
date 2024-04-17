/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Amount from 'frontend/js/components/Amount';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useInvoiceType from '../useInvoiceType';
import useStyles from './useStyles';

function InvoiceCell({ invoice }) {
  const classes = useStyles();
  const { brokerDisplayOnlyLotPurchase } = useCustomerHelper();
  const { isShipping, isLotPurchase } = useInvoiceType(invoice);
  const token = isShipping ? invoice.shippingOrder.token : invoice.token;

  let query = null;
  if (isLotPurchase && brokerDisplayOnlyLotPurchase) {
    query = { displayLpOnly: true };
  }

  return (
    <div className={classes.root}>
      <Amount value={parseFloat(invoice.subtotal, 10)} hasCurrency />
      <ButtonOutlined
        className={classes.button}
        label={<FormattedMessage id="shared.cta.downloadInvoice" />}
        href={RouterService.getRoute(isShipping ? 'shippingInvoice' : 'invoiceView', query, false, { token })}
        size="sm"
        isTargetBlank
        isThinBorder
        isRegularCase
      />
    </div>
  );
}

export { InvoiceCell };
