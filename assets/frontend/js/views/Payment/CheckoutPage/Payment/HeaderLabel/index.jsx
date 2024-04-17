import React from 'react';
import PaymentService from 'frontend/js/api/PaymentService';
import useIntl from 'frontend/js/hooks/useIntl';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import { FormattedMessage } from 'react-intl-phraseapp';
import useCheckoutContext from '../../_Context/useCheckoutContext';
import CheckoutSvg from './img/checkout.svg';
import useStyles from './useStyles';

function HeaderLabel() {
  const { isBelowMd } = useBreakpoint();
  const classes = useStyles();
  const intl = useIntl();

  const { product } = useCheckoutContext();

  const captionLabel =
    {
      [PaymentService.PRODUCT.MEMBERSHIP]: intl.formatMessage({ id: 'checkoutPage.caption.upgradingMembership' }),
      [PaymentService.PRODUCT.DEPOSIT]: intl.formatMessage({ id: 'checkoutPage.caption.deposit' }),
      [PaymentService.PRODUCT.SHIPPING]: intl.formatMessage({ id: 'checkoutPage.caption.shippingOrder' }),
      [PaymentService.PRODUCT.INVOICE]: intl.formatMessage({ id: 'checkoutPage.caption.invoice' }),
      [PaymentService.PRODUCT.CV_REPORT]: intl.formatMessage({ id: 'checkoutPage.caption.cvReport' }),
    }[product] || 'Checkout';

  return (
    <div className={classes.root}>
      <span className={classes.label}>
        {isBelowMd ? <FormattedMessage id="shared.label.checkout" /> : captionLabel}
      </span>

      <img src={CheckoutSvg} alt="icon" />
    </div>
  );
}

export default HeaderLabel;
