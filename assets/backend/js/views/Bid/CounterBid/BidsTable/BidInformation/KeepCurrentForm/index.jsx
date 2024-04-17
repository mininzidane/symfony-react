import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import NumberService from 'backend/js/lib/utils/NumberService';
import BidService from 'backend/js/api/BidService';
import Button from 'backend/js/components/Button';
import { TYPE_KEEP_CURRENT } from '../types';
import useStyles from './useStyles';

function KeepCurrentForm({ bid, onSubmit }) {
  const classes = useStyles();
  const currency = get(bid, 'lot.currency', 'USD');

  function handleKeepCurrentBid() {
    const payload = {
      type: TYPE_KEEP_CURRENT,
      amount: bid.currentBid,
    };

    onSubmit(payload);
  }

  return (
    <div className="d-f jc-sb mt-15">
      <div className="mr-10">
        Current Bid:
        <br />
        <b className={classes.currentBid}>
          {NumberService.formatCurrency(bid.currentBid, currency)} {currency}
        </b>
      </div>
      <div className={classes.right}>
        {bid.status === BidService.STATUS_SELLER_COUNTERED && (
          <Button label="Keep" className="btn-primary wide" onClick={handleKeepCurrentBid} />
        )}
      </div>
    </div>
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
