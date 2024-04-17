import { useEffect, useContext } from 'react';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import SortContext from 'frontend/js/context/SortContext';
import PaginationContext from 'frontend/js/context/PaginationContext';
import LotService from 'frontend/js/api/LotService';
import FiltersContext from '../Shared/_Context/Filters';

function useCurrentBids(handleCountUpdate) {
  const { filters } = useContext(FiltersContext);
  const { currentPage, setTotal, setItemsPerPage } = useContext(PaginationContext);
  const { sort } = useContext(SortContext);
  const queryParams = { ...filters, page: currentPage, sort: sort.field, order: sort.order };
  const queryString = RouterService.serializeQueryParams(queryParams);
  const { data, isLoading } = useQuery(
    ['current-bids-data', queryString],
    () => LotService.getCurrentBids(queryString),
    { keepPreviousData: true },
  );

  const lots = get(data, 'lots', []);
  const total = get(data, 'currentCount');
  const invoices = get(data, 'data', []);
  const bidders = get(data, 'bidders', []);
  const dateRanges = get(data, 'dateRanges', []);
  const itemsPerPage = get(data, 'size');

  useEffect(() => {
    if (data && !isLoading) {
      handleCountUpdate({ current: total });
      setTotal(total);

      if (itemsPerPage) {
        setItemsPerPage(itemsPerPage);
      }
    }
  }, [data, isLoading]);

  return { isInitialLoad: !data && isLoading, invoices, bidders, dateRanges, lots, total };
}

export default useCurrentBids;
