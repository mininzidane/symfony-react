import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import JoinAuctionButton from 'frontend/js/views/Shared/JoinAuctionButton';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import useStyles from './useStyles';

function JoinAuction({ lot, onJoinLiveAuctionButtonClick }) {
  const classes = useStyles();
  const { currentBid, currency } = lot;

  return (
    <div>
      <div className={classes.info}>
        <div className={classes.caption}>
          <FormattedMessage id="shared.label.currentBid" className={classes.caption} />:
        </div>
        <div className={classes.valueWrap}>
          <div className={classes.value}>{NumberService.formatCurrency(currentBid)}</div>&nbsp;
          <div className={classes.currency}>{currency}</div>
        </div>
      </div>

      <JoinAuctionButton
        lot={lot}
        className={classes.button}
        onClick={onJoinLiveAuctionButtonClick}
        size="md"
        color="green"
        label={<FormattedMessage id="joinAuctions" />}
      />
    </div>
  );
}

JoinAuction.propTypes = {
  lot: LotShape.isRequired,
  onJoinLiveAuctionButtonClick: PropTypes.func,
};

JoinAuction.defaultProps = {
  onJoinLiveAuctionButtonClick: () => {},
};

export default JoinAuction;
