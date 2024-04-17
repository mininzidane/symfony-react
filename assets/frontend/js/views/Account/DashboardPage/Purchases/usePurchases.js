import { useMemo } from 'react';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';

function usePurchases({ sort, size }) {
  const queryParams = { sort: sort.field, order: sort.order, size, bidderCustomerId: '*', dateFilter: '*', page: 1 };
  const queryString = RouterService.serializeQueryParams(queryParams);
  const { data, isLoading } = useQuery(['lots-won-data', queryString], () => LotService.getLotsWon(queryString), {
    keepPreviousData: true,
  });

  const invoices = get(data, 'data', []);
  const total = get(data, 'total');
  const lots = useMemo(() => (invoices ? invoices.map(({ lot }) => lot).filter(Boolean) : []), [invoices]);

  return { loading: isLoading, isInitialLoad: !data && isLoading, invoices, lots, total };
}

export default usePurchases;
