import get from 'lodash/get';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import WatchlistService from 'frontend/js/api/WatchlistService';

function useWatchlistLots({ sort, size }) {
  const params = { sort: sort.field, order: sort.order, size };
  const path = RouterService.serializeQueryParams(params);

  const { data, isLoading } = useQuery(
    ['current-watchlist-lots-data', path],
    () => WatchlistService.getCurrentWatchlistLots(path),
    { keepPreviousData: true },
  );

  const lots = get(data, 'data', []);
  const total = get(data, 'total');

  return { loading: isLoading, isInitialLoad: !data && isLoading, lots, total };
}

export default useWatchlistLots;
