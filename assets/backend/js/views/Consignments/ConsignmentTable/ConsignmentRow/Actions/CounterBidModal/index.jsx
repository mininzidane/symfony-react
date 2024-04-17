import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import useModal from 'backend/js/hooks/useModal';
import Button from 'backend/js/components/Button';
import ModalWindow from 'backend/js/components/ModalWindow';
import BaseApiService from 'backend/js/api/BaseApiService';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import NumberService from 'backend/js/lib/utils/NumberService';
import Input from 'backend/js/components/Form/Input';
import ConfirmModal from '../../_Shared/ConfirmModal';
import ConsignmentDetails from '../../_Shared/ConsignmentDetails';
import BidHistoryModal from '../../_Shared/BidHistoryModal';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function CounterBidModal({ isOpen, onClose, consignment, updateConsignment }) {
  const classes = useStyles();
  const { isModalOpen: isConfirmModalOpen, toggleModal: toggleConfirmModal } = useModal();
  const { isModalOpen: isBidHistoryModalOpen, toggleModal: toggleBidHistoryModal } = useModal();
  const [counterOffer, setCounterOffer] = useState(null);
  const [isCounterOfferSubmitting, setCounterOfferSubmitting] = useState(false);
  const [isStaySubmitting, setStaySubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      counterOffer: '',
    },
    onSubmit: (values) => {
      setCounterOffer(values.counterOffer);
      toggleConfirmModal(true);
    },
    validationSchema,
  });

  async function handleConfirm() {
    toggleConfirmModal(false);
    setCounterOfferSubmitting(true);
    try {
      const {
        data: response,
        errorCode,
        errorMessage,
      } = await ConsignmentService.bidApprovalCounterbid(consignment.id, {
        counterOffer: Number(counterOffer.replace(/[^0-9.]/g, '')),
      });

      if (errorCode || errorMessage) {
        enqueueSnackbar(`${errorCode} ${errorMessage}`, { variant: 'error' });
      } else {
        updateConsignment(response);
        enqueueSnackbar(`Lot # ${response.copartLot} Counter Bid has been placed.`, { variant: 'success' });
        formik.resetForm();
        setCounterOffer(null);
        onClose();
      }
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message || 'An error occurred on submit', { variant: 'error' });
    }
    setCounterOfferSubmitting(false);
  }

  async function bidApprovalStay() {
    setStaySubmitting(true);
    try {
      const { data: response, errorCode, errorMessage } = await ConsignmentService.bidApprovalStay(consignment.id);

      if (errorCode || errorMessage) {
        enqueueSnackbar(`${errorCode} ${errorMessage}`, { variant: 'error' });
      } else {
        updateConsignment(response);
        enqueueSnackbar(`Lot # ${response.copartLot} the Stay request has been placed.`, { variant: 'success' });
        toggleConfirmModal(false);
        onClose();
      }
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message || 'An error occurred on submit', { variant: 'error' });
    }
    setStaySubmitting(false);
  }

  return (
    <>
      <ModalWindow onClose={onClose} isOpen={isOpen} size="lg">
        <ModalWindowHeader title="Counter Bid" onClose={onClose} />
        <ModalWindowBody className="p-20">
          <ConsignmentDetails consignment={consignment} />
          <div className={classes.grid}>
            <div>
              <div className={classes.row}>
                <div>Location</div>
                <div>
                  <strong>{consignment.copartLocation?.name || ''}</strong>
                </div>
              </div>
              <div className={classes.row}>
                <div>Auction Date</div>
                <div>{consignment.auctionDate && DateTimeService.formatFromISOString(consignment.auctionDate)}</div>
              </div>
              <div className={classes.row}>
                <div>ProQuote</div>
                <div>{consignment.proQuote && NumberService.formatCurrency(consignment.proQuote)}</div>
              </div>
            </div>
            <div>
              <div className={classes.row}>
                <div>Buyer&apos;s Latest Offer</div>
                <div>
                  <strong>{NumberService.formatCurrency(consignment.currentBid || 0)}</strong>
                </div>
              </div>
              <div className={classes.row}>
                <div>Seller&apos;s Reserve</div>
                <div>{NumberService.formatCurrency(consignment.reserveAmount || 0)}</div>
              </div>
              <div className={classes.row}>
                <div>New Counter Offer</div>
                <div className={classes.field}>
                  <form onSubmit={formik.handleSubmit}>
                    <Input
                      id="counterOffer"
                      name="counterOffer"
                      value={formik.values.counterOffer}
                      error={formik.errors.counterOffer}
                      touched={formik.touched.counterOffer}
                      onBlur={formik.setFieldTouched}
                      onChange={formik.setFieldValue}
                      mask="currency"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="ta-r">
            <Button className="m-t btn-default mr-10" label="Cancel" onClick={onClose} />
            <Button className="m-t btn-success mr-10" label="Bid history" onClick={() => toggleBidHistoryModal(true)} />
            <Button
              className="m-t btn-warning mr-10"
              label="Stay"
              onClick={bidApprovalStay}
              isLoading={isStaySubmitting}
            />
            <Button
              className="m-t btn-info"
              label="Counter bid"
              onClick={formik.handleSubmit}
              isLoading={isCounterOfferSubmitting}
            />
          </div>
        </ModalWindowBody>
      </ModalWindow>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => toggleConfirmModal(false)}
        onConfirm={handleConfirm}
        consignment={consignment}
      >
        Are you sure you want to set the reserve at {counterOffer}?
      </ConfirmModal>
      <BidHistoryModal
        isOpen={isBidHistoryModalOpen}
        onClose={() => toggleBidHistoryModal(false)}
        consignment={consignment}
      />
    </>
  );
}

CounterBidModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  consignment: PropTypes.object,
  updateConsignment: PropTypes.func,
};

CounterBidModal.defaultProps = {
  isOpen: false,
  consignment: null,
  updateConsignment: () => {},
};

export default CounterBidModal;
