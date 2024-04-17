import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import PaginationContext from 'frontend/js/context/PaginationContext';
import BrokerService from 'frontend/js/api/BrokerService';
import RouterService from 'frontend/js/api/RouterService';
import SortContext from 'frontend/js/context/SortContext';

function useBidders() {
  const { currentPage: page, setTotal, setItemsPerPage, setCurrentPage } = useContext(PaginationContext);
  const { sort } = useContext(SortContext);
  const queryParams = { page, sort: sort.field, order: sort.order };
  const queryString = RouterService.serializeQueryParams(queryParams);

  const { data, isLoading } = useQuery(['bidders-data', queryString], () => BrokerService.getBidders(queryString), {
    keepPreviousData: true,
  });

  const bidders = get(data, 'data', []);
  const currentPage = get(data, 'currentPage', 1);
  const itemsPerPage = get(data, 'size', 25);
  const total = get(data, 'total', 1);

  useEffect(() => {
    if (data) {
      setCurrentPage(currentPage);
      setItemsPerPage(itemsPerPage);
      setTotal(total);
    }
  }, [data]);

  return [bidders, !data && isLoading];
}

export default useBidders;
