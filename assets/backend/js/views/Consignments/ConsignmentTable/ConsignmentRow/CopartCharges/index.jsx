/* eslint-disable react/prop-types */
import React from 'react';
import useModal from 'backend/js/hooks/useModal';
import ButtonLink from 'backend/js/components/ButtonLink';
import NumberService from 'backend/js/lib/utils/NumberService';
import CopartChargesModal from '../_Shared/CopartChargesModal';

function CopartCharges({ consignment }) {
  if (!consignment) {
    return null;
  }

  const { isModalOpen, toggleModal } = useModal();

  return (
    <>
      Copart Charges:
      <ButtonLink
        label={NumberService.formatCurrency(consignment.billingCopartCharges / 100, 'USD', true)}
        onClick={() => toggleModal(true)}
      />
      <CopartChargesModal isOpen={isModalOpen} onClose={() => toggleModal(false)} consignment={consignment} />
    </>
  );
}

export default CopartCharges;
