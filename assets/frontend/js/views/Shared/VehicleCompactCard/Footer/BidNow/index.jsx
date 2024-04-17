/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BidNow({ lot, href }) {
  const classes = useStyles();
  const { currentBid } = lot;

  return (
    <a href={href} className={classes.root}>
      <FormattedMessage id="shared.label.currentBid" />:{' '}
      <strong className={classes.value}>{NumberService.formatCurrency(currentBid)}</strong>
    </a>
  );
}

export default BidNow;
