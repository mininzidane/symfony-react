import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from 'backend/js/components/Button';
import useBidDelta from 'backend/js/hooks/useBidDelta';
import NumberService from 'backend/js/lib/utils/NumberService';
import BidInformationInput from './BidInformationInput';
import FeesCalculator from './FeesCalculator';
import { TYPE_INCREASE_BID } from '../types';
import useStyles from './useStyles';

function CounterBidForm({ bid, onSubmit }) {
  const { currentBid, auction } = bid;
  const currency = get(bid, 'lot.currency', 'USD');
  const currentBidDelta = useBidDelta(currentBid, auction);
  const minValue = currentBid + currentBidDelta.increment;

  const [newBid, setNewBid] = useState(minValue);
  const bidDelta = useBidDelta(newBid, auction);
  const classes = useStyles();

  function handleIncreaseBid() {
    const payload = {
      type: TYPE_INCREASE_BID,
      amount: newBid,
    };

    onSubmit(payload);
  }

  function handleBidChange(value) {
    setNewBid(value);
  }

  return (
    <div className="mt-15">
      Place bid ({NumberService.formatCurrency(bidDelta.increment, currency)} increment):
      <div className="d-f jc-sb ">
        <div className={classes.input}>
          <BidInformationInput onChange={handleBidChange} value={newBid} delta={bidDelta} minValue={minValue} />
        </div>

        <div className={classes.right}>
          <Button className="btn-primary wide" label="Increase Bid" disabled={!newBid} onClick={handleIncreaseBid} />
        </div>
      </div>
      <FeesCalculator bid={bid} amount={newBid} />
    </div>
  );
}

CounterBidForm.propTypes = {
  bid: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

CounterBidForm.defaultProps = {
  onSubmit: () => null,
};

export default CounterBidForm;
