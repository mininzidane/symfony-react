import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactService from 'frontend/js/lib/utils/ReactService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import HiddenFooterFallback from 'frontend/js/components/Suspense/HiddenFooterFallback';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';
import Loader from './_Shared/Loader';

const TableView = ReactService.lazyWithPreload(() => import('./TableView'));
const CardsView = ReactService.lazyWithPreload(() => import('./CardsView'));
const CalendarView = ReactService.lazyWithPreload(() => import('./CalendarView'));

function AuctionsCalendar({ data, hideTimes }) {
  const { isBelowLg } = useBreakpoint();
  const { view, viewModeOptions } = useContext(ViewModeContext);
  const { auctions, auctionGroups, statuses, calendarDays, isLoading } = data;

  const fallback = (
    <>
      <HiddenFooterFallback
        onUnmount={() => {
          DelayedLoadService.done(DelayedLoadService.ACTIONS.MAIN_CONTENT_LOADED);
        }}
      />
      <Loader />
    </>
  );

  if (view === viewModeOptions.LIST) {
    return (
      <SuspenseWrap key="list" fallback={fallback} isDataReady={!isLoading}>
        <TableView auctions={auctions} />
      </SuspenseWrap>
    );
  }

  if (isBelowLg) {
    return (
      <SuspenseWrap key="small screen" fallback={fallback} isDataReady={!isLoading}>
        <CardsView statuses={statuses} auctions={auctions} auctionGroups={auctionGroups} calendarDays={calendarDays} />
      </SuspenseWrap>
    );
  }

  return (
    <SuspenseWrap key="grid" fallback={fallback} isDataReady={!isLoading}>
      <CalendarView statuses={statuses} auctions={auctions} auctionGroups={auctionGroups} hideTimes={hideTimes} />
    </SuspenseWrap>
  );
}

AuctionsCalendar.propTypes = {
  data: PropTypes.object.isRequired,
  hideTimes: PropTypes.bool,
};

AuctionsCalendar.defaultProps = {
  hideTimes: false,
};

export default AuctionsCalendar;
