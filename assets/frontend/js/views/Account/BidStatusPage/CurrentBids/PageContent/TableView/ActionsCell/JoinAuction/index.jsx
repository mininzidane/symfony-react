/* eslint-disable react/prop-types */
import React from 'react';
import NumberService from 'frontend/js/lib/utils/NumberService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import JoinAuctionButton from 'frontend/js/views/Shared/JoinAuctionButton';
import useStyles from './useStyles';

function JoinAuction({ onJoinAuctionClick, lot }) {
  const classes = useStyles();
  const { currentBid, currency } = lot;

  return (
    <div className={classes.root}>
      <strong className={classes.label}>
        {NumberService.formatCurrency(currentBid)} <span>{currency}</span>
      </strong>

      <JoinAuctionButton
        lot={lot}
        onClick={onJoinAuctionClick}
        size="sm"
        color="green"
        label={<FormattedMessage id="joinAuctions" />}
        isCapitalize
      />
    </div>
  );
}

export default JoinAuction;
