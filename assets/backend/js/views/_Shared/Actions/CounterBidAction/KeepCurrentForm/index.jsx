import React from 'react';
import PropTypes from 'prop-types';
import NumberService from 'backend/js/lib/utils/NumberService';
import BidService from 'backend/js/api/BidService';
import Button from 'backend/js/components/Button';
import { TYPE_KEEP_CURRENT } from 'backend/js/views/_Shared/Actions/CounterBidAction/types';

function KeepCurrentForm({ bid, onSubmit }) {
  const { lot } = bid;

  function handleKeepCurrentBid() {
    const payload = {
      type: TYPE_KEEP_CURRENT,
      amount: bid.currentBid,
    };

    onSubmit(payload);
  }

  return (
    <>
      <span>
        {NumberService.formatCurrency(bid.currentBid, lot.currency)} {lot.currency}&nbsp;
      </span>
      {bid.status === BidService.STATUS_SELLER_COUNTERED && (
        <Button label="Keep Current Bid" className="btn btn-primary" onClick={handleKeepCurrentBid} />
      )}
    </>
  );
}

KeepCurrentForm.propTypes = {
  bid: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

KeepCurrentForm.defaultProps = {
  onSubmit: () => null,
};

export default KeepCurrentForm;
