import React, { useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { useParams } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { WatchlistProvider } from 'frontend/js/context/WatchlistContext';
import LanguageService from 'frontend/js/api/LanguageService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import CountryService from 'frontend/js/api/CountryService';
import usePreviousNonNullish from 'frontend/js/hooks/usePreviousNonNullish';
import { useNotifications } from 'frontend/js/providers/NotificationsProvider';
import LotService from 'frontend/js/api/LotService';
import useHideFooter from 'frontend/js/hooks/useHideFooter';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';

import Meta from './Meta';
import LotHeader from './LotHeader';
import SeoContent from './SeoContent';
import View1Columns from './View1Columns';
import View2Columns from './View2Columns';
import View3Columns from './View3Columns';
import preload from './preload';
import prefetch from './prefetch';
import useLotData from './useLotData';
import useStyles from './useStyles';
import SchemaJsonLdBlock from './SchemaJsonLdBlock';

const ExitModal = React.lazy(() => import('./ExitModal'));
const MobileToolbar = React.lazy(() => import('./MobileToolbar'));
const ShippingPromotionBanners = React.lazy(() => import('./ShippingPromotionBanners'));
const FacebookFeedbackBanner = React.lazy(() => import('frontend/js/views/Shared/PageSections/FacebookFeedbackBanner'));

function LotViewPage() {
  const { lotId: id, slug } = useParams();
  const locale = LanguageService.getCurrentLocale();
  const auction = LotService.prefixToAuctionType(slug?.split('_')?.[0]);
  const isAbmInventory = auction === LotService.AUCTION_ABM;
  const isNpa = auction === LotService.AUCTION_NPA;

  const data = useLotData(id, slug);
  const previousLotInfo = usePreviousNonNullish(data);
  const noData = !data;
  const showLoader = previousLotInfo || window.INITIAL_LOAD;

  const { lot, seo, ymmSearchLink } = data || previousLotInfo || {};
  const [{ setNotificationsData }] = useNotifications();

  const [customer, setCustomer] = useState(window.customer);
  const { isAuthenticated } = useCustomerHelper(window.customer);

  const TWO_COL_BREAKPOINT = 1365;
  const isThreeColumns = useMediaQuery((theme) => theme.breakpoints.up(TWO_COL_BREAKPOINT));
  const isOneColumns = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const classes = useStyles();

  const bidStatus = lot ? LotStatusStates.getStateByLot(lot) : null;
  const isLotSold = bidStatus === LotStatusStates.SOLD;
  const isLotWon = bidStatus === LotStatusStates.WON;
  const isMembershipPromoShown = !isAuthenticated || customer.membershipType.level === 1;
  const isClearvinBannerShown = lot?.showClearVinBadge;

  const userCountryIso2 = CountryService.getUserCountryIso2();
  const isUSCustomer = CountryService.isUserCountry('usa');
  const isVehicleCalculatorShown = !isUSCustomer && !isAbmInventory;
  const isFAQShown = isUSCustomer && !isAuthenticated;
  const isShippingPromoShown = Boolean(!isVehicleCalculatorShown && lot?.showEasyHaulWidget);

  useEffect(() => {
    function setPageAsVisited() {
      setTimeout(() => {
        LocalStorageService.set('Abm::isPageVisited', true);
      }, 1000);
    }

    if (lot && !lot.FAKE) {
      setPageAsVisited();
      setNotificationsData({
        bidStatus: lot.bidStatus,
      });
    }

    return () => {
      setNotificationsData({
        bidStatus: null,
      });
    };
  }, [lot]);

  useEffect(() => {
    if (!lot) {
      return () => {};
    }

    const $footer = document.getElementById('footer-copyright');
    if ($footer) {
      $footer.classList[isLotSold ? 'add' : 'remove']('is-bottom-toolbar-hidden');
    }

    return () => {
      if ($footer) {
        $footer.classList.remove('is-bottom-toolbar-hidden');
      }
    };
  }, [isLotSold, lot]);

  // Lazy load
  const onContentLoad = useCallback(() => {
    DelayedLoadService.done(DelayedLoadService.ACTIONS.MAIN_CONTENT_LOADED);

    ViewportService.showFooter();

    const $root = document.getElementById('root-lot-page');
    $root.dataset.hiddenSeo = 'false';
  }, []);

  useHideFooter();
  // Lazy load

  const grid = useMemo(() => {
    if (!lot) {
      return null;
    }

    const viewProps = {
      key: lot.id,
      id,
      auction,
      isAbmInventory,
      lot,
      customer,
      setCustomer,
      isLotSold,
      isMembershipPromoShown,
      isClearvinBannerShown,
      userCountryIso2,
      isVehicleCalculatorShown,
      isShippingPromoShown,
      isFAQShown,
      ymmSearchLink,
      onContentLoad,
    };

    if (isThreeColumns) {
      return <View3Columns {...viewProps} />;
    }

    if (isOneColumns) {
      return <View1Columns {...viewProps} />;
    }

    return <View2Columns {...viewProps} />;
  }, [lot, seo, ymmSearchLink, customer, isThreeColumns, isOneColumns]);

  if (!lot) {
    return null;
  }

  return (
    <div className={classes.root} id="root-lot-page" data-hidden-seo="true">
      <SchemaJsonLdBlock lot={lot} />
      <Meta lot={lot} seo={seo} />

      <WatchlistProvider>
        <LotHeader
          className={classnames(noData && (showLoader ? classes.headerLoader : classes.placeholder))}
          lot={lot}
          locale={locale}
          seo={seo}
          auction={auction}
          isInventory={isAbmInventory}
          isNpa={isNpa}
        />
      </WatchlistProvider>

      <div className={classnames(noData && (showLoader ? classes.bodyLoader : classes.placeholder))}>
        {isAuthenticated && (
          <Suspense fallback={null}>
            <ShippingPromotionBanners isAuthenticated={isAuthenticated} />
          </Suspense>
        )}

        {isAuthenticated && bidStatus === LotStatusStates.WON && (
          <Suspense fallback={null}>
            <ContainerFullScreen>
              <FacebookFeedbackBanner className={classes.facebookBanner} />
            </ContainerFullScreen>
          </Suspense>
        )}

        <ContainerFullScreen className={classnames(classes.offsetTop, classes.contentContainer)}>
          {grid}

          {!isAuthenticated && <SeoContent lot={lot} seo={seo} className={classes.offsetTop} />}
          {isAuthenticated && isOneColumns && (
            <Suspense fallback={null}>
              <MobileToolbar lot={lot} bidStatus={bidStatus} isHidden={isLotSold || isLotWon} />
            </Suspense>
          )}
        </ContainerFullScreen>
      </div>

      {!isAuthenticated && (
        <Suspense fallback={null}>
          <ExitModal lot={lot} ymmSearchLink={ymmSearchLink} />
        </Suspense>
      )}
    </div>
  );
}

LotViewPage.preload = preload;
LotViewPage.prefetch = prefetch;

export default LotViewPage;
