/* eslint-disable react/prop-types */
import React from 'react';
import ButtonLink from 'backend/js/components/ButtonLink';
import LotService from 'backend/js/api/LotService';
import LocationModal from 'backend/js/views/_Shared/Modals/LocationModal';
import useModal from 'backend/js/hooks/useModal';

function CopartLocation({ location }) {
  if (!location) {
    return null;
  }

  const { isModalOpen, toggleModal } = useModal();

  return (
    <>
      <div>Copart</div>
      <ButtonLink label={location.name} onClick={() => toggleModal(true)} className="ta-l" />
      <LocationModal
        sourceId={location.id}
        auction={LotService.AUCTION_COPART}
        isModalOpen={isModalOpen}
        onModalClose={() => toggleModal(false)}
      />
      <div>{location.phone}</div>
    </>
  );
}

export default CopartLocation;
