import { useCallback, useState } from 'react';
import { createContainer } from 'react-tracked';

function useValues() {
  const [watchlist, setWatchlist] = useState({});

  const addWatchlistEntries = useCallback((lots) => {
    const newEntries = {};

    lots.forEach((lot) => {
      if (typeof watchlist[lot.id] === 'undefined') {
        newEntries[lot.id] = lot.isWatched;
      }
    });

    setWatchlist((prev) => ({ ...prev, ...newEntries }));
  }, []);

  const toggleEntryState = useCallback((id) => {
    setWatchlist((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  function isIdWatched(id) {
    return watchlist[id] || false;
  }

  return [{ isIdWatched, toggleEntryState, addWatchlistEntries, watchlist }];
}

export const { Provider: WatchlistProvider, useTracked: useWatchlistContext } = createContainer(useValues);
