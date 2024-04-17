import React, { Suspense } from 'react';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';
import LiveAuctionsBanner from 'frontend/js/views/LiveAuctionsBanner';
import Fallback from 'frontend/js/components/Suspense/Fallback';
import Header from 'frontend/js/router/Header';
import Footer from 'frontend/js/router/Footer';
import DelayedLoadSuspense from 'frontend/js/components/Suspense/DelayedLoad';
import useComponentWillMount from 'frontend/js/hooks/useComponentWillMount';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import PageContent from './PageContent';

const SiteNotifications = React.lazy(() => import('frontend/js/views/SiteNotifications'));
const SiteNotificationsStatic = React.lazy(() => import('frontend/js/views/SiteNotificationsStatic'));

const Page = (params) => {
  const {
    isAllNotificationsDisabled,
    isSiteNotificationsDisabled,
    isSiteNotificationsStaticDisabled,
    hasLiveAuctionBanner,
    superLazy, // wait for page's inner lazy content to load
  } = params;
  // Reset(show) footer in case previous page hid footer and didn't handle cancel(early return) logic
  useComponentWillMount(() => {
    ViewportService.showFooter();
  });

  return (
    <>
      {!isAllNotificationsDisabled && !isSiteNotificationsDisabled && (
        <DelayedLoadSuspense fallback={null}>
          <SiteNotifications />
        </DelayedLoadSuspense>
      )}

      <Header {...params} />

      {hasLiveAuctionBanner && <LiveAuctionsBanner />}
      {!isAllNotificationsDisabled && !isSiteNotificationsStaticDisabled && (
        <DelayedLoadSuspense fallback={null}>
          <SiteNotificationsStatic />
        </DelayedLoadSuspense>
      )}

      <Suspense
        fallback={
          <Fallback
            onUnmount={() => {
              if (!superLazy) {
                DelayedLoadService.done(DelayedLoadService.ACTIONS.MAIN_CONTENT_LOADED);
              }
            }}
          />
        }
      >
        <PageContent {...params} />

        <Footer {...params} />
      </Suspense>
    </>
  );
};

export default Page;
