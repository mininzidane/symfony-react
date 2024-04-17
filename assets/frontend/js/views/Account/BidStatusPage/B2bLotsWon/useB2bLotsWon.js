import { useEffect, useContext } from 'react';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import SortContext from 'frontend/js/context/SortContext';
import PaginationContext from 'frontend/js/context/PaginationContext';
import LotService from 'frontend/js/api/LotService';
import FiltersContext from '../Shared/_Context/Filters';

function usePurchases(handleCountUpdate) {
  const { filters } = useContext(FiltersContext);
  const { currentPage, setTotal, setItemsPerPage, itemsPerPage } = useContext(PaginationContext);
  const { sort } = useContext(SortContext);
  const queryParams = { ...filters, page: currentPage, sort: sort.field, order: sort.order, size: itemsPerPage };
  const queryString = RouterService.serializeQueryParams(queryParams);
  const { data, isLoading } = useQuery(['lots-won-data', queryString], () => LotService.getLotsWon(queryString), {
    keepPreviousData: true,
  });

  const invoices = get(data, 'data', []);
  const bidders = get(data, 'bidders', []);
  const dateRanges = get(data, 'dateRanges', []);
  const total = get(data, 'total', 0);
  const size = get(data, 'size', 25);

  useEffect(() => {
    if (data && !isLoading) {
      handleCountUpdate({ purchases: total });
      setTotal(total);
      setItemsPerPage(size);
    }
  }, [data, isLoading]);

  return { loading: isLoading, invoices, bidders, dateRanges, total };
}

export default usePurchases;
