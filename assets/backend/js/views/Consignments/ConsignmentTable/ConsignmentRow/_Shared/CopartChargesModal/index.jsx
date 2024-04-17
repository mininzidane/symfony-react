import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ResultsTable from './ResultsTable';
import ConsignmentDetails from '../ConsignmentDetails';

function CopartChargesModal({ consignment, isOpen, onClose }) {
  const [copartCharges, setCopartCharges] = useState(null);
  const [notFound, setNotFound] = useState(false);

  async function loadCopartCharges() {
    try {
      const { data: response } = await ConsignmentService.copartCharges(consignment.id);
      setCopartCharges(response);
    } catch (e) {
      setNotFound(true);
    }
  }

  useEffect(() => {
    if (isOpen && !copartCharges && !notFound) {
      loadCopartCharges();
    }
  }, [isOpen]);

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} size="lg">
      <ModalWindowHeader title="Copart Charges" onClose={onClose} />
      <ModalWindowBody className="p-20">
        <ConsignmentDetails consignment={consignment} />
        {copartCharges && <ResultsTable results={copartCharges} />}
        {notFound && <div className="m-t">Information Not Found</div>}
      </ModalWindowBody>
    </ModalWindow>
  );
}

CopartChargesModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  consignment: PropTypes.object,
};

CopartChargesModal.defaultProps = {
  isOpen: false,
  onClose: () => null,
  consignment: null,
};

export default CopartChargesModal;
