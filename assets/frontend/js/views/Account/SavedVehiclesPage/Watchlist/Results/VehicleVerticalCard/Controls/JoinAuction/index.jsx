import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import JoinAuctionButton from 'frontend/js/views/Shared/JoinAuctionButton';
import useStyles from './useStyles';

function JoinAuction({ lot }) {
  const classes = useStyles();
  const { currentBid, currency } = lot;

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.caption}>
          <FormattedMessage id="shared.label.currentBid" /> ({currency})
        </div>
        <div className={classes.value}>{NumberService.formatCurrency(currentBid)}</div>
      </div>

      <JoinAuctionButton
        lot={lot}
        className={classes.button}
        size="md"
        color="green"
        label={<FormattedMessage id="joinAuctions" />}
      />
    </div>
  );
}

JoinAuction.propTypes = {
  lot: LotShape.isRequired,
};

export default JoinAuction;
