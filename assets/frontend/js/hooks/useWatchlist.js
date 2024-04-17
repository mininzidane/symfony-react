import { useState, useEffect } from 'react';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function useWatchlist(lot) {
  const { isAuthenticated } = useCustomerHelper();
  const [{ isIdWatched, toggleEntryState, watchlist }] = useWatchlistContext();
  const { id, sold } = lot;
  const [isActive, setIsActive] = useState(isIdWatched(id));
  const isTogglePossible = !(sold && !isActive);

  function handleWatchlistClick() {
    if (isAuthenticated) {
      toggleEntryState(id);
    }
  }

  useEffect(() => {
    if (id) {
      setIsActive(isIdWatched(id));
    }
  }, [watchlist, lot]);

  return { isActive, isTogglePossible, handleWatchlistClick };
}

export default useWatchlist;
