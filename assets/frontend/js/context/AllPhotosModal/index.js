import { useState } from 'react';
import { createContainer } from 'react-tracked';

const useValues = () => {
  const [currentLot, setCurrentLot] = useState();

  return [
    {
      currentLot,
      setCurrentLot,
    },
  ];
};

export const { Provider: AllPhotosModalProvider, useTracked: useAllPhotosModalContext } = createContainer(useValues);
