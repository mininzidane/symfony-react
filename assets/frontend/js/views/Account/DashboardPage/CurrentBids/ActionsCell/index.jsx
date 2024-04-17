/* eslint-disable react/prop-types */
import React from 'react';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import RouterService from 'frontend/js/api/RouterService';
import BidNow from './BidNow';
import JoinAuction from './JoinAuction';
import SoldViewDetailsButton from './SoldViewDetailsButton';

const ActionsCellStyles = { align: 'right', style: { padding: '12px 14px 12px 8px' } };

function ActionsCell({ lot }) {
  const { getRoute } = RouterService;
  const { currentBid, currency, currencyFeeFormat, slug, id, currentCustomerBid, sold, buyItNow, searchHash } = lot;
  const { getStateByLot, OWNERSHIP_DOCS_BLOCKED, FORM_STATE, NO_BID_BLOCKED, LIVE } = LotStatusStates;
  const lotState = getStateByLot(lot);
  const href = getRoute(
    'lot',
    {
      searchHash,
    },
    false,
    { id, slug },
  );
  const isPrelim = [OWNERSHIP_DOCS_BLOCKED, FORM_STATE, NO_BID_BLOCKED].includes(lotState);
  const isLive = lotState === LIVE;

  if (sold) {
    return <SoldViewDetailsButton href={href} />;
  }

  if (isLive) {
    return <JoinAuction lot={lot} />;
  }

  if (isPrelim) {
    return (
      <BidNow
        buyItNow={buyItNow}
        currentBid={currentBid}
        currency={currency}
        currencyFeeFormat={currencyFeeFormat}
        href={href}
        isIncrease={Boolean(currentCustomerBid)}
      />
    );
  }

  return null;
}

export { ActionsCell, ActionsCellStyles };
