import React from 'react';
import classnames from 'classnames';
import Container from 'frontend/js/components/Container';
import CreditCardForm from './CreditCardForm';
import PaymentCards from './PaymentCards';
import useBillingInformationContext from '../_Context/useBillingInformationContext';
import Summary from './Summary';
import useStyles from './useStyles';

function BillingInformation() {
  const classes = useStyles();
  const { view } = useBillingInformationContext();

  return (
    <Container className={classnames(classes.root, { 'is-form': view === 'form' })}>
      {view === 'form' && <CreditCardForm />}
      {view === 'list' && <PaymentCards />}
      <Summary />
    </Container>
  );
}

export default BillingInformation;
