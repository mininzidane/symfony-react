import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import PaginationContext from 'frontend/js/context/PaginationContext';
import SearchService from 'frontend/js/api/SearchService';
import RouterService from 'frontend/js/api/RouterService';

function useSearchHashRestoration(query) {
  const { currentPage, setCurrentPage, itemsPerPage, setItemsPerPage } = useContext(PaginationContext);

  const params = RouterService.serializeQueryParams({
    saved_search_hash: query.saved_search_hash,
    recent_search_hash: query.recent_search_hash,
  });

  const { data } = useQuery(['search-results-data', params], () => SearchService.getSearchResults(params), {
    cacheTime: 0,
    enabled: Boolean(query.search_hash),
  });

  const parsedSearchHashToQueryParams = get(data, 'query');

  useEffect(() => {
    if (!query.search_hash || !parsedSearchHashToQueryParams) {
      return;
    }

    const { parameters, fixedParameters, page, size } = parsedSearchHashToQueryParams;

    const queryParams = {
      ...(parameters && parameters),
      ...(fixedParameters && fixedParameters),
    };

    if (currentPage !== page) {
      setCurrentPage(page);
      queryParams.page = page;
    }

    if (itemsPerPage !== size) {
      setItemsPerPage(size);
      queryParams.size = size;
    }

    RouterService.setQueryParams(queryParams, { replaceState: true });
    dispatchEvent(new CustomEvent('init_refinements'));
  }, [parsedSearchHashToQueryParams, query.search_hash]);
}

export default useSearchHashRestoration;
