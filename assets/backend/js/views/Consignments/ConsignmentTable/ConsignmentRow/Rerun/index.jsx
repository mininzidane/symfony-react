/* eslint-disable react/prop-types */
import React from 'react';
import useModal from 'backend/js/hooks/useModal';
import ButtonLink from 'backend/js/components/ButtonLink';
import BidHistoryModal from '../_Shared/BidHistoryModal';

function Rerun({ consignment }) {
  if (!consignment) {
    return null;
  }

  const { isModalOpen, toggleModal } = useModal();
  const { rerun } = consignment;

  return (
    <>
      {rerun > 0 ? (
        <>
          <ButtonLink label={rerun} onClick={() => toggleModal(true)} />
          <BidHistoryModal isOpen={isModalOpen} onClose={() => toggleModal(false)} consignment={consignment} />
        </>
      ) : (
        0
      )}
    </>
  );
}

export default Rerun;
