import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import Loader from 'frontend/js/views/Shared/Loader';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import { FiltersProvider, useFiltersContext } from './Filters/Context';
import PageContent from './PageContent';
import useStyles from './useStyles';
import useContainers from './useContainers';
import Filters from './Filters';

function B2bContainers() {
  const classes = useStyles();

  const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true);
  const [{ filters }] = useFiltersContext();
  const { loading, total, data } = useContainers(() => {}, filters, setIsFirstTimeLoading);

  const entries = Object.values(data);

  if (isFirstTimeLoading) {
    return (
      <div className={classes.root}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Filters />
      {entries.length > 0 && (
        <PageContent invoices={entries} isLoading={loading} total={total} containers={filters.containers || []} />
      )}
    </div>
  );
}

const $containers = document.getElementById('containers');
ReactDOM.render(
  <ThemeProvider>
    <TranslationProvider>
      <ReactQueryProvider>
        <FiltersProvider>
          <PaginationProvider itemsPerPageOptions={[30, 60, 90]}>
            <B2bContainers />
          </PaginationProvider>
        </FiltersProvider>
      </ReactQueryProvider>
    </TranslationProvider>
  </ThemeProvider>,
  $containers,
);
