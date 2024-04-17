import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel/';
import useBillingInformationContext from '../../_Context/useBillingInformationContext';
import CreditCard from './CreditCard';
import NewCreditCard from './NewCreditCard';
import useStyles from './useStyles';

function PaymentCards() {
  const classes = useStyles();
  const intl = useIntl();
  const { setView, paymentCards } = useBillingInformationContext();
  const { creditCards, isLoading } = paymentCards;

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <SpinnerWheel size={34} thickness={3} isCentered color="blue" />
      </div>
    );
  }

  const isCreditCards = creditCards && creditCards.length > 0;

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>{intl.formatMessage({ id: 'billingInformationPage.paymentCards' })}</h2>
      {!isCreditCards && (
        <div className={classes.noResults}>{intl.formatMessage({ id: 'billingInformationPage.noResults' })}</div>
      )}
      <div className={classes.grid}>
        <NewCreditCard onClick={() => setView('form')} />
        {isCreditCards &&
          creditCards.map((card) => (
            <CreditCard card={card} key={card.token} onClick={() => setView('form', card.token)} />
          ))}
      </div>
    </div>
  );
}

export default PaymentCards;
