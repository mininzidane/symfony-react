import { useQuery } from 'react-query';
import get from 'lodash/get';
import SavedSearchesService from 'frontend/js/api/SavedSearches';
import useEventListener from 'frontend/js/hooks/useEventListener';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

const SIZE_LIMIT = 999;

function useSavedSearches() {
  const queryString = RouterService.serializeQueryParams({ size: SIZE_LIMIT, order: 'desc' });

  const { isAuthenticated } = useCustomerHelper();

  const { isLoading, data, refetch } = useQuery(
    ['saved-searches-data', queryString],
    () => SavedSearchesService.getSavedSearches(queryString),
    { keepPreviousData: true, enabled: isAuthenticated },
  );

  useEventListener('refetchSavedSearches', refetch);

  const searches = get(data, 'savedSearches', []);
  const totals = get(data, 'totals', {});
  const total = get(data, 'total', 0);

  const result = searches.map((search) => ({
    id: search.id,
    title: search.title,
    total: totals[search.id],
    hash: search.hash,
  }));

  return [result, total, data, isLoading];
}

export default useSavedSearches;
