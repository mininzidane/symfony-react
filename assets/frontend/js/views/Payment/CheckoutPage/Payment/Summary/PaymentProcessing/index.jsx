import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import LockSvg from './img/lock.svg';
import useStyles from './useStyles';

function PaymentProcessing() {
  const intl = useIntl();
  const classes = useStyles();

  const translationSet = {
    submittingMessage: intl.formatMessage({ id: 'checkoutPage.summary.paymentProcessing' }),
  };

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <SpinnerWheel color="blue" thickness={2} size={48} />
        <img className={classes.svg} src={LockSvg} alt="Payment Lock" />
      </div>

      <div className={classes.message}>{translationSet.submittingMessage}</div>
    </div>
  );
}

export default PaymentProcessing;
