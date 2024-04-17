import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useSnackbar } from 'notistack';
import NumberService from 'backend/js/lib/utils/NumberService';
import BidStatusTag from 'backend/js/views/_Shared/Tags/BidStatusTag';
import useCounterBidContext from 'backend/js/views/Bid/CounterBid/_Context/useCounterBidContext';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import KeepCurrentForm from './KeepCurrentForm';
import SellersMinForm from './SellersMinForm';
import CounterBidForm from './CounterBidForm';
import ConfirmCounterBid from './ConfirmCounterBid';

function BidInformation({ bid }) {
  const currency = get(bid, 'lot.currency', 'USD');
  const lotDescription = get(bid, 'lot.description', '');
  const { triggerFullRefresh, enableRefresh, disableRefresh } = useCounterBidContext();
  const [confirmPayload, setConfirmPayload] = useState();
  const { enqueueSnackbar } = useSnackbar();

  function handleSubmitConfirm(payload = {}) {
    setConfirmPayload(payload);
    disableRefresh();
  }

  function handleConfirmCancel() {
    setConfirmPayload(null);
    enableRefresh();
  }

  function handleSubmitSuccess(successMessage = '') {
    if (successMessage) {
      enqueueSnackbar(successMessage, { variant: 'success' });
    }

    triggerFullRefresh();
    handleConfirmCancel();
  }

  function handleSubmitError(errorMessage) {
    enqueueSnackbar(errorMessage, { variant: 'error' });
    handleConfirmCancel();
  }

  return (
    <>
      <div>
        Status: <br />
        <BidStatusTag status={bid.status} className="wide" />
      </div>

      <KeepCurrentForm bid={bid} onSubmit={handleSubmitConfirm} />

      <div className="mt-10">
        Max Bid:{' '}
        <b>
          {NumberService.formatCurrency(bid.maxBid, currency)} {currency}
        </b>
      </div>

      <SellersMinForm bid={bid} onSubmit={handleSubmitConfirm} />

      <CounterBidForm bid={bid} onSubmit={handleSubmitConfirm} />

      <ModalWindow onClose={handleConfirmCancel} isOpen={Boolean(confirmPayload)} size="lg">
        <ModalWindowHeader title={lotDescription} onClose={handleConfirmCancel} />
        <ModalWindowBody className="p-20">
          <ConfirmCounterBid
            bid={bid}
            payload={confirmPayload}
            onSubmitCancel={handleConfirmCancel}
            onSubmitSuccess={handleSubmitSuccess}
            onSubmitError={handleSubmitError}
          />
        </ModalWindowBody>
      </ModalWindow>
    </>
  );
}

BidInformation.propTypes = {
  bid: PropTypes.object.isRequired,
};

export default BidInformation;
