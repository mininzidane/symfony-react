import { useQuery } from 'react-query';
import get from 'lodash/get';
import SearchService from 'frontend/js/api/SearchService';
import RouterService from 'frontend/js/api/RouterService';
import { useCustomerLocationContext } from 'frontend/js/context/CustomerLocationContext';

function useFilters(query, opts = {}, withLoading) {
  const queryString = RouterService.serializeQueryParams(query);
  const { loading: locationLoading } = useCustomerLocationContext();

  const { data } = useQuery(['filters-data', queryString], () => SearchService.getFilters(queryString), {
    enabled: !query.search_hash && !locationLoading,
    keepPreviousData: !query.search_hash,
    ...opts,
  });

  const filters = get(data, 'filters');

  if (withLoading) {
    return {
      loading: !data,
      data: filters,
    };
  }

  return filters;
}

export default useFilters;
