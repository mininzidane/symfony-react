import React from 'react';
import { QueryClientProvider as QueryClientProviderLib } from 'react-query';
import PropTypes from 'prop-types';
import queryClient from './client';

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
