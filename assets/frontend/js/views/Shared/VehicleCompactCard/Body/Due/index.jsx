import React from 'react';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function Due() {
  const classes = useStyles();
  const { amount, invoice } = useLotWonContext();
  const { paid } = invoice;

  if (!paid && amount > 0) {
    return (
      <div className={classes.root}>
        <FormattedMessage id="shared.label.due" className={classes.label} />:{' '}
        {NumberService.formatCurrency(parseFloat(amount, 10))} USD
      </div>
    );
  }

  return null;
}

export default Due;
