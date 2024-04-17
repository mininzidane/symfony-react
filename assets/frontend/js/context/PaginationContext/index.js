/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState, createContext } from 'react';
import RouterService from 'frontend/js/api/RouterService';
import useEventListener from 'frontend/js/hooks/useEventListener';

const PaginationContext = createContext();

function PaginationProvider({ children, itemsPerPage, itemsPerPageOptions }) {
  const { getQueryParam } = RouterService;

  function getInitialItemsPerPage() {
    const DEFAULT_ITEMS_PER_PAGE = 25;
    const firstOption = itemsPerPageOptions && itemsPerPageOptions[0];

    if (itemsPerPageOptions) {
      return getQueryParam('size') || firstOption;
    }

    return itemsPerPage || DEFAULT_ITEMS_PER_PAGE;
  }

  function getInitialPageNumber() {
    return getQueryParam('page') || 1;
  }

  const [itemsPerPageCount, setItemsPerPage] = useState(getInitialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(getInitialPageNumber);
  const [total, setTotal] = useState(0);
  const [maxPagesCount, setMaxPagesCount] = useState(Infinity);

  useEventListener('popstate', () => {
    setItemsPerPage(getInitialItemsPerPage());
    setCurrentPage(getInitialPageNumber());
  });

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        total,
        setTotal,
        maxPagesCount,
        setMaxPagesCount,
        itemsPerPage: itemsPerPageCount,
        setItemsPerPage,
        itemsPerPageOptions,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export { PaginationProvider };

export default PaginationContext;
