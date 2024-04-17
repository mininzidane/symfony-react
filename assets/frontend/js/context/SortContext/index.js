/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useCallback } from 'react';
import useEventListener from 'frontend/js/hooks/useEventListener';
import RouterService from 'frontend/js/api/RouterService';

const SortContext = createContext();

function SortProvider({ children, options }) {
  function getSortFromURL() {
    const fieldParam = RouterService.getQueryParam('sort');
    const orderParam = RouterService.getQueryParam('order');

    if (fieldParam && orderParam) {
      const sortOption = options.find((option) => option.field === fieldParam && option.order === orderParam);

      if (sortOption) {
        return sortOption;
      }
    }

    return options[0];
  }

  const [sort, setSort] = useState(() => getSortFromURL());

  const updateSort = useCallback((value) => {
    const { field, order } = value;
    RouterService.addQueryParams({ sort: field, order }, { pushToHistory: true });
    setSort(value);
  }, []);

  useEventListener('popstate', () => {
    setSort(getSortFromURL());
  });

  return (
    <SortContext.Provider value={{ sortOptions: options, sort, setSort: updateSort }}>{children}</SortContext.Provider>
  );
}

export { SortProvider };

export default SortContext;
