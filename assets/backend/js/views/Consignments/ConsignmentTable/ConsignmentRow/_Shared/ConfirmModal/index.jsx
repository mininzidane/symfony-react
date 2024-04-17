import React from 'react';
import PropTypes from 'prop-types';
import Button from 'backend/js/components/Button';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ConsignmentDetails from '../ConsignmentDetails';

function ConfirmModal({ isOpen, onClose, onConfirm, consignment, children }) {
  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} size="sm">
      <ModalWindowHeader title="Confirm" onClose={onClose} />
      <ModalWindowBody className="p-20">
        <ConsignmentDetails consignment={consignment} />
        <div className="m-t">{children}</div>
        <div className="ta-r">
          <Button className="m-t btn-default mr-10" label="Cancel" onClick={onClose} />
          <Button className="m-t btn-success" label="Confirm" onClick={onConfirm} />
        </div>
      </ModalWindowBody>
    </ModalWindow>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  consignment: PropTypes.object,
  children: PropTypes.node.isRequired,
};

ConfirmModal.defaultProps = {
  isOpen: false,
  consignment: null,
};

export default ConfirmModal;
