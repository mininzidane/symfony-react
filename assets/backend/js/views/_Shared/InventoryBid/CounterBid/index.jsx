import React from 'react';
import KeepCurrentForm from './KeepCurrentForm';
import SellersMinForm from './SellersMinForm';
import CounterBidForm from './CounterBidForm';

function CounterBid() {
  return (
    <>
      <KeepCurrentForm />
      <SellersMinForm />
      <CounterBidForm />
    </>
  );
}

export default CounterBid;
