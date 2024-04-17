import { useState, useEffect } from 'react';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function useWatchlistCount() {
  const { watchlistCurrentCnt } = useCustomerHelper();
  const [watchlistCount, setWatchlistCount] = useState(watchlistCurrentCnt);

  const handleWatchlistCountUpdate = (e) => {
    let nextCount = e.detail.increase ? watchlistCount + 1 : watchlistCount - 1;
    if (nextCount < 0) {
      nextCount = 0;
    }

    if (window.customer) {
      window.customer.watchlistCurrentCnt = nextCount;
    }

    setWatchlistCount(nextCount);
  };

  useEffect(() => {
    window.addEventListener('updateWatchlistCount', handleWatchlistCountUpdate);

    return () => window.removeEventListener('updateWatchlistCount', handleWatchlistCountUpdate);
  }, [watchlistCount]);

  const handleWatchlistCountSet = (e) => {
    setWatchlistCount(e.detail.count);
  };

  useEffect(() => {
    window.addEventListener('setWatchlistCount', handleWatchlistCountSet);

    return () => window.removeEventListener('setWatchlistCount', handleWatchlistCountSet);
  }, [watchlistCount]);

  return watchlistCount;
}

export default useWatchlistCount;
