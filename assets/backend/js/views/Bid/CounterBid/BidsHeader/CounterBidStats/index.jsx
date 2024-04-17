import React from 'react';
import useCounterBidContext from 'backend/js/views/Bid/CounterBid/_Context/useCounterBidContext';

function CounterBidStats() {
  const { totalBids, soldTodayBids, touchedTodayBids } = useCounterBidContext();

  return (
    <>
      <div>Total Counterbid: {totalBids}</div>
      <div>
        Sold today: {soldTodayBids}/{totalBids}
      </div>
      <div>
        Touched: {touchedTodayBids}/{totalBids}
      </div>
    </>
  );
}

export default CounterBidStats;
