import { useState } from 'react';

function useModal(initialModalState = false) {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  function toggleModal(isOpen) {
    setIsModalOpen(isOpen);
  }

  return {
    isModalOpen,
    toggleModal,
  };
}

export default useModal;
