import React from 'react';
import PropTypes from 'prop-types';
import NumberService from 'frontend/js/lib/utils/NumberService';
import JoinAuctionButton from 'frontend/js/views/Shared/JoinAuctionButton';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function JoinAuction({ lot }) {
  const classes = useStyles();
  const { currentBid, currency } = lot;

  return (
    <div className={classes.root}>
      <strong className={classes.label}>
        {NumberService.formatCurrency(currentBid)} <span>{currency}</span>
      </strong>

      <JoinAuctionButton
        lot={lot}
        size="sm"
        color="green"
        label={<FormattedMessage id="joinAuctions" />}
        isCapitalize
      />
    </div>
  );
}

JoinAuction.propTypes = {
  lot: PropTypes.object.isRequired,
};

export default JoinAuction;
