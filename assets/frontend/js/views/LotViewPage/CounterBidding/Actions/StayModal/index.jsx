import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import ConsignmentService from 'frontend/js/api/ConsignmentService';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ConsignmentDetails from '../_Shared/ConsignmentDetails';
import AlertNotification from '../_Shared/AlertNotification';
import useStyles from './useStyles';

function StayModal({ isOpen, onClose, consignment, updateConsignment, title }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [isStaySubmitting, setStaySubmitting] = useState(false);

  async function bidApprovalStay() {
    setStaySubmitting(true);
    try {
      const {
        data: response,
        errorCode,
        errorMessage,
      } = await ConsignmentService.bidApprovalStay(consignment.copartLot);

      if (errorCode || errorMessage) {
        enqueueSnackbar(`${errorCode} ${errorMessage}`, { variant: 'error' });
      } else {
        updateConsignment(response);
        enqueueSnackbar(
          intl.formatMessage(
            { id: 'consignment.stayModal.lotTheStayRequestHasBeenPlaced' },
            { lot: response.copartLot },
          ),
          { variant: 'success' },
        );
        onClose();
      }
    } catch (error) {
      const message = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
      enqueueSnackbar(message, { variant: 'error' });
    }
    setStaySubmitting(false);
  }

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={394}>
      <ModalWindowHeader title={title || intl.formatMessage({ id: 'consignment.stayModal.title' })} onClose={onClose} />
      <ModalWindowBody className={classes.body}>
        <ConsignmentDetails consignment={consignment} />
        <AlertNotification>
          <strong>{intl.formatMessage({ id: 'consignment.stayModal.pleaseVerifyStay' })}</strong>
        </AlertNotification>
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
              label={intl.formatMessage({ id: 'shared.cta.stay' })}
              onClick={bidApprovalStay}
              isLoading={isStaySubmitting}
            />
          </div>
        </div>
      </ModalWindowBody>
    </ModalWindow>
  );
}

StayModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  consignment: PropTypes.object,
  updateConsignment: PropTypes.func,
  title: PropTypes.node,
};

StayModal.defaultProps = {
  isOpen: false,
  consignment: null,
  updateConsignment: () => {},
  title: null,
};

export default StayModal;
