import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import InventoryPage from 'backend/js/views/InventoryPage';

function LotDetailsModal({ isModalOpen, onModalClose, inventoryId, customer, auction, assignBidAccess }) {
  return (
    <ModalWindow onClose={onModalClose} isOpen={isModalOpen} size="fullscreen">
      <ModalWindowHeader title={`Lot# ${inventoryId}`} onClose={onModalClose} />
      <ModalWindowBody className="p-20">
        <InventoryPage
          inventoryId={inventoryId}
          customer={customer}
          auction={auction}
          assignBidAccess={assignBidAccess}
        />
      </ModalWindowBody>
    </ModalWindow>
  );
}

LotDetailsModal.propTypes = {
  isModalOpen: PropTypes.bool,
  onModalClose: PropTypes.func,
  inventoryId: PropTypes.number.isRequired,
  customer: PropTypes.object.isRequired,
  auction: PropTypes.string.isRequired,
  assignBidAccess: PropTypes.bool,
};

LotDetailsModal.defaultProps = {
  isModalOpen: false,
  onModalClose: () => {},
  assignBidAccess: false,
};

export default LotDetailsModal;
