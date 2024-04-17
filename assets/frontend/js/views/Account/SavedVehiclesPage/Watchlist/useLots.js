import { useEffect, useContext } from 'react';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import PaginationContext from 'frontend/js/context/PaginationContext';
import RouterService from 'frontend/js/api/RouterService';
import WatchlistService from 'frontend/js/api/WatchlistService';
import SortContext from './_Context/SortContext';

function useLot(id) {
  const isCompleted = id === 'completed';
  const { currentPage: page, setItemsPerPage, setTotal, setCurrentPage } = useContext(PaginationContext);
  const { sort } = useContext(SortContext);
  const params = { page, sort: sort.field, order: sort.order };
  const path = RouterService.serializeQueryParams(params);

  const { data: dataCompleted, isLoading: completedIsLoading } = useQuery(
    ['completed-watchlist-lots-data', path],
    () => WatchlistService.getCompletedWatchlistLots(path),
    { keepPreviousData: true, enabled: isCompleted },
  );

  const { data: dataCurrent, isLoading: currentIsLoading } = useQuery(
    ['current-watchlist-lots-data', path],
    () => WatchlistService.getCurrentWatchlistLots(path),
    { keepPreviousData: true, enabled: !isCompleted },
  );

  const data = isCompleted ? dataCompleted : dataCurrent;
  const isLoading = isCompleted ? completedIsLoading : currentIsLoading;

  const lots = get(data, 'data', {});
  const total = get(data, 'total');
  const currentPage = get(data, 'currentPage', 0);
  const itemsPerPage = get(data, 'size');

  useEffect(() => {
    if (data) {
      setItemsPerPage(itemsPerPage);
      setTotal(total);
      setCurrentPage(currentPage);
      if (!isCompleted) {
        window.dispatchEvent(new CustomEvent('setWatchlistCount', { detail: { count: total } }));
      }
    }
  }, [data]);

  return { isInitialLoad: !data && isLoading, loading: isLoading, lots };
}

export default useLot;
