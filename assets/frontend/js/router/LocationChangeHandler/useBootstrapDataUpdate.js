import { useQuery } from 'react-query';
import { useEffect } from 'react';
import BootstrapApiService from 'frontend/js/api/BootstrapApiService';
import BootstrapService from 'frontend/js/api/BootstrapService';

function useBootstrapDataUpdate() {
  const { data, isStale, isLoading, refetch } = useQuery('bootstrap', () => BootstrapApiService.getBootstrapByApi(), {
    cacheTime: 30 * 1000,
    staleTime: 30 * 1000,
    notifyOnChangePropsExclusions: [],
  });

  useEffect(() => {
    if (data) {
      BootstrapService.update(data.bootstrap);
    }
  }, [data]);

  return () => {
    if (isStale && !isLoading) {
      refetch();
    }
  };
}

export default useBootstrapDataUpdate;
