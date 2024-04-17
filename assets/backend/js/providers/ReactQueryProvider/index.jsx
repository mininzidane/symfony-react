import React from 'react';
import { QueryClient, QueryClientProvider as QueryClientProviderLib } from 'react-query';
import PropTypes from 'prop-types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function QueryClientProvider({ children }) {
  return <QueryClientProviderLib client={queryClient}>{children}</QueryClientProviderLib>;
}

QueryClientProvider.defaultProps = {
  children: null,
};

QueryClientProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default QueryClientProvider;
