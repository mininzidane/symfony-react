import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ResultsTable from './ResultsTable';

function CopartNotesModal({ id, lotId, ymm, status, isModalOpen, onModalClose }) {
  const [notes, setNotes] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [sortValue, setSortValue] = useState({ sort: 'date', order: 'desc' });

  async function loadCopartNotes() {
    try {
      const { notes: responseNotes } = await ConsignmentService.getCopartNotes(id);
      setNotes(responseNotes);
    } catch (e) {
      setNotFound(true);
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      loadCopartNotes();
    } else {
      setNotes(null);
      setNotFound(false);
    }
  }, [isModalOpen]);

  function handleSort(updatedSort, updatedOrder) {
    setSortValue({ sort: updatedSort, order: updatedOrder });
    const sortedNotes = notes.sort((noteA, noteB) => {
      let comparison = 0;
      if (updatedSort === 'date') {
        comparison = new Date(noteA.date.date) - new Date(noteB.date.date);
      }
      if (updatedSort === 'text') {
        comparison = String(noteA.text).localeCompare(String(noteB.text));
      }
      return updatedOrder === 'asc' ? comparison : -comparison;
    });
    setNotes(sortedNotes);
  }

  return (
    <ModalWindow onClose={onModalClose} isOpen={isModalOpen} size="lg">
      <ModalWindowHeader title={`Lot# ${lotId} - Notes`} onClose={onModalClose} />
      <ModalWindowBody className="p-20">
        <div>
          Lot#:{' '}
          <strong>
            {lotId} - {ymm}
          </strong>
        </div>
        <div className="mb-15">
          Status: <strong>{status}</strong>
        </div>

        {notes && <ResultsTable results={notes} sort={sortValue.sort} order={sortValue.order} onSort={handleSort} />}
        {notFound && <>Lot Notes Not Found</>}
      </ModalWindowBody>
    </ModalWindow>
  );
}

CopartNotesModal.propTypes = {
  id: PropTypes.number.isRequired,
  lotId: PropTypes.number.isRequired,
  ymm: PropTypes.string,
  status: PropTypes.string,
  isModalOpen: PropTypes.bool,
  onModalClose: PropTypes.func,
};

CopartNotesModal.defaultProps = {
  isModalOpen: false,
  onModalClose: () => null,
  ymm: '',
  status: '',
};

export default CopartNotesModal;
