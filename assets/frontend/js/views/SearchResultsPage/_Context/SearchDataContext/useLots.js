import { useEffect } from 'react';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import SearchService from 'frontend/js/api/SearchService';
import RouterService from 'frontend/js/api/RouterService';
import { useCustomerLocationContext } from 'frontend/js/context/CustomerLocationContext';

function useLots(query) {
  const queryString = RouterService.serializeQueryParams(query);
  const { loading: locationLoading } = useCustomerLocationContext();

  const { data, isLoading } = useQuery(
    ['search-results-data', queryString],
    () => SearchService.getSearchResults(queryString),
    { cacheTime: 0, enabled: !query.search_hash && !locationLoading },
  );

  const lots = get(data, 'lots', []);
  const { searchHash: _, ...restQuery } = query;
  const searchHash = get(data, 'query.searchHash', '');

  useEffect(() => {
    if (data) {
      const lastSearches = LocalStorageService.get('lastSearches') || [];

      lastSearches.push({
        searchHash,
        lots: lots.map(({ id, slug }) => ({ id, slug })),
        query: restQuery,
      });

      if (lastSearches.length === 11) {
        lastSearches.shift();
      }

      LocalStorageService.set('lastSearches', lastSearches);
    }
  }, [data]);

  lots.forEach((lot) => {
    lot.searchHash = searchHash;
  });

  const values = {
    lots,
    seo: {
      title: get(data, 'seo.title', '') || '',
      breadcrumbs: get(data, 'seo.breadcrumbs', []),
      description: get(data, 'seo.description', ''),
      keywords: get(data, 'seo.keywords', '') || '',
      pageTitle: get(data, 'seo.pageTitle', '') || '',
      pageContent: get(data, 'seo.pageContent', '') || '',
      h1: get(data, 'seo.h1', '') || '',
      canonicalUrl: get(data, 'seo.canonicalUrl'),
      noIndex: get(data, 'seo.noIndex'),
      follow: get(data, 'seo.follow'),
    },
    total: get(data, 'total', 0),
    maxNumberOfPages: get(data, 'query.maxNumberOfPages', 0),
    searchHash,
    redirectUrl: get(data, 'redirect'),
  };

  const isInitialLoad = !data && (isLoading || locationLoading);
  const isSearchHashProcessing = Boolean(query.search_hash);
  const isRedirect = Boolean(values.redirectUrl);

  return {
    data: values,
    isInitialLoad: isInitialLoad || isRedirect || isSearchHashProcessing,
    isLoading,
  };
}

export default useLots;
