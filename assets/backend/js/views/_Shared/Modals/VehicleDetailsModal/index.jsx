import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import React from 'react';
import PropTypes from 'prop-types';
import VehicleDetailsPage from './VehicleDetailsPage';

function VehicleDetailsModal({ isModalOpen, onModalClose, idOrVin }) {
  return (
    <ModalWindow onClose={onModalClose} isOpen={isModalOpen} size="fullscreen">
      <ModalWindowHeader title={`Inventory item ${idOrVin}`} onClose={onModalClose} />
      <ModalWindowBody className="p-20">{isModalOpen && <VehicleDetailsPage idOrVin={idOrVin} />}</ModalWindowBody>
    </ModalWindow>
  );
}

VehicleDetailsModal.propTypes = {
  isModalOpen: PropTypes.bool,
  onModalClose: PropTypes.func,
  idOrVin: PropTypes.string.isRequired,
};

VehicleDetailsModal.defaultProps = {
  isModalOpen: false,
  onModalClose: () => {},
};

export default VehicleDetailsModal;
