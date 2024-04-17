import { useContext, useEffect } from 'react';
import { createContainer } from 'react-tracked';
import PaginationContext from 'frontend/js/context/PaginationContext';
import useEventListener from 'frontend/js/hooks/useEventListener';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import RouterService from 'frontend/js/api/RouterService';
import useLots from './useLots';
import useQuery from './useQuery';
import useSearchHashRestoration from './useSearchHashRestoration';

const useValues = () => {
  const { setTotal, setMaxPagesCount } = useContext(PaginationContext);
  const query = useQuery();
  const { data, isInitialLoad, searchHashData } = useLots(query);
  const { lots, seo, total, maxNumberOfPages, searchHash, redirectUrl } = data;

  useSearchHashRestoration(query, searchHashData);

  useEffect(() => {
    if (total) {
      setTotal(total);
    }
  }, [total]);

  useEffect(() => {
    if (maxNumberOfPages) {
      setMaxPagesCount(maxNumberOfPages);
    }
  }, [maxNumberOfPages]);

  useEffect(() => {
    if (redirectUrl) {
      RouterService.customRedirect(redirectUrl);
    }
  }, [redirectUrl]);

  useEventListener('popstate', () => {
    setTimeout(() => {
      ScrollService.scrollToTop();
    }, 0);
  });

  return [
    {
      lots,
      seo,
      total,
      searchHash,
      isInitialLoad,
    },
  ];
};

export const { Provider: SearchDataProvider, useTracked: useSearchData } = createContainer(useValues);
