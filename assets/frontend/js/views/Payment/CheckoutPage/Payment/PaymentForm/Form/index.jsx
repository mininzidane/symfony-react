/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import Card from 'frontend/js/components/Card';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import CreditCardForm from './CreditCardForm';
import useStyles from './useStyles';

function CheckoutForm({ className, formClassName, onFormClick }) {
  const classes = useStyles();
  const { form } = useCheckoutContext();

  return (
    <Card elevation={2} className={classnames(classes.root, className)} onClick={onFormClick}>
      <CreditCardForm setForm={form.set} className={formClassName} />
    </Card>
  );
}

export default CheckoutForm;
