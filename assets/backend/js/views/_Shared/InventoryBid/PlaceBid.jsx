import React from 'react';
import classnames from 'classnames';
import useBidContext from './_Context/useBidContext';
import PreliminaryBid from './PreliminaryBid';
import { STATE_COUNTERBIDDING, STATE_LIVE_BIDDING, STATE_PRELIMINARY } from './_Context/BidStates';
import CounterBid from './CounterBid';
import ShippingPreorder from './ShippingPreorder';

function PlaceBid() {
  const { inventoryItem, loading, bidState, submitMessage, submitSuccess, allowShippingPreorder } = useBidContext();

  const { sold } = inventoryItem;
  if (sold) {
    return <h5 className="text-center">Bidding Closed</h5>;
  }

  if (loading) {
    return <h5 className="text-center">Loading</h5>;
  }

  return (
    <>
      {submitMessage && (
        <div
          className={classnames('alert', {
            'alert-danger': submitSuccess === false,
            'alert-success': submitSuccess === true,
          })}
        >
          <>
            {submitSuccess === false && (
              <>
                <i className="fa fa-ban" />
                &nbsp;
              </>
            )}
            {submitMessage}
          </>
        </div>
      )}

      {(bidState === STATE_PRELIMINARY || bidState === STATE_LIVE_BIDDING) && <PreliminaryBid />}

      {bidState === STATE_COUNTERBIDDING && <CounterBid />}

      {allowShippingPreorder && (
        <div className="mt-10">
          <ShippingPreorder />
        </div>
      )}
    </>
  );
}

export default PlaceBid;
