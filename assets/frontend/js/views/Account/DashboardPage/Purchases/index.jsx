import React, { useState, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import ThemedTable from 'frontend/js/components/ThemedTable';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import ExpandButton from 'frontend/js/components/ThemedTable/ExpandButton';
import ContainerNegative from 'frontend/js/components/ContainerNegative';
import VehicleCompactCard from 'frontend/js/views/Shared/VehicleCompactCard';
import BidsSvg from 'frontend/images/shared/light-blue-set/ic_bids.svg';
import { PreviewModalProvider } from 'frontend/js/context/PreviewModalContext';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import { LotWonContextProvider } from 'frontend/js/context/LotWonContext';
import SortOptions from 'frontend/js/context/SortContext/Options';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SectionTitle from '../SectionTitle';
import EmptyStateCard from '../EmptyStateCard';
import VehiclePreviewModal from '../VehiclePreviewModal';
import MobileViewAllButton from '../MobileViewAllButton';
import LoadingState from './LoadingState';
import getRowsArray from './getRowsArray';
import usePurchases from './usePurchases';
import MobileFooter from './MobileFooter';
import useStyles from './useStyles';

function Purchases() {
  const SORT_OPTIONS = useMemo(
    () => [
      ...SortOptions.saleDate.slice().reverse(),
      ...SortOptions.year,
      ...SortOptions.id,
      ...SortOptions.location,
      ...SortOptions.vehicleStatus,
      ...SortOptions.shipping,
    ],
    [SortOptions],
  );

  const classes = useStyles();
  const { isAboveSm, isBelowSm } = useBreakpoint();
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [size, setSize] = useState(5);
  const { loading, isInitialLoad, invoices, lots, total = 0 } = usePurchases({ sort, size });
  const [{ addWatchlistEntries }] = useWatchlistContext();
  const rowsArray = getRowsArray(invoices);

  useEffect(() => {
    addWatchlistEntries(lots);
  }, [lots]);

  return (
    <PreviewModalProvider>
      <div>
        <SectionTitle
          text={
            <>
              <FormattedMessage id="transactionsPage.purchases" /> {!isInitialLoad && `(${total})`}
              {isBelowSm && total > invoices.length && !isInitialLoad && (
                <MobileViewAllButton onClick={() => setSize(total)} isLoading={loading} />
              )}
            </>
          }
        />

        {isInitialLoad && <LoadingState />}

        {!isInitialLoad && (
          <>
            {total ? (
              <>
                {isAboveSm ? (
                  <>
                    <ThemedTable
                      className={classes.table}
                      hasHoverEffect
                      headData={[
                        { label: <FormattedMessage id="shared.label.image" /> },
                        {
                          label: (
                            <TableHeadControl
                              id="shared.label.vehicle"
                              sortField="year"
                              sort={sort}
                              setSort={setSort}
                              sortOptions={SORT_OPTIONS}
                            />
                          ),
                        },
                        {
                          label: <FormattedMessage id="shared.label.lotId" />,
                        },
                        {
                          label: (
                            <TableHeadControl
                              id="shared.label.location"
                              sortField="location"
                              sort={sort}
                              setSort={setSort}
                              sortOptions={SORT_OPTIONS}
                            />
                          ),
                        },
                        {
                          label: (
                            <TableHeadControl
                              id="shared.label.saleDate"
                              sortField="sale_date"
                              sort={sort}
                              setSort={setSort}
                              sortOptions={SORT_OPTIONS}
                            />
                          ),
                        },
                        {
                          label: (
                            <TableHeadControl
                              id="shared.label.status"
                              sortField="vehicle_status"
                              sort={sort}
                              setSort={setSort}
                              sortOptions={SORT_OPTIONS}
                            />
                          ),
                        },
                        {
                          label: (
                            <TableHeadControl
                              id="header.main_menu.shipping"
                              sortField="shipping"
                              sort={sort}
                              setSort={setSort}
                              sortOptions={SORT_OPTIONS}
                            />
                          ),
                        },
                        {
                          label: <FormattedMessage id="shared.label.action" />,
                        },
                      ]}
                      bodyData={rowsArray}
                    />
                    {total > invoices.length && (
                      <ExpandButton
                        onClick={() => setSize(total)}
                        isLoading={loading}
                        label={
                          <>
                            <FormattedMessage id="homePage.reviews.viewAll" /> ({total})
                          </>
                        }
                      />
                    )}
                  </>
                ) : (
                  <ContainerNegative>
                    {invoices.map((invoice) => (
                      <LotWonContextProvider invoice={invoice} key={invoice.token}>
                        <VehicleCompactCard
                          lot={invoice.lot}
                          lotPurchase={invoice.lotPurchase}
                          hasShipping
                          customFooter={<MobileFooter />}
                        />
                      </LotWonContextProvider>
                    ))}
                  </ContainerNegative>
                )}

                <VehiclePreviewModal lots={lots} />
              </>
            ) : (
              <EmptyStateCard
                icon={<img src={BidsSvg} alt="Purchases" />}
                message={
                  <FormattedMessage
                    id="dashboardPage.currentBid.empty"
                    values={{ a: (chunks) => <a href={RouterService.getRoute('searchResults')}>{chunks}</a> }}
                  />
                }
              />
            )}
          </>
        )}
      </div>
    </PreviewModalProvider>
  );
}

export default Purchases;
