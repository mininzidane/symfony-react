import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ConsignmentService from 'frontend/js/api/ConsignmentService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import ConfirmModal from '../_Shared/ConfirmModal';
import ConsignmentDetails from '../_Shared/ConsignmentDetails';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function CounterBidModal({ isOpen, onClose, consignment, updateConsignment, title }) {
  const classes = useStyles();
  const intl = useIntl();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [counterOffer, setCounterOffer] = useState(null);
  const [isCounterOfferSubmitting, setCounterOfferSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      counterOffer: '',
    },
    onSubmit: (values) => {
      setCounterOffer(values.counterOffer);
      setConfirmModalOpen(true);
    },
    validationSchema,
  });

  async function handleConfirm() {
    setConfirmModalOpen(false);
    setCounterOfferSubmitting(true);
    try {
      const {
        data: response,
        errorCode,
        errorMessage,
      } = await ConsignmentService.bidApprovalCounterbid(consignment.copartLot, {
        counterOffer: Number(counterOffer.replace(/[^0-9.]/g, '')),
      });

      if (errorCode || errorMessage) {
        enqueueSnackbar(`${errorCode} ${errorMessage}`, { variant: 'error' });
      } else {
        updateConsignment(response);
        enqueueSnackbar(
          intl.formatMessage(
            { id: 'consignment.counterBidModal.lotCounterBidHasBeenPlaced' },
            { lot: response.copartLot },
          ),
          { variant: 'success' },
        );
        formik.resetForm();
        setCounterOffer(null);
        onClose();
      }
    } catch (error) {
      const message = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
      enqueueSnackbar(message, { variant: 'error' });
    }
    setCounterOfferSubmitting(false);
  }

  return (
    <>
      <ModalWindow onClose={onClose} isOpen={isOpen} size="lg">
        <ModalWindowHeader
          title={title || intl.formatMessage({ id: 'consignment.counterBidModal.title' })}
          onClose={onClose}
        />
        <ModalWindowBody className={classes.body}>
          <ConsignmentDetails consignment={consignment} />
          <div className={classes.grid}>
            <div>
              <div className={classes.row}>
                <div>{intl.formatMessage({ id: 'shared.label.location' })}</div>
                <div>
                  <strong>{consignment.copartLocation?.name || ''}</strong>
                </div>
              </div>
              <div className={classes.row}>
                <div>{intl.formatMessage({ id: 'shared.label.auctionDate' })}</div>
                <div>{consignment.auctionDate && DateTimeService.formatFromISOString(consignment.auctionDate)}</div>
              </div>
            </div>
            <div>
              <div className={classes.row}>
                <div>{intl.formatMessage({ id: 'consignment.label.buyersLatestOffer' })}</div>
                <div>
                  <strong>{NumberService.formatCurrency(consignment.currentBid || 0)}</strong>
                </div>
              </div>
              <div className={classes.row}>
                <div>{intl.formatMessage({ id: 'consignment.label.sellersReserve' })}</div>
                <div>{NumberService.formatCurrency(consignment.reserveAmount || 0)}</div>
              </div>
              <div className={classes.row}>
                <div>{intl.formatMessage({ id: 'consignment.label.newCounterOffer' })}</div>
                <div className={classes.field}>
                  <form onSubmit={formik.handleSubmit}>
                    <InputPlane
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

          <div className={classes.actions}>
            <div className={classes.btnWrap}>
              <ButtonOutlined
                label={intl.formatMessage({ id: 'shared.cta.cancel' })}
                onClick={onClose}
                isBackgroundWhite
                isThinBorder
              />
            </div>
            <div className={classes.btnWrap}>
              <Button
                label={intl.formatMessage({ id: 'shared.cta.counterBid' })}
                onClick={formik.handleSubmit}
                isLoading={isCounterOfferSubmitting}
              />
            </div>
          </div>
        </ModalWindowBody>
      </ModalWindow>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        consignment={consignment}
      >
        {intl.formatMessage({ id: 'consignment.counterBidModal.areYouSureYouWantToSetTheReserve' }, { counterOffer })}
      </ConfirmModal>
    </>
  );
}

CounterBidModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  consignment: PropTypes.object,
  updateConsignment: PropTypes.func,
  title: PropTypes.node,
};

CounterBidModal.defaultProps = {
  isOpen: false,
  consignment: null,
  updateConsignment: () => {},
  title: null,
};

export default CounterBidModal;
