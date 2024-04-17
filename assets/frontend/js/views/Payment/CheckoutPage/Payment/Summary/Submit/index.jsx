import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import PaymentService from 'frontend/js/api/PaymentService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import GooglePay from 'frontend/js/views/Payment/CheckoutPage/Payment/Summary/Submit/GooglePay';
import ApplePay from './ApplePay';
import CreditCard from './CreditCard';
import WireTransfer from './WireTransfer';
import PayPal from './PayPal';
import Zelle from './Zelle';
import MoneyGram from './MoneyGram';
import useStyles from './useStyles';

function Submit() {
  const classes = useStyles();
  const intl = useIntl();
  const { paymentMethod, product } = useCheckoutContext();
  const { selected } = paymentMethod;

  const ctaLabel =
    {
      [PaymentService.PRODUCT.MEMBERSHIP]: intl.formatMessage({ id: 'shared.cta.upgradeMembership' }),
      [PaymentService.PRODUCT.DEPOSIT]: intl.formatMessage({ id: 'shared.cta.increaseBuyerPower' }),
      [PaymentService.PRODUCT.SHIPPING]: intl.formatMessage({ id: 'shared.cta.payForShipping' }),
      [PaymentService.PRODUCT.INVOICE]: intl.formatMessage({ id: 'shared.cta.payNow' }),
      [PaymentService.PRODUCT.CV_REPORT]: intl.formatMessage({ id: 'shared.cta.payNow' }),
    }[product] || 'Confirm';

  return (
    <div className={classes.root}>
      {selected === PaymentService.METHOD.CREDIT_CARD && <CreditCard ctaLabel={ctaLabel} />}

      {selected === PaymentService.METHOD.WIRE_TRANSFER && <WireTransfer ctaLabel={ctaLabel} />}

      {selected === PaymentService.METHOD.PAYPAL && <PayPal />}

      {selected === PaymentService.METHOD.APPLE_PAY && <ApplePay />}

      {selected === PaymentService.METHOD.GOOGLE_PAY && <GooglePay />}

      {selected === PaymentService.METHOD.ZELLE && <Zelle ctaLabel={ctaLabel} />}

      {selected === PaymentService.METHOD.MONEYGRAM && <MoneyGram ctaLabel={ctaLabel} />}
    </div>
  );
}

export default Submit;
