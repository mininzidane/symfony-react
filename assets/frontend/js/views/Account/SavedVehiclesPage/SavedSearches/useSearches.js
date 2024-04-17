import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import SavedSearchesService from 'frontend/js/api/SavedSearches';
import PaginationContext from 'frontend/js/context/PaginationContext';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function useSearches() {
  const { setTotal, setItemsPerPage, setCurrentPage, currentPage: page } = useContext(PaginationContext);

  const queryString = RouterService.serializeQueryParams({ page });

  const { isAuthenticated } = useCustomerHelper();

  const { isLoading, data } = useQuery(
    ['saved-searches-data', queryString],
    () => SavedSearchesService.getSavedSearches(queryString),
    { enabled: isAuthenticated },
  );
  const [isReceived, setIsReceived] = useState();

  const searches = get(data, 'savedSearches', []);
  const totals = get(data, 'totals', {});
  const total = get(data, 'total', 0);
  const itemsPerPage = get(data, 'size', 25);
  const currentPage = get(data, 'currentPage', 1);

  const result = searches.map((search) => ({
    id: search.id,
    title: search.title,
    total: totals[search.id],
    addedAt: search.addedAt,
    hash: search.hash,
  }));

  useEffect(() => {
    if (data && !isReceived) {
      setTotal(total);
      setItemsPerPage(itemsPerPage);
      setCurrentPage(currentPage);
      setIsReceived(true);
    }
  }, [data]);

  return [result, isLoading && !data];
}

export default useSearches;
