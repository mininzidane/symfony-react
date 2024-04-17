import { useEffect, useContext } from 'react';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import PaginationContext from 'frontend/js/context/PaginationContext';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';

function useContainers(handleCountUpdate, filters, setIsFirstTimeLoading) {
  const { currentPage: page, setTotal, itemsPerPage, setCurrentPage } = useContext(PaginationContext);
  const queryParams = { page, size: itemsPerPage, ...filters };
  const queryString = RouterService.serializeQueryParams(queryParams);
  const { data, isLoading } = useQuery(
    ['containers-data', queryString],
    () => ShippingOrderService.getContainers(queryString),
    { keepPreviousData: true },
  );

  const responseData = get(data, 'data', []);
  const currentPage = get(data, 'currentPage', 1);
  const total = get(data, 'total', 0);

  useEffect(() => {
    if (data && !isLoading) {
      setIsFirstTimeLoading(false);
      handleCountUpdate({ containers: total });
      setTotal(total);
      setCurrentPage(currentPage);
    }
  }, [data, isLoading]);

  return { loading: isLoading, data: responseData, total };
}

export default useContainers;
