/* eslint-disable react/prop-types */
import React from 'react';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import RouterService from 'frontend/js/api/RouterService';
import BidNow from './BidNow';
import JoinAuction from './JoinAuction';
import SoldViewDetailsButton from './SoldViewDetailsButton';
import useStyles from './useStyles';

function Controls({ lot }) {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const { currentBid, currency, currencyFeeFormat, slug, id, currentCustomerBid, searchHash } = lot;
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

  return (
    <div className={classes.root}>
      {isPrelim && (
        <BidNow
          currentBid={currentBid}
          currency={currency}
          currencyFeeFormat={currencyFeeFormat}
          href={href}
          isIncrease={Boolean(currentCustomerBid)}
        />
      )}
      {isLive && <JoinAuction lot={lot} />}
      {lot.sold && <SoldViewDetailsButton href={href} />}
    </div>
  );
}

Controls.propTypes = {};

export default Controls;
