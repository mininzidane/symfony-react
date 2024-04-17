/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useStyles from './useStyles';

function PaidOnlabel({ date }) {
  const classes = useStyles();
  const { formatFromISOString } = DateTimeService;

  return (
    <div className={classes.root}>
      <FormattedMessage id="depositsPage.transactions.purchases.paidOn" values={{ date: formatFromISOString(date) }} />
    </div>
  );
}

export default PaidOnlabel;
