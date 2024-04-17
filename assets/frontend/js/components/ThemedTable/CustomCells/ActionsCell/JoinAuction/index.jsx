/* eslint-disable react/prop-types */
import React from 'react';
import NumberService from 'frontend/js/lib/utils/NumberService';
import JoinAuctionButton from 'frontend/js/views/Shared/JoinAuctionButton';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function JoinAuction({ lot, currentBid, currency, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <strong className={classes.label}>
        {NumberService.formatCurrency(currentBid)} <span>{currency}</span>
      </strong>

      <JoinAuctionButton
        lot={lot}
        onClick={onClick}
        size="sm"
        color="green"
        label={<FormattedMessage id="joinAuctions" />}
        isCapitalize
      />
    </div>
  );
}

export default JoinAuction;
