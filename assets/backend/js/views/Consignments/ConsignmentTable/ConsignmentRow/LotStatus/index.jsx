/* eslint-disable react/prop-types */
import React from 'react';
import ButtonLink from 'backend/js/components/ButtonLink';
import CopartNotesModal from 'backend/js/views/_Shared/Modals/CopartNotesModal';
import useModal from 'backend/js/hooks/useModal';

function LotStatus({ id, lotId, status, ymm }) {
  if (!lotId) {
    return null;
  }
  if (!id) {
    return null;
  }

  const { isModalOpen, toggleModal } = useModal();

  return (
    <>
      <ButtonLink label={status} onClick={() => toggleModal(true)} className="ta-l" />
      <CopartNotesModal
        id={id}
        lotId={lotId}
        status={status}
        ymm={ymm}
        isModalOpen={isModalOpen}
        onModalClose={() => toggleModal(false)}
      />
    </>
  );
}

export default LotStatus;
