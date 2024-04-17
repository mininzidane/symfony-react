/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import { BidStatusCell } from 'frontend/js/components/ThemedTable/CustomCells/BidStatusCell';
import useStyles from './useStyles';

function BidNow({ lot, href }) {
  const classes = useStyles();
  const { currentBid, bidStatus, currencyFeeFormat } = lot;

  return (
    <a href={href} className={classes.root}>
      <span>
        <FormattedMessage id="shared.label.currentBid" />:{' '}
        <strong className={classes.value}>{NumberService.formatCurrency(currentBid, currencyFeeFormat)}</strong>
      </span>
      <BidStatusCell bidStatus={bidStatus} />
    </a>
  );
}

BidNow.propTypes = {
  currentBid: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
};

export default BidNow;
