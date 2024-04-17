/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import Amount from 'frontend/js/components/Amount';
import FormattedDate from '../_components/FormattedDate';
import useStyles from './useStyles';

function InvoicePaidCell({ invoice }) {
  const classes = useStyles();
  const { amountApplied, paidInFull } = invoice;

  return (
    <div className={classes.root}>
      <div>
        <Amount value={parseFloat(amountApplied, 10)} hasCurrency />
      </div>
      {paidInFull && <FormattedDate date={paidInFull} />}
    </div>
  );
}

export { InvoicePaidCell };
