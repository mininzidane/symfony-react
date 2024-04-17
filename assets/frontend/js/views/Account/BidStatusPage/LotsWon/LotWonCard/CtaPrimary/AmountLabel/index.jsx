import React from 'react';
import NumberService from 'frontend/js/lib/utils/NumberService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import useStyles from './useStyles';

function AmountLabel() {
  const { formatCurrency } = NumberService;
  const classes = useStyles();

  const { amount, invoice } = useLotWonContext();
  const { paid } = invoice;

  return (
    <div className={classes.root}>
      <div className={classes.label}>
        {paid ? <FormattedMessage id="shared.label.paid" /> : <FormattedMessage id="shared.label.totalAmountDue" />}
      </div>
      <div className={classes.content}>
        <strong>{formatCurrency(amount, 'USD', true)}</strong> <span className={classes.currency}>USD</span>
      </div>
    </div>
  );
}

export default AmountLabel;
