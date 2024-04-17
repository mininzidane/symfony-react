import { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import SavedSearchesService from 'frontend/js/api/SavedSearches';

function useSavedSearchesCount() {
  const { isAuthenticated } = useCustomerHelper();
  const { data: searchesCount } = useQuery(
    'saved-searches-count-data',
    () => SavedSearchesService.getSavedSearchesCount(),
    { enabled: isAuthenticated },
  );
  const [total, setTotal] = useState(undefined);

  const handleSavedSearchesCountUpdate = useCallback((e) => {
    setTotal((value) => {
      const currentTotal = value || 0;
      let nextCount = e.detail.increase ? currentTotal + 1 : currentTotal - 1;
      if (nextCount < 0) {
        nextCount = 0;
      }
      return nextCount;
    });
  }, []);

  useEffect(() => {
    setTotal(searchesCount?.total);
  }, [searchesCount]);

  useEffect(() => {
    window.addEventListener('updateSavedSearchesCount', handleSavedSearchesCountUpdate);

    return () => window.removeEventListener('updateSavedSearchesCount', handleSavedSearchesCountUpdate);
  }, []);

  return total;
}

export default useSavedSearchesCount;
