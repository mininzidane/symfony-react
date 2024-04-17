import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import useBootstrapDataUpdate from './useBootstrapDataUpdate';
import useCustomerDataUpdate from './useCustomerDataUpdate';
import useTermsChecker from './useTermsChecker';
import usePrevPageHrefSaver from './usePrevPageHrefSaver';
import useAdSlotsCleaner from './useAdSlotsCleaner';

const LocationChangeHandler = () => {
  const location = useLocation();

  const termsChecker = useTermsChecker();
  const bootstrapDataUpdate = useBootstrapDataUpdate();
  const customerDataUpdate = useCustomerDataUpdate();
  const prevPageHrefSaver = usePrevPageHrefSaver();
  useAdSlotsCleaner(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);

    const eventTrackingService = new EventTrackingService();
    eventTrackingService.pageVisit();
    eventTrackingService.setVisitedPagesCount();
    const gaService = new GoogleAnalyticsService();
    gaService.sendPageView();

    prevPageHrefSaver();
    bootstrapDataUpdate();
    customerDataUpdate();
    termsChecker(location);
  }, [location.pathname]);

  return null;
};

export default LocationChangeHandler;
