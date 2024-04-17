import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import DashboardSvg from 'frontend/images/shared/light-blue-set/ic_dashboard.svg';
import { WatchlistProvider } from 'frontend/js/context/WatchlistContext';
import BuyItNowSquareBanner from 'frontend/js/views/Shared/Banners/BuyItNowSquareBanner';
import GoogleAd from 'frontend/js/components/GoogleAd';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';
import CurrentBids from './CurrentBids';
import Purchases from './Purchases';
import Watchlist from './Watchlist';
import PaymentsDue from './PaymentsDue';
import SavedSearches from './SavedSearches';

function DashboardPage() {
  const classes = useStyles();
  const { isAboveLg } = useBreakpoint();

  return (
    <div>
      <CaptionPanel
        icon={DashboardSvg}
        label={<FormattedMessage id="header.account_menu.dashboard" />}
        isSmall
        fullscreen
      />

      <ContainerFullScreen className={classes.container}>
        <div className={classes.grid}>
          <div className={classes.leftSide}>
            <WatchlistProvider>
              <CurrentBids />
              <Purchases />

              <GoogleAd
                id="div-gpt-ad-1665182489390-0"
                adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
                placement="dashboard-0"
                className={classnames(classes.ad, 'width-xl-728 spacer-xl-90 width-sm-300')}
                withSlot
              />
              <Watchlist />
            </WatchlistProvider>
            <PaymentsDue />
          </div>
          <div>
            <SavedSearches />
            {isAboveLg && (
              <div className={classes.bannerWrap}>
                <BuyItNowSquareBanner />
              </div>
            )}
            <GoogleAd
              id="div-gpt-ad-1665182489390-1"
              adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
              placement="dashboard-1"
              className="width-xl-300 mt-20 mb-20"
              desktopSize={[300, 250]}
              withSlot
            />
          </div>
        </div>
      </ContainerFullScreen>
    </div>
  );
}

export default DashboardPage;
