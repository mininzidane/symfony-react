import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import BaseApiService from 'backend/js/api/BaseApiService';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import Button from 'backend/js/components/Button';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ConsignmentDetails from '../../_Shared/ConsignmentDetails';

function StayModal({ isOpen, onClose, consignment, updateConsignment }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isStaySubmitting, setStaySubmitting] = useState(false);

  async function bidApprovalStay() {
    setStaySubmitting(true);
    try {
      const { data: response, errorCode, errorMessage } = await ConsignmentService.bidApprovalStay(consignment.id);

      if (errorCode || errorMessage) {
        enqueueSnackbar(`${errorCode} ${errorMessage}`, { variant: 'error' });
      } else {
        updateConsignment(response);
        enqueueSnackbar(`Lot # ${response.copartLot} the Stay request has been placed.`, { variant: 'success' });
        onClose();
      }
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message || 'An error occurred on submit', { variant: 'error' });
    }
    setStaySubmitting(false);
  }

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} size="lg">
      <ModalWindowHeader title="Stay" onClose={onClose} />
      <ModalWindowBody className="p-20">
        <ConsignmentDetails consignment={consignment} />
        <div className="m-t">
          <strong>Please verify if you would like to keep your minimum bid on this lot.</strong>
        </div>
        <div className="ta-r">
          <Button className="m-t btn-default mr-10" label="Cancel" onClick={onClose} />
          <Button className="m-t btn-warning" label="Stay" onClick={bidApprovalStay} isLoading={isStaySubmitting} />
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
};

StayModal.defaultProps = {
  isOpen: false,
  consignment: null,
  updateConsignment: () => {},
};

export default StayModal;
