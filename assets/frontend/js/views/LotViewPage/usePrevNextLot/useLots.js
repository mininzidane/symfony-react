import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import SearchService from 'frontend/js/api/SearchService';

function useLots(query, options) {
  const serializedQuery = RouterService.serializeQueryParams(query);
  const { data: { lots = [] } = {} } = useQuery(
    ['prev-next-lot', serializedQuery],
    () => SearchService.getSearchResults(serializedQuery),
    {
      cacheTime: 15 * 60 * 1000,
      staleTime: Infinity,
      ...options,
    },
  );

  return { lots };
}

export default useLots;
