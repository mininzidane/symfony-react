/* eslint-disable react/prop-types */
import React from 'react';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import RouterService from 'frontend/js/api/RouterService';
import BuyItNow from './BuyItNow';
import BidNow from './BidNow';
import JoinAuction from './JoinAuction';
import SoldViewDetailsButton from './SoldViewDetailsButton';

const ActionsCellStyles = { align: 'right', style: { padding: '12px 14px 12px 8px' } };

function ActionsCell({
  lot,
  onBidNowClick,
  onBuyItNowClick,
  onJoinAuctionClick,
  onSoldViewDetailsClick,
  isAbmInventory,
}) {
  const { getRoute } = RouterService;
  const {
    currentBid,
    currency,
    currencyFeeFormat,
    slug,
    id,
    currentCustomerBid,
    sold,
    buyItNow,
    searchHash,
    bidStatus,
  } = lot;
  const { getStateByLot, OWNERSHIP_DOCS_BLOCKED, FORM_STATE, NO_BID_BLOCKED, LIVE } = LotStatusStates;
  const lotState = getStateByLot(lot);
  const href = getRoute('lot', { searchHash }, false, { id, slug });
  const isPrelim = [OWNERSHIP_DOCS_BLOCKED, FORM_STATE, NO_BID_BLOCKED].includes(lotState);
  const isLive = lotState === LIVE;

  if (sold) {
    return <SoldViewDetailsButton bidStatus={bidStatus} href={href} onClick={onSoldViewDetailsClick} />;
  }

  if (isLive) {
    return <JoinAuction lot={lot} currentBid={currentBid} currency={currency} onClick={onJoinAuctionClick} />;
  }

  if (isPrelim) {
    if (isAbmInventory) {
      return <BuyItNow href={href} price={buyItNow} onBidNowClick={onBidNowClick} />;
    }

    return (
      <BidNow
        buyItNow={buyItNow}
        currentBid={currentBid}
        currency={currency}
        currencyFeeFormat={currencyFeeFormat}
        href={href}
        onBidNowClick={onBidNowClick}
        onBuyItNowClick={onBuyItNowClick}
        isIncrease={Boolean(currentCustomerBid)}
      />
    );
  }

  return null;
}

export { ActionsCell, ActionsCellStyles };
