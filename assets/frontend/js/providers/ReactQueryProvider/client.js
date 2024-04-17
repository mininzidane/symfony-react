import get from 'lodash/get';
import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangePropsExclusions: ['isStale', 'isRefetching', 'isFetching'],
      refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
      staleTime: 5 * 1000,
      cacheTime: 5 * 60 * 1000,
      retry: (attempt, e) => {
        if (attempt >= 1) {
          return false;
        }

        const status = get(e, 'response.status');
        if (status && status < 500) {
          return false;
        }

        return true;
      },
    },
  },
});

export default queryClient;
