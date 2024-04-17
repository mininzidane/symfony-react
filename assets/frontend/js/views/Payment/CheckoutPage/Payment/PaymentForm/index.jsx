import React, { useEffect } from 'react';
import Card from 'frontend/js/components/Card';
import { FormattedMessage } from 'react-intl-phraseapp';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import useStyles from './useStyles';
import PaymentMethod from './PaymentMethod';

function PaymentForm() {
  const classes = useStyles();
  const { paymentMethod } = useCheckoutContext();
  const { options, selected, change } = paymentMethod;

  useEffect(() => {
    window.location.hash = '';
  }, []);

  return (
    <Card elevation={2} className={classes.card}>
      <div className={classes.title}>
        <FormattedMessage id="shared.label.paymentMethod" />
      </div>
      {options.map((method) => (
        <PaymentMethod methodName={method} isActive={method === selected} onClick={() => change(method)} key={method} />
      ))}
    </Card>
  );
}

PaymentForm.propTypes = {};

export default PaymentForm;
