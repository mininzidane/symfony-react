import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import BidNow from './BidNow';
import SoldViewDetailsButton from './SoldViewDetailsButton';
import BuyItNow from './BuyItNow';
import JoinAuction from './JoinAuction';
import useStyles from './useStyles';

function Footer({ lot }) {
  const classes = useStyles();
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
    inventoryAuction,
  } = lot;
  const href = getRoute('lot', { searchHash }, false, { id, slug });
  const { getStateByLot, OWNERSHIP_DOCS_BLOCKED, FORM_STATE, NO_BID_BLOCKED, LIVE } = LotStatusStates;
  const lotState = getStateByLot(lot);
  const isPrelim = [OWNERSHIP_DOCS_BLOCKED, FORM_STATE, NO_BID_BLOCKED].includes(lotState);
  const isLive = lotState === LIVE;
  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;

  if (sold) {
    return <SoldViewDetailsButton href={href} />;
  }

  if (isLive) {
    return <JoinAuction lot={lot} />;
  }

  if (isPrelim) {
    return (
      <div className={classes.root}>
        {!isAbmInventory && (
          <BidNow
            currentBid={currentBid}
            currency={currency}
            currencyFeeFormat={currencyFeeFormat}
            href={href}
            isIncrease={Boolean(currentCustomerBid)}
          />
        )}
        {Boolean(buyItNow) && <BuyItNow href={href} currency={currency} buyItNow={buyItNow} />}
      </div>
    );
  }

  return null;
}

Footer.defaultProps = {
  searchHash: '',
};

Footer.propTypes = {
  lot: PropTypes.object.isRequired,
  searchHash: PropTypes.string,
};

export default Footer;
