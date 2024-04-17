import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import AuctionService from 'frontend/js/api/AuctionService';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import ContainerNegative from 'frontend/js/components/ContainerNegative';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import useScript from 'frontend/js/hooks/useScript';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Alert from './Alert';
import useStyles from './useStyles';

const BlockersModal = React.lazy(() => import('./Modals/Blockers'));
const HowToBidModal = React.lazy(() => import('./Modals/HowToBid'));

const LOCAL_STORAGE_KEY = 'Abm::isLiveAuctionGuideAccepted';

function JoinAuctionsPage({ isAuctionDe }) {
  useStyles();
  const { isAuthenticated } = useCustomerHelper();
  const query = RouterService.getCurrentQueryParams();
  const { isAboveSm } = useBreakpoint();
  query.auction = isAuctionDe ? AuctionService.AUCTION_DE : AuctionService.AUCTION_US;
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery(['auction dashboard', query], () => AuctionService.getAuctionDashboard(query), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
  const { liveAuctionEndpoint, auctionUrl, location, blockers } = data;

  const guideAccepted = Boolean(LocalStorageService.get(LOCAL_STORAGE_KEY));
  const [isLiveAuctionGuideAccepted, setIsLiveAuctionGuideAccepted] = useState(guideAccepted);

  useScript(liveAuctionEndpoint ? `${liveAuctionEndpoint}auto-height.js` : null);

  const showBlockers = blockers && blockers.trigger;
  const showHowToBid = !isLiveAuctionGuideAccepted && !isLoading && isAuthenticated && !showBlockers;
  const showLiveAuctionsIframe = auctionUrl && !showBlockers && !showHowToBid;

  async function handleBlockersSubmitSuccess() {
    await refetch();
  }

  function handleHowToBidSubmitSuccess() {
    setIsLiveAuctionGuideAccepted(true);
    LocalStorageService.set(LOCAL_STORAGE_KEY, true);
  }

  return (
    <>
      {isAboveSm && !isLoading && <Alert location={location} />}

      <ContainerFullScreen className="pb-50 md-pb-30 sm-pb-0 pt-10 sm-pt-0" style={{ minHeight: 500 }}>
        <ContainerNegative>
          {showLiveAuctionsIframe && (
            <div className="js-track-event" data-step="abm_live_auctions" data-substep="auctions_today_block_click">
              <iframe
                title="Live Auctions"
                src={auctionUrl}
                id="iAuction5"
                align="middle"
                height="700px"
                width="100%"
                scrolling="no"
                style={{ width: '100%', overflow: 'auto' }}
              />
            </div>
          )}
        </ContainerNegative>
      </ContainerFullScreen>

      {showBlockers && (
        <SuspenseWrap fallback={null} init={showBlockers}>
          <BlockersModal blockers={blockers} onSubmitSuccess={handleBlockersSubmitSuccess} />
        </SuspenseWrap>
      )}
      {showHowToBid && (
        <SuspenseWrap fallback={null} init={showHowToBid}>
          <HowToBidModal onSubmitSuccess={handleHowToBidSubmitSuccess} />
        </SuspenseWrap>
      )}
    </>
  );
}

JoinAuctionsPage.propTypes = {
  isAuctionDe: PropTypes.bool,
};

JoinAuctionsPage.defaultProps = {
  isAuctionDe: false,
};

export default JoinAuctionsPage;
