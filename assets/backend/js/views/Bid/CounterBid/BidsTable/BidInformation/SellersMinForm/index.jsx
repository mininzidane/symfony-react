import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import NumberService from 'backend/js/lib/utils/NumberService';
import Button from 'backend/js/components/Button';
import { TYPE_ACCEPT_MIN } from '../types';
import useStyles from './useStyles';

function SellersMinForm({ bid, onSubmit }) {
  const classes = useStyles();
  const { sellerMinimum } = bid;
  const currency = get(bid, 'lot.currency', 'USD');

  function handleAcceptMin() {
    const payload = {
      type: TYPE_ACCEPT_MIN,
      amount: sellerMinimum,
    };

    onSubmit(payload);
  }

  return (
    <div className="d-f jc-sb mt-15">
      <span className="mr-10">
        Sellers Minimum:
        <br />
        <b>
          {sellerMinimum ? (
            <>
              {NumberService.formatCurrency(sellerMinimum, currency)} {currency}
            </>
          ) : (
            '-'
          )}
        </b>
      </span>
      <div className={classes.right}>
        {sellerMinimum && <Button label="Accept" className="btn-primary wide" onClick={handleAcceptMin} />}
      </div>
    </div>
  );
}

SellersMinForm.propTypes = {
  bid: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

SellersMinForm.defaultProps = {
  onSubmit: () => null,
};

export default SellersMinForm;
