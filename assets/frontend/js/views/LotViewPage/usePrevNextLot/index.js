import { useState, useEffect } from 'react';
import RouterService from 'frontend/js/api/RouterService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import useLots from './useLots';

function usePrevNextLot(lotId) {
  const searchHash = RouterService.getCurrentQueryParams()?.searchHash;
  const lastSearches = LocalStorageService.get('lastSearches') || [];
  const searchData = lastSearches.find((s) => s.searchHash === searchHash);
  const initialQuery = searchData?.query;
  const isPrevNextAvailable = searchHash && searchData && initialQuery?.page;
  const pageFromUrl = RouterService.getQueryParam('page');
  const initialPage = pageFromUrl || initialQuery?.page;
  const [page, setPage] = useState(initialPage);

  const { lots: currentLots } = useLots(initialQuery, {
    enabled: isPrevNextAvailable && initialPage !== page,
    initialData: searchData,
  });

  const currentIdx = currentLots.findIndex((l) => l.id === lotId);
  const firstPage = page === 1;
  const { lots: prevLots } = useLots({ ...initialQuery, page: page - 1 }, { enabled: currentIdx === 0 && !firstPage });
  const { lots: nextLots } = useLots(
    { ...initialQuery, page: page + 1 },
    { enabled: currentIdx === currentLots.length - 1 },
  );

  useEffect(() => {
    if (currentIdx === -1) {
      if (prevLots.findIndex((l) => l.id === lotId) !== -1) {
        setPage((old) => {
          RouterService.addQueryParams(
            {
              page: old - 1,
            },
            { replaceState: true },
          );

          return old - 1;
        });
      }

      if (nextLots.findIndex((l) => l.id === lotId) !== -1) {
        setPage((old) => {
          RouterService.addQueryParams(
            {
              page: old + 1,
            },
            { replaceState: true },
          );

          return old + 1;
        });
      }
    }
  }, [currentIdx, prevLots, nextLots]);

  if (!isPrevNextAvailable) {
    return null;
  }

  const nextLot = currentLots[currentIdx + 1] || nextLots[0];
  const prevLot = currentLots[currentIdx - 1] || prevLots.at(-1);

  return {
    nextLot,
    prevLot,
  };
}

export default usePrevNextLot;
