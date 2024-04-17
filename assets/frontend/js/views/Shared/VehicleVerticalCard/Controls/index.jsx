/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';
import BidNow from './BidNow';
import JoinAuction from './JoinAuction';
import SoldViewDetailsButton from './SoldViewDetailsButton';
import useStyles from './useStyles';

function Controls({
  lot,
  onJoinLiveAuctionButtonClick,
  onBidNowButtonClick,
  onSoldButtonClick,
  onBuyItNowButtonClick,
}) {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const { currentBid, currency, currencyFeeFormat, slug, id, currentCustomerBid, searchHash, inventoryAuction } = lot;
  const { getStateByLot, OWNERSHIP_DOCS_BLOCKED, FORM_STATE, NO_BID_BLOCKED, LIVE } = LotStatusStates;
  const lotState = getStateByLot(lot);
  const href = getRoute('lot', { searchHash }, false, { id, slug });
  const isPrelim = [OWNERSHIP_DOCS_BLOCKED, FORM_STATE, NO_BID_BLOCKED].includes(lotState);
  const isLive = lotState === LIVE;
  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;

  if (!lot.sold && isPrelim && isAbmInventory) {
    return (
      <div className={classes.root}>
        <Button
          onBuyItNowButtonClick={onBuyItNowButtonClick}
          href={RouterService.getRoute('lot', { searchHash }, false, { id, slug })}
          label={<FormattedMessage id="shared.cta.buyItNow" />}
          color="green"
        />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {lot.sold && <SoldViewDetailsButton href={href} onSoldButtonClick={onSoldButtonClick} />}
      {!lot.sold && isPrelim && (
        <BidNow
          onBidNowButtonClick={onBidNowButtonClick}
          currentBid={currentBid}
          currency={currency}
          currencyFeeFormat={currencyFeeFormat}
          href={href}
          maxBid={currentCustomerBid?.maxBid}
          isIncrease={Boolean(currentCustomerBid)}
        />
      )}
      {isLive && <JoinAuction onJoinLiveAuctionButtonClick={onJoinLiveAuctionButtonClick} lot={lot} />}
    </div>
  );
}

Controls.propTypes = {};

export default Controls;
