import get from 'lodash/get';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';

function useCurrentBids(sort, size) {
  const queryParams = { page: 1, size, sort: sort.field, order: sort.order };
  const queryString = RouterService.serializeQueryParams(queryParams);
  const { data, isLoading } = useQuery(
    ['current-bids-data', queryString],
    () => LotService.getCurrentBids(queryString),
    { keepPreviousData: true },
  );

  const lots = get(data, 'lots', []);
  const total = get(data, 'currentCount');

  return { loading: isLoading, isInitialLoad: !data && isLoading, lots, total };
}

export default useCurrentBids;
