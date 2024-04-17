/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import defer from 'frontend/js/hocs/defer';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ReactService from 'frontend/js/lib/utils/ReactService';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import { useDisplaySettingsContext } from 'frontend/js/views/SearchResultsPage/_Context/DisplaySettingsContext';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import Pagination from 'frontend/js/components/Pagination';
import AdbutlerAdvertisement from 'frontend/js/components/AdbutlerAdvertisement';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import HiddenFooterFallback from 'frontend/js/components/Suspense/HiddenFooterFallback';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';
import VehiclePreviewModal from './VehiclePreviewModal';
import SeoContent from './SeoContent';
import useLastVisitedLot from './useLastVisitedLot';
import AdButlerBanner from './AdButlerBanner';

const GridViewResults = ReactService.lazyWithPreload(() => import('./GridViewResults'));
const TableViewResults = ReactService.lazyWithPreload(() => import('./TableViewResults'));

const Content = defer(
  ({ lots, isGridView, loading }) => {
    const { isBelowMd } = useBreakpoint();
    const { lastVisitedLotId, ref } = useLastVisitedLot(loading);

    const [{ addWatchlistEntries }] = useWatchlistContext();
    useEffect(() => {
      addWatchlistEntries(lots);
    }, [lots]);

    const results = useMemo(() => {
      const View = isGridView ? GridViewResults : TableViewResults;

      return <View lots={lots} lastVisitedLotId={lastVisitedLotId} />;
    }, [lots, isGridView, lastVisitedLotId]);

    return (
      <div className="mb-30" ref={ref}>
        <AdButlerBanner />
        {results}
        <VehiclePreviewModal lots={lots} />
        <Pagination withHistoryAPI />
        {isBelowMd && <AdbutlerAdvertisement id="519499" className="mt-30" />}
        <SeoContent />
      </div>
    );
  },
  { initial: 0, rerender: 100 },
);

function ContentBody() {
  const [{ isInitialLoad, lots, searchHash }] = useSearchData();
  const [{ isGridView }] = useDisplaySettingsContext();

  return (
    <SuspenseWrap
      fallback={
        <HiddenFooterFallback
          onUnmount={() => {
            DelayedLoadService.done(DelayedLoadService.ACTIONS.MAIN_CONTENT_LOADED);
          }}
        />
      }
      isDataReady={!isInitialLoad}
      preload={() => {
        if (isGridView) {
          GridViewResults.preload();
        } else {
          TableViewResults.preload();
        }
      }}
    >
      <Content lots={lots} isGridView={isGridView} loading={isInitialLoad} searchHash={searchHash} />
    </SuspenseWrap>
  );
}

export { GridViewResults, TableViewResults };

export default ContentBody;
