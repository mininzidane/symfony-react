import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { WatchlistProvider } from 'frontend/js/context/WatchlistContext';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import { ViewModeProvider } from 'frontend/js/context/ViewModeContext';
import useSavedSearchesCount from 'frontend/js/hooks/useSavedSearchesCount';
import RouterService from 'frontend/js/api/RouterService';
import TabsContainer from 'frontend/js/components/Tabs/TabsContainer';
import useWatchlistCount from 'frontend/js/hooks/useWatchlistCount';
import TabContent from 'frontend/js/components/Tabs/TabContent';
import { SortProvider } from './Watchlist/_Context/SortContext';
import CaptionPanel from './CaptionPanel';
import Watchlist from './Watchlist';
import SavedSearches from './SavedSearches';

function SavedVehiclesPage() {
  const WATCHLIST_TAB = 'watchlist';
  const SAVED_SEARCHES_TAB = 'savedSearches';
  const [status, setStatus] = useState('current');
  const watchlistCount = useWatchlistCount();
  const savedSearchesCount = useSavedSearchesCount();

  const { path } = useParams();
  const tab = {
    [path === 'watchlist']: WATCHLIST_TAB,
    [path === 'saved-searches']: SAVED_SEARCHES_TAB,
  }.true;

  function handleTabChange(value) {
    RouterService.customRedirect(RouterService.getRoute(value));
  }

  return (
    <TabsContainer defaultTab={tab} onChange={handleTabChange}>
      <CaptionPanel
        watchlistCount={watchlistCount}
        savedSearchesCount={savedSearchesCount}
        status={status}
        viewMode={tab === WATCHLIST_TAB}
      />

      <TabContent id={WATCHLIST_TAB}>
        <Watchlist status={status} setStatus={setStatus} />
      </TabContent>

      <TabContent id={SAVED_SEARCHES_TAB}>
        <SavedSearches />
      </TabContent>
    </TabsContainer>
  );
}

export default () => (
  <PaginationProvider>
    <SortProvider>
      <WatchlistProvider>
        <ViewModeProvider>
          <SavedVehiclesPage />
        </ViewModeProvider>
      </WatchlistProvider>
    </SortProvider>
  </PaginationProvider>
);
