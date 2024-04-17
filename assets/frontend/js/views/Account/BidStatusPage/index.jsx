import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import RouterService from 'frontend/js/api/RouterService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import { WatchlistProvider } from 'frontend/js/context/WatchlistContext';
import { PreviewModalProvider } from 'frontend/js/context/PreviewModalContext';
import { ViewModeProvider } from 'frontend/js/context/ViewModeContext';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import BidsSvg from 'frontend/images/shared/light-blue-set/ic_bids.svg';
import TabsContainer from 'frontend/js/components/Tabs/TabsContainer';
import TabContent from 'frontend/js/components/Tabs/TabContent';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import SortOptions from 'frontend/js/context/SortContext/Options';
import { SortProvider } from 'frontend/js/context/SortContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import { ContainerIdsProvider } from './Context/ContainerIds';
import { FiltersProvider } from './Shared/_Context/Filters';
import BidStatusTabsToolbar from './Shared/TabsToolbar';
import b2bLotsWonSortOptions from './B2bLotsWon/b2bLotsWonSortOptions';
import LotsWon from './LotsWon';
import LotsLost from './LotsLost';
import CurrentBids from './CurrentBids';
import B2bLotsWon from './B2bLotsWon';
import B2bContainers from './Containers';
import useStyles from './useStyles';

function BidStatusPage() {
  const classes = useStyles();
  const [counts, setCounts] = useState({});
  const { customerParent, isBusinessMembership, isB2BBroker } = useCustomerHelper();
  const isB2BCustomer = isBusinessMembership || customerParent !== null;
  const { tab } = useParams();

  function handleCountUpdate(params) {
    setCounts({ ...counts, ...params });
  }

  function handleTabChange(nextTab) {
    RouterService.customRedirect(RouterService.getRoute('bids', null, false, { tab: nextTab }));
  }

  const currentBidsSortOptions = useMemo(
    () => [
      ...SortOptions.saleDate.slice().reverse(),
      ...SortOptions.year,
      ...SortOptions.id,
      ...SortOptions.location,
      ...SortOptions.saleStatus,
      ...SortOptions.bidStatus,
      ...SortOptions.currentBid,
    ],
    [SortOptions],
  );

  const wonLotsSortOptions = useMemo(
    () => [
      ...SortOptions.saleDate.slice().reverse(),
      ...SortOptions.year,
      ...SortOptions.id,
      ...SortOptions.location,
      ...SortOptions.vehicleStatus,
      ...SortOptions.docType,
      ...SortOptions.shipping,
      ...SortOptions.due,
    ],
    [SortOptions],
  );

  const lostLotsSortOptions = useMemo(
    () => [
      ...SortOptions.saleDate.slice().reverse(),
      ...SortOptions.year,
      ...SortOptions.id,
      ...SortOptions.location,
      ...SortOptions.saleStatus,
      ...SortOptions.bidStatus,
      ...SortOptions.currentBid,
    ],
    [SortOptions],
  );

  return (
    <TabsContainer tab={tab} onChange={handleTabChange}>
      <CaptionPanel
        label={<FormattedMessage id="bidStatusPage.bidStatus" />}
        footer={<BidStatusTabsToolbar counts={counts} />}
        fullscreen
        isUltraWide
        icon={BidsSvg}
      />

      <ContainerFullScreen className={classes.container} isUltraWide>
        <TabContent id="current-bids">
          <FiltersProvider>
            <PaginationProvider>
              <SortProvider options={currentBidsSortOptions}>
                <CurrentBids handleCountUpdate={handleCountUpdate} />
              </SortProvider>
            </PaginationProvider>
          </FiltersProvider>
        </TabContent>

        <TabContent id="lots-won">
          <FiltersProvider>
            <PaginationProvider itemsPerPageOptions={[30, 60, 90]}>
              <SortProvider options={isB2BCustomer ? b2bLotsWonSortOptions : wonLotsSortOptions}>
                {isB2BCustomer ? (
                  <B2bLotsWon handleCountUpdate={handleCountUpdate} />
                ) : (
                  <LotsWon handleCountUpdate={handleCountUpdate} />
                )}
              </SortProvider>
            </PaginationProvider>
          </FiltersProvider>
        </TabContent>

        <TabContent id="lots-lost">
          <PaginationProvider>
            <SortProvider options={lostLotsSortOptions}>
              <LotsLost handleCountUpdate={handleCountUpdate} />
            </SortProvider>
          </PaginationProvider>
        </TabContent>

        {isB2BBroker && (
          <TabContent id="containers">
            <ContainerIdsProvider>
              <PaginationProvider itemsPerPageOptions={[30, 60, 90]}>
                <B2bContainers handleCountUpdate={handleCountUpdate} />
              </PaginationProvider>
            </ContainerIdsProvider>
          </TabContent>
        )}
      </ContainerFullScreen>
    </TabsContainer>
  );
}

export default () => (
  <WatchlistProvider>
    <PreviewModalProvider>
      <ViewModeProvider>
        <BidStatusPage />
      </ViewModeProvider>
    </PreviewModalProvider>
  </WatchlistProvider>
);
