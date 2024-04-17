import { useState } from 'react';
import { createContainer } from 'react-tracked';

const useValues = () => {
  const [selectedContainerIds, setSelectedContainerIds] = useState([]);

  return [
    {
      selectedContainerIds,
      setSelectedContainerIds,
    },
  ];
};

export const { Provider: ContainerIdsProvider, useTracked: useContainerIdsContext } = createContainer(useValues);
