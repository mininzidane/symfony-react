import { useEffect, useContext } from 'react';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import PaginationContext from 'frontend/js/context/PaginationContext';
import SortContext from 'frontend/js/context/SortContext';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';

function useLotsLost(handleCountUpdate) {
  const { currentPage, setTotal } = useContext(PaginationContext);
  const { sort } = useContext(SortContext);
  const queryParams = { page: currentPage, sort: sort.field, order: sort.order };
  const queryString = RouterService.serializeQueryParams(queryParams);
  const { data, isLoading } = useQuery(['lots-lost-data', queryString], () => LotService.getLotsLost(queryString), {
    keepPreviousData: true,
  });

  const lots = Object.values(get(data, 'lots', {}));
  const lostCount = get(data, 'lostCount');

  useEffect(() => {
    if (data && !isLoading) {
      setTotal(lostCount);
      handleCountUpdate({ lost: lostCount });
    }
  }, [data, isLoading]);

  return { loading: isLoading && !data, lots, lostCount };
}

export default useLotsLost;
