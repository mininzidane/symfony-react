import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import BaseApiService from 'backend/js/api/BaseApiService';
import Button from 'backend/js/components/Button';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import NumberService from 'backend/js/lib/utils/NumberService';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ConsignmentDetails from '../../_Shared/ConsignmentDetails';

function ApproveModal({ isOpen, onClose, consignment, updateConsignment }) {
  const [isApproveSubmitting, setApproveSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function bidApprovalApprove() {
    setApproveSubmitting(true);
    try {
      const { data: response, errorCode, errorMessage } = await ConsignmentService.bidApprovalApprove(consignment.id);

      if (errorCode || errorMessage) {
        enqueueSnackbar(`${errorCode} ${errorMessage}`, { variant: 'error' });
      } else {
        updateConsignment(response);
        enqueueSnackbar(`Lot # ${response.copartLot} Bid Approved.`, { variant: 'success' });
        onClose();
      }
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message || 'An error occurred on submit', { variant: 'error' });
    }
    setApproveSubmitting(false);
  }

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} size="lg">
      <ModalWindowHeader title="Approve" onClose={onClose} />
      <ModalWindowBody className="p-20">
        <ConsignmentDetails consignment={consignment} />
        <div className="m-t">
          <strong>
            Please verify that you would like to approve this bid of{' '}
            {NumberService.formatCurrency(consignment.currentBid)}
          </strong>
        </div>
        <div className="ta-r">
          <Button className="m-t btn-default mr-10" label="Cancel" onClick={onClose} />
          <Button
            className="m-t btn-primary"
            label="Approve"
            onClick={bidApprovalApprove}
            isLoading={isApproveSubmitting}
          />
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
};

ApproveModal.defaultProps = {
  isOpen: false,
  consignment: null,
  updateConsignment: () => {},
};

export default ApproveModal;
