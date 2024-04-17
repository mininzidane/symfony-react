import React from 'react';
import CounterBidStats from 'backend/js/views/Bid/CounterBid/BidsHeader/CounterBidStats';
import FilterBar from 'backend/js/views/Bid/CounterBid/BidsHeader/FilterBar';
import useCounterBidContext from 'backend/js/views/Bid/CounterBid/_Context/useCounterBidContext';
import useStyles from './useStyles';

function BidsHeader() {
  const { initialized } = useCounterBidContext();
  const classes = useStyles();

  if (!initialized) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.stats}>
        <CounterBidStats />
      </div>

      <FilterBar />
    </div>
  );
}

export default BidsHeader;
