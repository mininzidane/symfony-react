/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import RouterService from 'frontend/js/api/RouterService';
import Amount from 'frontend/js/components/Amount';
import Button from 'frontend/js/components/Button';
import DownloadButton from 'frontend/js/views/Shared/DownloadButton';
import useStyles from './useStyles';

function ShippingDue({ className, shippingOrder, invoice, hasCurrency }) {
  if (!shippingOrder || !shippingOrder?.invoice) {
    return null;
  }

  const classes = useStyles();
  const { id } = useCustomerHelper();
  const { token } = shippingOrder;
  const { paid, balanceRemaining, customer } = !invoice.lotPurchase ? invoice : shippingOrder.invoice;
  const isBalanceRemaining = balanceRemaining && parseFloat(balanceRemaining, 10) > 0;
  const isInvoicePayment = id === customer.id;

  const shippingPaymentUrl = RouterService.getRoute('shippingPayment', null, false, { token });
  const shippingInvoiceUrl = RouterService.getRoute('shippingInvoice', null, false, { token });

  return (
    <div className={classnames(classes.root, className)}>
      <Amount
        value={paid ? 0 : parseFloat(balanceRemaining, 10)}
        hasCurrency={hasCurrency}
        className={classes.amount}
      />
      {isBalanceRemaining && (
        <div className={classes.cta}>
          <Button
            label={<FormattedMessage id="shared.cta.payNow" />}
            href={isInvoicePayment ? shippingPaymentUrl : shippingInvoiceUrl}
            size="sm"
            isInline
            isRegularCase
            isTargetBlank={!isInvoicePayment}
            isNowrap
          />
        </div>
      )}
      {paid && (
        <div className={classes.cta}>
          <DownloadButton
            href={shippingInvoiceUrl}
            label={<FormattedMessage id="shared.label.invoice" />}
            isBackgroundTransparent
            size="sm"
            isInline
            isThinBorder
            isRegularCase
            isTargetBlank
          />
        </div>
      )}
    </div>
  );
}

ShippingDue.propTypes = {
  className: PropTypes.string,
  hasCurrency: PropTypes.bool,
};

ShippingDue.defaultProps = {
  className: '',
  hasCurrency: true,
};

export default ShippingDue;
