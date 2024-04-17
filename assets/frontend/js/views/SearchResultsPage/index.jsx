import React, { Suspense } from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import { WatchlistProvider } from 'frontend/js/context/WatchlistContext';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import { PreviewModalProvider } from 'frontend/js/context/PreviewModalContext';
import usePreventScrollRestoration from 'frontend/js/hooks/usePreventScrollRestoration';
import { CustomerLocationProvider } from 'frontend/js/context/CustomerLocationContext';

import { DisplaySettingsProvider } from './_Context/DisplaySettingsContext';
import { SearchDataProvider } from './_Context/SearchDataContext';
import { FiltersProvider } from './_Context/FiltersContext';

import TopbarLoading from './Topbar/Loading';
import Sidebar from './Sidebar';
import Content from './Content';
import preload from './preload';
import useStyles from './useStyles';

const Topbar = React.lazy(() => import('./Topbar'));

function SearchResultsPage() {
  const classes = useStyles();

  usePreventScrollRestoration();

  return (
    <CustomerLocationProvider storageLocationKey="abmSearchLocation" allowFetch>
      <WatchlistProvider>
        <PreviewModalProvider>
          <PaginationProvider itemsPerPage={24}>
            <DisplaySettingsProvider>
              <FiltersProvider>
                <SearchDataProvider>
                  <Suspense fallback={<TopbarLoading />}>
                    <Topbar />
                  </Suspense>

                  <ContainerFullScreen className={classes.container} isUltraWide>
                    <Sidebar />

                    <Content />
                  </ContainerFullScreen>
                </SearchDataProvider>
              </FiltersProvider>
            </DisplaySettingsProvider>
          </PaginationProvider>
        </PreviewModalProvider>
      </WatchlistProvider>
    </CustomerLocationProvider>
  );
}

SearchResultsPage.preload = preload;

export default SearchResultsPage;
