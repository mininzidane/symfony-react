import { useContext, useEffect } from 'react';
import PaginationContext from 'frontend/js/context/PaginationContext';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';
import SortContext from 'frontend/js/context/SortContext';
import FiltersContext from '../Shared/_Context/Filters';

function useLotsWon(handleCountUpdate) {
  const { filters } = useContext(FiltersContext);
  const { currentPage, setItemsPerPage, setTotal, setCurrentPage } = useContext(PaginationContext);
  const { sort } = useContext(SortContext);
  const queryParams = { ...filters, page: currentPage, sort: sort.field, order: sort.order };
  const queryString = RouterService.serializeQueryParams(queryParams);
  const { data, isLoading } = useQuery(['lots-won-data', queryString], () => LotService.getLotsWon(queryString), {
    keepPreviousData: true,
  });

  const bidders = get(data, 'bidders', []);
  const dateRanges = get(data, 'dateRanges', []);
  const invoices = get(data, 'data', []);
  const total = get(data, 'total', 0);
  const size = get(data, 'size', 25);

  useEffect(() => {
    if (data && !isLoading) {
      setTotal(total);
      setItemsPerPage(size);
      setCurrentPage(currentPage);
      handleCountUpdate({ won: total });
    }
  }, [data, isLoading]);

  return { loading: isLoading && !data, invoices, bidders, dateRanges, total, size, currentPage };
}

export default useLotsWon;
