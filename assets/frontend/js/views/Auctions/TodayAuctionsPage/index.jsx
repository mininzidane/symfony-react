import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import RouterService from 'frontend/js/api/RouterService';
import AuctionService from 'frontend/js/api/AuctionService';
import Alert from 'frontend/js/views/Shared/Alert';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import LiveAuctionSvg from 'frontend/images/shared/light-blue-set/ic_live_auction.svg';
import GoogleAd from 'frontend/js/components/GoogleAd';
import HiddenFooterFallback from 'frontend/js/components/Suspense/HiddenFooterFallback';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import ReactService from 'frontend/js/lib/utils/ReactService';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';
import Controls from './Controls';
import useData from './useData';

const Auctions = ReactService.lazyWithPreload(() => import('./Auctions'));

function TodayAuctionsPage({ isAuctionDe }) {
  const { isAuthenticated, membershipType, bidder } = useCustomerHelper();
  const auction = isAuctionDe ? AuctionService.AUCTION_DE : AuctionService.AUCTION_US;
  const [auctions, isLoading] = useData(auction);
  const [sort, setSort] = useState({ field: 'date', order: 'asc' });
  const [query, setQuery] = useState('');

  const noAuctions = !auctions.live.length && !auctions.upcoming.length;
  const showAlert = !isLoading && !noAuctions && isAuthenticated && bidder && !membershipType.liveBidding;

  return (
    <>
      <CaptionPanel
        fullscreen
        icon={LiveAuctionSvg}
        label={<FormattedMessage id="todayAuctions" />}
        extra={
          !noAuctions ? <Controls sort={sort} query={query} onSortChange={setSort} onQueryChange={setQuery} /> : null
        }
      />

      {showAlert && (
        <Alert
          content={
            <FormattedMessage
              id="todayAuctions.alert.body"
              values={{ a: (chunks) => <a href={RouterService.getRoute('membershipPlans')}>{chunks}</a> }}
            />
          }
        />
      )}

      <SuspenseWrap
        fallback={
          <>
            <HiddenFooterFallback
              onUnmount={() => {
                DelayedLoadService.done(DelayedLoadService.ACTIONS.MAIN_CONTENT_LOADED);
              }}
            />

            <div className="pos-r" style={{ minHeight: 300 }}>
              <SpinnerWheel isCentered size={40} thickness={3} />
            </div>
          </>
        }
        isDataReady={!isLoading}
        preload={() => Auctions.silentPreload()}
      >
        <ContainerFullScreen className="pb-50">
          <div className="mt-30">
            <Auctions auctions={auctions} sort={sort} query={query} auction={auction} />
          </div>

          <GoogleAd
            id="div-gpt-ad-1540494791716-0"
            className="width-xl-970 width-md-300 spacer-xl-90 spacer-md-60 mt-20 mb-20"
            placement="faq_about_us_today_auction_pages"
            withSlot
            adUnitPath="/93216436/abm-faq-au-ta"
            desktopSize={[970, 90]}
            breakpoint={991}
            extraTargetingActions={(adSlot) =>
              adSlot.setTargeting('page', ['faq_about_us_today_auction_pages']).setCollapseEmptyDiv(true)
            }
          />
        </ContainerFullScreen>
      </SuspenseWrap>
    </>
  );
}

TodayAuctionsPage.propTypes = {
  isAuctionDe: PropTypes.bool,
};

TodayAuctionsPage.defaultProps = {
  isAuctionDe: false,
};

export default TodayAuctionsPage;
