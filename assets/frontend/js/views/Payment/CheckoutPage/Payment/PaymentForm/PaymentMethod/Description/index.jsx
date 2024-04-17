/* eslint-disable react/prop-types */
import React from 'react';
import PaymentService from 'frontend/js/api/PaymentService';
import RouterService from 'frontend/js/api/RouterService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import HintIcon from './icons/Hint';
import useStyles from './useStyles';

function Description({ method }) {
  const classes = useStyles();
  const { payPalVenmoEnabled } = useCheckoutContext();

  return (
    <div className={classes.root}>
      {method === PaymentService.METHOD.GOOGLE_PAY && (
        <FormattedMessage id="checkoutPage.paymentDetails.googlePay.desc" />
      )}
      {method === PaymentService.METHOD.APPLE_PAY && (
        <FormattedMessage id="checkoutPage.paymentDetails.applePay.desc" />
      )}
      {method === PaymentService.METHOD.ZELLE && (
        <>
          <FormattedMessage id="checkoutPage.paymentDetails.zelle.desc" />
          {Boolean(!RouterService.test('membershipPayment')) && (
            <>
              <div>
                <div className={classes.hint}>
                  <HintIcon />
                  <FormattedMessage id="checkoutPage.paymentDetails.zelle.proTip" />
                  &nbsp;
                </div>
              </div>
              <FormattedMessage id="checkoutPage.paymentDetails.zelle.desc2" />
            </>
          )}
        </>
      )}
      {method === PaymentService.METHOD.MONEYGRAM && (
        <FormattedMessage id="checkoutPage.paymentDetails.moneyGram.desc" />
      )}
      {method === PaymentService.METHOD.WIRE_TRANSFER && (
        <>
          <div className={classes.hint} style={{ marginTop: 5 }}>
            <HintIcon />
            <FormattedMessage id="checkoutPage.paymentDetails.wireTransfer.hint" />
          </div>
          <FormattedMessage id="checkoutPage.paymentDetails.wireTransfer.desc" />
        </>
      )}
      {Boolean(method === PaymentService.METHOD.PAYPAL && !payPalVenmoEnabled) && (
        <>
          <FormattedMessage id="checkoutPage.paymentDetails.paypal.title" />.
          <br />
          <FormattedMessage id="checkoutPage.paymentDetails.paypal.desc" />.
        </>
      )}
      {Boolean(method === PaymentService.METHOD.PAYPAL && payPalVenmoEnabled) && (
        <>
          <FormattedMessage id="checkoutPage.paymentDetails.paypalvenmo.title" />.
          <br />
          <FormattedMessage id="checkoutPage.paymentDetails.paypalvenmo.desc" />.
        </>
      )}
    </div>
  );
}

export default Description;
