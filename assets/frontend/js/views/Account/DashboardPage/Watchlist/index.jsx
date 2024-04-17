import React, { useState, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import ThemedTable from 'frontend/js/components/ThemedTable';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import ExpandButton from 'frontend/js/components/ThemedTable/ExpandButton';
import ContainerNegative from 'frontend/js/components/ContainerNegative';
import VehicleCompactCard from 'frontend/js/views/Shared/VehicleCompactCard';
import WatchlistSvg from 'frontend/images/shared/light-blue-set/ic_watchlist.svg';
import { PreviewModalProvider } from 'frontend/js/context/PreviewModalContext';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import SortOptions from 'frontend/js/context/SortContext/Options';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SectionTitle from '../SectionTitle';
import EmptyStateCard from '../EmptyStateCard';
import VehiclePreviewModal from '../VehiclePreviewModal';
import MobileViewAllButton from '../MobileViewAllButton';
import LoadingState from './LoadingState';
import getRowsArray from './getRowsArray';
import useWatchlistLots from './useWatchlistLots';
import useStyles from './useStyles';

function Watchlist() {
  const SORT_OPTIONS = useMemo(
    () => [
      ...SortOptions.saleDate.slice().reverse(),
      ...SortOptions.year,
      ...SortOptions.id,
      ...SortOptions.location,
      ...SortOptions.primaryDamage,
      ...SortOptions.mileage,
      ...SortOptions.location,
      ...SortOptions.currentBid,
    ],
    [SortOptions],
  );

  const classes = useStyles();
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [size, setSize] = useState(5);
  const { loading, isInitialLoad, lots, total = 0 } = useWatchlistLots({ sort, size });
  const [{ addWatchlistEntries }] = useWatchlistContext();
  const { isAboveSm } = useBreakpoint();

  const rowsArray = getRowsArray(lots);

  useEffect(() => {
    addWatchlistEntries(lots);
  }, [lots]);

  return (
    <PreviewModalProvider>
      <div>
        <SectionTitle
          text={
            <>
              <FormattedMessage id="shared.label.watchlist" /> {!isInitialLoad && `(${total})`}
              {total > lots.length && !isInitialLoad && (
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
                          label: (
                            <TableHeadControl
                              id="shared.label.lotId"
                              sortField="id"
                              sort={sort}
                              setSort={setSort}
                              sortOptions={SORT_OPTIONS}
                            />
                          ),
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
                              id="shared.label.damage"
                              sortField="primary_damage"
                              sort={sort}
                              setSort={setSort}
                              sortOptions={SORT_OPTIONS}
                            />
                          ),
                        },
                        {
                          label: (
                            <TableHeadControl
                              id="shared.label.odometer"
                              sortField="odometer"
                              sort={sort}
                              setSort={setSort}
                              sortOptions={SORT_OPTIONS}
                            />
                          ),
                        },
                        {
                          label: (
                            <TableHeadControl
                              id="shared.label.currentBid"
                              sortField="high_bid"
                              sort={sort}
                              setSort={setSort}
                              sortOptions={SORT_OPTIONS}
                            />
                          ),
                        },
                      ]}
                      bodyData={rowsArray}
                    />
                    {total > lots.length && (
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
                    {lots.map((lot, index) => (
                      <VehicleCompactCard lot={lot} key={index} />
                    ))}
                  </ContainerNegative>
                )}

                <VehiclePreviewModal lots={lots} />
              </>
            ) : (
              <EmptyStateCard
                icon={<img src={WatchlistSvg} alt="Watchlist" />}
                message={
                  <FormattedMessage
                    id="dashboardPage.watchlist.empty"
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

export default Watchlist;
