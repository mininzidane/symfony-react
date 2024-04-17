/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState, createContext } from 'react';
import RouterService from 'frontend/js/api/RouterService';

const FiltersContext = createContext();

function FiltersProvider({ children }) {
  const queryParams = RouterService.getCurrentQueryParams();
  const ALL_FILTER_VALUE = 'all';

  const [filters, setFilters] = useState({
    dateFilter: queryParams.dateFilter ?? ALL_FILTER_VALUE,
    bidderCustomerId: queryParams.bidderCustomerId ?? ALL_FILTER_VALUE,
    lotOrVin: queryParams.lotOrVin ?? '',
    lotFilters: queryParams.lotFilters ?? '',
  });

  return <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>;
}

export { FiltersProvider };

export default FiltersContext;
