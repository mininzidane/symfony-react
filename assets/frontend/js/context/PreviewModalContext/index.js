import { useState } from 'react';
import { createContainer } from 'react-tracked';

const useValues = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lots, setPreviewModalLots] = useState([]);
  const [currentLotId, setCurrentLotId] = useState();

  const index = lots.findIndex((v) => v.id === currentLotId);
  const isFirstLot = index === 0;
  const isLastLot = index === lots.length - 1;

  function setNextLot() {
    if (!isLastLot) {
      setCurrentLotId(lots[index + 1].id);
    }
  }

  function setPrevLot() {
    if (!isFirstLot) {
      setCurrentLotId(lots[index - 1].id);
    }
  }

  const currentLot = lots.find((v) => v.id === currentLotId);

  return [
    {
      currentLot,
      isFirstLot,
      isLastLot,
      setNextLot,
      setPrevLot,
      setPreviewModalLots,
      setCurrentLotId,
      isModalOpen,
      setIsModalOpen,
    },
  ];
};

export const { Provider: PreviewModalProvider, useTracked: usePreviewModalContext } = createContainer(useValues);
