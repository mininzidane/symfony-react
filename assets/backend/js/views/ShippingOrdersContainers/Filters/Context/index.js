import { useState } from 'react';
import { createContainer } from 'react-tracked';
import RouterService from 'frontend/js/api/RouterService';

const useValues = () => {
  const [filters, setFilters] = useState(RouterService.getCurrentQueryParams());

  return [
    {
      filters,
      setFilters,
    },
  ];
};

export const { Provider: FiltersProvider, useTracked: useFiltersContext } = createContainer(useValues);
