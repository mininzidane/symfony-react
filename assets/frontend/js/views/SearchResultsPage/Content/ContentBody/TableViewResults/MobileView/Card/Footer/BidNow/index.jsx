import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BidNow({ currentBid, currencyFeeFormat, href }) {
  const classes = useStyles();

  return (
    <a href={href} className={classes.root}>
      <FormattedMessage id="shared.label.currentBid" />:{' '}
      <strong className={classes.value}>{NumberService.formatCurrency(currentBid, currencyFeeFormat)}</strong>
    </a>
  );
}

BidNow.propTypes = {
  currentBid: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
  currencyFeeFormat: PropTypes.string.isRequired,
};

export default BidNow;
