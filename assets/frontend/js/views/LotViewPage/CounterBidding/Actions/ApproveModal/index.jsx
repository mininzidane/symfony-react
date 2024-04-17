import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ConsignmentService from 'frontend/js/api/ConsignmentService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ModalWindow from 'frontend/js/components/ModalWindow';
import Amount from 'frontend/js/components/Amount';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ConsignmentDetails from '../_Shared/ConsignmentDetails';
import AlertNotification from '../_Shared/AlertNotification';
import useStyles from './useStyles';

function ApproveModal({ isOpen, onClose, consignment, updateConsignment, title }) {
  const classes = useStyles();
  const intl = useIntl();
  const [isApproveSubmitting, setApproveSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function bidApprovalApprove() {
    setApproveSubmitting(true);
    try {
      const {
        data: response,
        errorCode,
        errorMessage,
      } = await ConsignmentService.bidApprovalApprove(consignment.copartLot);

      if (errorCode || errorMessage) {
        enqueueSnackbar(`${errorCode} ${errorMessage}`, { variant: 'error' });
      } else {
        updateConsignment(response);
        enqueueSnackbar(
          intl.formatMessage({ id: 'consignment.approveModal.lotBidApproved' }, { lot: response.copartLot }),
          { variant: 'success' },
        );
        onClose();
      }
    } catch (error) {
      const message = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
      enqueueSnackbar(message, { variant: 'error' });
    }
    setApproveSubmitting(false);
  }

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={394}>
      <ModalWindowHeader
        title={title || intl.formatMessage({ id: 'consignment.approveModal.title' })}
        onClose={onClose}
      />
      <ModalWindowBody className={classes.body}>
        <ConsignmentDetails consignment={consignment} />
        <AlertNotification>
          <strong>
            <FormattedMessage
              id="consignment.approveModal.alertNotification"
              values={{ amount: <Amount value={consignment.currentBid} hasCurrency /> }}
            />
          </strong>
        </AlertNotification>
        <div className={classes.actions}>
          <div className={classes.btnWrap}>
            <ButtonOutlined
              label={<FormattedMessage id="shared.cta.cancel" />}
              onClick={onClose}
              isBackgroundWhite
              isThinBorder
            />
          </div>
          <div className={classes.btnWrap}>
            <Button
              label={<FormattedMessage id="shared.cta.approve" />}
              color="green"
              onClick={bidApprovalApprove}
              isLoading={isApproveSubmitting}
            />
          </div>
        </div>
      </ModalWindowBody>
    </ModalWindow>
  );
}

ApproveModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  consignment: PropTypes.object,
  updateConsignment: PropTypes.func,
  title: PropTypes.node,
};

ApproveModal.defaultProps = {
  isOpen: false,
  consignment: null,
  updateConsignment: () => {},
  title: null,
};

export default ApproveModal;
