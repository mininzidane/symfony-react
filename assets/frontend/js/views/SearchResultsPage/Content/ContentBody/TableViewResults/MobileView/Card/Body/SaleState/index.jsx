/* eslint-disable react/prop-types */
import React from 'react';
import BidService from 'frontend/js/api/BidService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import SaleDateTimer from './SaleDateTimer';
import useStyles from './useStyles';

function SaleState({ lot }) {
  const classes = useStyles();

  const { saleDateTimeLeft, sold, saleStartAt, saleDate, bidStatus } = lot;
  const { LIVE, getStateByLot } = LotStatusStates;

  const lotState = getStateByLot(lot);

  const isLive = lotState === LIVE;

  if (BidService.COUNTER_BID_STATUSES.includes(bidStatus)) {
    return null;
  }

  if (sold) {
    return <FormattedMessage id="bid.status.lot_sold" className={classes.soldLabel} />;
  }

  if (isLive) {
    return <FormattedMessage id="locationDetailsPage.auctions.tabs.live" className={classes.liveLabel} />;
  }

  if (saleDateTimeLeft) {
    return <SaleDateTimer date={saleDateTimeLeft} className={classes.root} />;
  }

  if (saleStartAt || !saleDate) {
    return <SaleDate lot={lot} className={classes.root} />;
  }

  return null;
}

export default SaleState;
