/* eslint-disable react/prop-types */
import React from 'react';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Row from '../Row';

function AllDetailsModal({ isOpen, onClose, details }) {
  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={960}>
      <ModalWindowHeader
        title={<FormattedMessage id="lotPage.vehicleConditionReport.modal.title" />}
        onClose={onClose}
      />
      <ModalWindowBody className="p-20">
        <div>
          {details.map(({ key, note, score }, index) => (
            <Row label={key} score={score} note={note} index={index} />
          ))}
        </div>
      </ModalWindowBody>
    </ModalWindow>
  );
}

export default AllDetailsModal;
