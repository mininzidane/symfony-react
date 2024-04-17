import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NumberService from 'backend/js/lib/utils/NumberService';
import Button from 'backend/js/components/Button';
import BidService from 'backend/js/api/BidService';
import useServerError from 'backend/js/hooks/useServerError';
import { TYPE_ACCEPT_MIN, TYPE_INCREASE_BID, TYPE_KEEP_CURRENT } from '../types';

function ConfirmCounterBid({ bid, payload, onSubmitSuccess, onSubmitError, onSubmitCancel }) {
  const { id } = bid;
  const { type, amount, preorder } = payload;
  const [submitting, setSubmitting] = useState(false);

  const formattedAmount = NumberService.formatCurrency(amount);
  const bidService = new BidService();
  const { errorMsg, extractAndSetErrorMsg, resetError } = useServerError();

  async function handleKeep() {
    await bidService.keepCurrentBid(id);
    onSubmitSuccess(`Congratulations, you have successfully kept your bid of ${formattedAmount}`);
  }

  async function handleAccept() {
    await bidService.acceptMinimumBid(id, payload);
    onSubmitSuccess(`Congratulations, you have successfully accepted  seller's minimum bid of ${formattedAmount}`);
  }

  async function handleIncrease() {
    await bidService.increaseCounterBid(id, payload);
    onSubmitSuccess(`Congratulations, you have successfully increased your bid to ${formattedAmount}`);
  }

  async function handleSubmit() {
    setSubmitting(true);
    resetError();
    try {
      switch (type) {
        case TYPE_KEEP_CURRENT:
          await handleKeep();
          break;
        case TYPE_INCREASE_BID:
          await handleIncrease();
          break;
        case TYPE_ACCEPT_MIN:
          await handleAccept();
          break;
        default:
          onSubmitError('Unsupported Type');
      }
    } catch (e) {
      extractAndSetErrorMsg(e);
      setSubmitting(false);
    }
  }

  return (
    <div>
      {errorMsg && (
        <div className="row m-b text-center">
          <div className="col-lg-12 text-danger">{errorMsg}</div>
        </div>
      )}

      <div className="row m-b text-center">
        <div className="col-lg-12 text-danger">
          <b>Important. This cannot be undone!</b>
        </div>
      </div>

      <div className="row m-b text-center">
        <div className="col-lg-12">
          {type === TYPE_INCREASE_BID && (
            <>
              Are you sure you want to increase your maximum bid to <b>{formattedAmount}</b>? By clicking on the Confirm
              button below, you are committing to buy this Lot if you are the winning bidder. All bids are final.
            </>
          )}
          {type === TYPE_KEEP_CURRENT && (
            <>
              Are you sure you want to keep your maximum bid of <b>{formattedAmount}</b>? By clicking on the Confirm
              button below, you are committing to buy this Lot if you are the winning bidder. All bids are final.
            </>
          )}
          {type === TYPE_ACCEPT_MIN && (
            <>
              Are you sure you want to accept seller&apos;s minimum bid of <b>{formattedAmount}</b>? By clicking on the
              Confirm button below, you are committing to buy this Lot if you are the winning bidder. All bids are
              final.
            </>
          )}
        </div>
      </div>

      {preorder && Boolean(preorder.quote) && (
        <div className="row m-b text-center">
          <div className="col-lg-12">
            A Preorder of {NumberService.formatCurrency(preorder.quote.quote.total)} will be placed.
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-xs-6 text-right">
          <Button className="btn-primary" label="Confirm" onClick={handleSubmit} disabled={submitting} />
        </div>
        <div className="col-xs-6">
          <Button className="btn-secondary" label="Cancel" onClick={onSubmitCancel} disabled={submitting} />
        </div>
      </div>
    </div>
  );
}

ConfirmCounterBid.propTypes = {
  bid: PropTypes.object.isRequired,
  payload: PropTypes.object,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  onSubmitCancel: PropTypes.func,
};

ConfirmCounterBid.defaultProps = {
  onSubmitSuccess: () => null,
  onSubmitError: () => null,
  onSubmitCancel: () => null,
  payload: {},
};

export default ConfirmCounterBid;
