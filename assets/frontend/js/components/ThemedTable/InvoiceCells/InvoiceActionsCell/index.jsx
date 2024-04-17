/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import RouterService from 'frontend/js/api/RouterService';
import Amount from 'frontend/js/components/Amount';
import Button from 'frontend/js/components/Button';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useInvoiceType from '../useInvoiceType';
import DocumentToSign from '../_components/DocumentToSign';
import useStyles from './useStyles';

const InvoiceActionsCellStyles = { style: { padding: '12px 14px 12px 8px' } };

function InvoiceActionsCell({ invoice }) {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();
  const { id } = useCustomerHelper();
  const { isShipping, isLotPurchase } = useInvoiceType(invoice);
  const { balanceRemaining, shippingOrder, lotPurchase, customer, token } = invoice;
  const isBalanceRemaining = balanceRemaining && parseFloat(balanceRemaining, 10) > 0;
  const isUserPurchase = id === customer.id;
  const isInvoicePayment =
    isBalanceRemaining && (isShipping || (isLotPurchase && isUserPurchase && lotPurchase.ccAllowed));

  function getPaymentUrl() {
    if (!isBalanceRemaining || (!isInvoicePayment && isLotPurchase)) {
      return null;
    }

    if (isInvoicePayment) {
      return isShipping
        ? RouterService.getRoute('shippingPayment', null, false, { token: shippingOrder.token })
        : RouterService.getRoute('invoicePayment', null, false, { token });
    }

    return RouterService.getRoute(isShipping ? 'shippingInvoice' : 'invoiceView', null, false, { token });
  }

  const paymentUrl = getPaymentUrl();

  return (
    <div className={classes.root}>
      {isAboveSm ? (
        <>
          <Amount value={parseFloat(balanceRemaining, 10)} hasCurrency />
          {paymentUrl && (
            <Button
              label={<FormattedMessage id="shared.cta.payNow" />}
              href={paymentUrl}
              isTargetBlank={!isInvoicePayment}
              size="sm"
              isRegularCase
              isNowrap
            />
          )}
          <DocumentToSign lotPurchase={lotPurchase} isRegularCase />
        </>
      ) : (
        <>
          <div className={classes.mobileLabelWrap}>
            <span className={classes.mobileLabel}>
              <FormattedMessage id="shared.label.due" />:
            </span>
            <Amount value={parseFloat(balanceRemaining, 10)} hasCurrency />
          </div>

          <div className={classes.mobileActions}>
            {paymentUrl && (
              <Button
                label={<FormattedMessage id="shared.cta.payNow" />}
                href={paymentUrl}
                isTargetBlank={!isInvoicePayment}
                size="sm"
                isRegularCase
                isNowrap
              />
            )}
            <DocumentToSign lotPurchase={lotPurchase} isRegularCase />
          </div>
        </>
      )}
    </div>
  );
}

export { InvoiceActionsCell, InvoiceActionsCellStyles };
