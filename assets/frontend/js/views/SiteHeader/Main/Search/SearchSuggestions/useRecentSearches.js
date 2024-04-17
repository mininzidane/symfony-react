import { useState, useEffect, useCallback } from 'react';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';

function useRecentSearches({ marketKey, listSize }) {
  const MAX_LENGTH = 50;
  const LOCAL_STORAGE_KEY_BASE = 'Abm::RecentSearches';
  const localStorageKey = marketKey ? `${LOCAL_STORAGE_KEY_BASE}_${marketKey}` : LOCAL_STORAGE_KEY_BASE;
  const [recentSearches, setRecentSearches] = useState([]);

  function updateRecentSearches(arr) {
    const nextRecentSearches = arr.slice(0, MAX_LENGTH);

    setRecentSearches(nextRecentSearches);
    LocalStorageService.set(localStorageKey, nextRecentSearches);
  }

  const addSearch = useCallback(
    (queryString) => {
      const query = queryString.trim().toLowerCase();

      if (!query) {
        return;
      }

      updateRecentSearches([query, ...recentSearches.filter((q) => q !== query)]);
    },
    [recentSearches],
  );

  const deleteSearch = useCallback(
    (query) => {
      updateRecentSearches(recentSearches.filter((q) => q !== query));
    },
    [recentSearches],
  );

  useEffect(() => {
    setRecentSearches(LocalStorageService.get(localStorageKey) || []);
  }, [marketKey]);

  return {
    recentSearches: recentSearches.slice(0, listSize),
    addSearch,
    deleteSearch,
  };
}

export default useRecentSearches;
