import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import NumberService from 'backend/js/lib/utils/NumberService';
import { useSnackbar } from 'notistack';
import KeepCurrentForm from 'backend/js/views/_Shared/Actions/CounterBidAction/KeepCurrentForm';
import CounterBidForm from 'backend/js/views/_Shared/Actions/CounterBidAction/CounterBidForm';
import BidStatusTag from 'backend/js/views/_Shared/Tags/BidStatusTag';
import SellersMinForm from 'backend/js/views/_Shared/Actions/CounterBidAction/SellersMinForm';
import { ShippingProvider } from 'backend/js/context/ShippingContext';
import ShippingLocationForm from 'backend/js/views/_Shared/Forms/ShippingLocationForm';
import ButtonLink from 'backend/js/components/ButtonLink';
import ConfirmCounterBid from 'backend/js/views/_Shared/Actions/CounterBidAction/ConfirmCounterBid';
import useStyles from './useStyles';

const MODAL_STATE_BIDDING = 'bidding';
const MODAL_STATE_BID_CONFIRM = 'bid-confirm';
const MODAL_STATE_SHIPPING = 'shipping';

function CounterBidAction({ label, bid, className, onModalOpen, onModalClose, onSubmitSuccess }) {
  const { lot, customer } = bid;
  const [modalState, setModalState] = useState(MODAL_STATE_BIDDING);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidIncrement, setBidIncrement] = useState(undefined);
  const [confirmPayload, setConfirmPayload] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles({ modalState });

  const incrementUpdate = useCallback(
    debounce((incrementValue) => {
      setBidIncrement(incrementValue);
    }, 500),
    [],
  );

  function handleOnClick() {
    setIsModalOpen(true);
    onModalOpen();
  }

  function handleOnModalClose() {
    setIsModalOpen(false);
    setModalState(MODAL_STATE_BIDDING);
    onModalClose();
  }

  function getHeaderTitle() {
    if (modalState === MODAL_STATE_SHIPPING) {
      return 'Shipping Address';
    }

    if (lot) {
      return lot.description;
    }

    return '';
  }

  function updateShippingLocation() {
    setModalState(MODAL_STATE_SHIPPING);
  }

  function handleShippingLocationUpdate() {
    setModalState(MODAL_STATE_BIDDING);
  }

  function handleSubmitConfirm(payload = {}) {
    setConfirmPayload(payload);
    setModalState(MODAL_STATE_BID_CONFIRM);
  }

  function handleSubmitSuccess(successMessage = '') {
    if (successMessage) {
      enqueueSnackbar(successMessage, { variant: 'success' });
    }

    handleOnModalClose();
    onSubmitSuccess();
  }

  function handleSubmitError(errorMessage) {
    handleOnModalClose();
    enqueueSnackbar(errorMessage, { variant: 'error' });
  }

  function handleConfirmCancel() {
    setConfirmPayload({});
    setModalState(MODAL_STATE_BIDDING);
  }

  return (
    <ShippingProvider customer={customer} lot={lot}>
      <ButtonLink label={label} title="Process counterbidding" className={className} onClick={handleOnClick} />

      <ModalWindow onClose={handleOnModalClose} isOpen={isModalOpen} size="lg">
        <ModalWindowHeader title={getHeaderTitle()} onClose={handleOnModalClose} />
        <ModalWindowBody className={classes.modalBody}>
          {modalState === MODAL_STATE_BIDDING && (
            <table className={classnames(classes.table, 'table table-bordered  bid-details')}>
              <tbody>
                <tr>
                  <td>
                    <b>BidStatus:</b>
                  </td>
                  <td className="ta-c">
                    <BidStatusTag status={bid.status} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Win Guarantee:</b>
                  </td>
                  <td className="ta-c">
                    {bid.maxBid && bid.winGuarantee && (
                      <>
                        {NumberService.formatCurrency(bid.maxBid, lot.currency)} {lot.currency}
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Final Bid at Virtual Sale:</b>
                  </td>
                  <td>
                    <KeepCurrentForm bid={bid} onSubmit={handleSubmitConfirm} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Seller&apos;s Minimum Bid:</b>
                  </td>
                  <td>
                    <SellersMinForm
                      bid={bid}
                      updateShippingAddress={updateShippingLocation}
                      onSubmit={handleSubmitConfirm}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Place Bid: </b>
                    {bidIncrement && <>({NumberService.formatCurrency(bidIncrement)} increment)</>}
                  </td>
                  <td>
                    <CounterBidForm bid={bid} onIncrementUpdate={incrementUpdate} onSubmit={handleSubmitConfirm} />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {modalState === MODAL_STATE_SHIPPING && (
            <ShippingLocationForm onLocationUpdate={handleShippingLocationUpdate} />
          )}

          {modalState === MODAL_STATE_BID_CONFIRM && (
            <ConfirmCounterBid
              bid={bid}
              payload={confirmPayload}
              onSubmitCancel={handleConfirmCancel}
              onSubmitSuccess={handleSubmitSuccess}
              onSubmitError={handleSubmitError}
            />
          )}
        </ModalWindowBody>
      </ModalWindow>
    </ShippingProvider>
  );
}

CounterBidAction.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]).isRequired,
  bid: PropTypes.object.isRequired,
  className: PropTypes.string,
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
};

CounterBidAction.defaultProps = {
  className: '',
  onModalOpen: () => {},
  onModalClose: () => {},
  onSubmitSuccess: () => {},
};

export default CounterBidAction;
