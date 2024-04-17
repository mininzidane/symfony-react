/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import { Collapse } from '@material-ui/core';
import { FormattedMessage } from 'react-intl-phraseapp';
import PaymentService from 'frontend/js/api/PaymentService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import MoneyGramSvg from 'frontend/images/shared/payment-services/moneygram-logo.svg';
import ZelleSvg from 'frontend/images/shared/payment-services/zelle-short.svg';
import CreditCardsSvg from 'frontend/images/shared/payment-services/credit-cards-high-contrast.svg';
import WireTransferIconSvg from 'frontend/images/shared/payment-services/wire-transfer-icon.svg';
import GooglePaySvg from 'frontend/images/shared/payment-services/google-pay-icon.svg';
import ApplePaySvg from 'frontend/images/shared/payment-services/apple-pay-icon.svg';
import PayPalSvg from 'frontend/images/shared/payment-services/p-paypal.svg';
import VenmoSvg from 'frontend/images/shared/payment-services/venmo.svg';
import CreditCardForm from '../Form';
import Description from './Description';
import useStyles from './useStyles';

function PaymentMethod({ methodName, isActive, onClick }) {
  const ANIMATION_DURATION = 300;
  const classes = useStyles();
  const { payPalVenmoEnabled } = useCheckoutContext();

  const captionMap = {
    [PaymentService.METHOD.ZELLE]: (
      <>
        <FormattedMessage id="shared.cta.payWith" /> Zelle
      </>
    ),
    [PaymentService.METHOD.MONEYGRAM]: 'MoneyGram',
    [PaymentService.METHOD.WIRE_TRANSFER]: <FormattedMessage id="shared.label.bankWireTransfer" />,
    [PaymentService.METHOD.CREDIT_CARD]: <FormattedMessage id="shared.label.creditCard" />,
    [PaymentService.METHOD.APPLE_PAY]: 'Apple Pay',
    [PaymentService.METHOD.GOOGLE_PAY]: 'Google Pay',
    [PaymentService.METHOD.PAYPAL]: payPalVenmoEnabled ? 'PayPal & Venmo' : 'PayPal Pay',
  };

  const iconMap = {
    [PaymentService.METHOD.ZELLE]: <img src={ZelleSvg} alt="Zelle" width="52" className={classes.logo} />,
    [PaymentService.METHOD.MONEYGRAM]: <img src={MoneyGramSvg} alt="MoneyGram" width="52" className={classes.logo} />,
    [PaymentService.METHOD.WIRE_TRANSFER]: (
      <img src={WireTransferIconSvg} alt="WireTransfer" width="52" className={classes.logo} />
    ),
    [PaymentService.METHOD.CREDIT_CARD]: (
      <img src={CreditCardsSvg} alt="CreditCards" width="133" className={classes.logo} />
    ),
    [PaymentService.METHOD.APPLE_PAY]: <img src={ApplePaySvg} alt="ApplePay" width="52" className={classes.logo} />,
    [PaymentService.METHOD.GOOGLE_PAY]: <img src={GooglePaySvg} alt="GooglePay" width="52" className={classes.logo} />,
    [PaymentService.METHOD.PAYPAL]: payPalVenmoEnabled ? (
      <div className={classes.multiLogo}>
        <img src={PayPalSvg} alt="PayPal Pay" width="65" />
        <img src={VenmoSvg} alt="Venmo Pay" width="57" />
      </div>
    ) : (
      <img src={PayPalSvg} alt="PayPal Pay" width="52" className={classes.logo} />
    ),
  };

  return (
    <div className={classnames(classes.root, isActive && 'is-active')}>
      <button type="button" className={classnames(classes.trigger, isActive && 'is-active')} onClick={onClick}>
        <div className={classnames(classes.radioButton, isActive && 'is-active')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="18" height="18" rx="9" stroke="#2158F5" strokeWidth="2" />
            <circle cx="10" cy="10" r="4.5" fill="#2158F5" stroke="#2158F5" />
          </svg>
        </div>

        <div className={classes.methodCaption}>{captionMap[methodName]}</div>

        {iconMap[methodName]}
      </button>

      <Collapse in={isActive} timeout={ANIMATION_DURATION}>
        {methodName === PaymentService.METHOD.CREDIT_CARD ? (
          <CreditCardForm onFormClick={onClick} className={classes.cardFormWrap} formClassName={classes.cardForm} />
        ) : (
          <Description method={methodName} />
        )}
      </Collapse>
    </div>
  );
}

export default PaymentMethod;
