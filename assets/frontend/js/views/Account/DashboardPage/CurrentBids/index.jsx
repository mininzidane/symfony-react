import React, { useState, useMemo } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import ThemedTable from 'frontend/js/components/ThemedTable';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import ExpandButton from 'frontend/js/components/ThemedTable/ExpandButton';
import ContainerNegative from 'frontend/js/components/ContainerNegative';
import VehicleCompactCard from 'frontend/js/views/Shared/VehicleCompactCard';
import BidsSvg from 'frontend/images/shared/light-blue-set/ic_bids.svg';
import { PreviewModalProvider } from 'frontend/js/context/PreviewModalContext';
import SortOptions from 'frontend/js/context/SortContext/Options';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SectionTitle from '../SectionTitle';
import EmptyStateCard from '../EmptyStateCard';
import VehiclePreviewModal from '../VehiclePreviewModal';
import MobileViewAllButton from '../MobileViewAllButton';
import LoadingState from './LoadingState';
import getRowsArray from './getRowsArray';
import useCurrentBids from './useCurrentBids';
import useStyles from './useStyles';
import MobileFooter from './MobileFooter';

function CurrentBids() {
  const SORT_OPTIONS = useMemo(
    () => [
      ...SortOptions.saleDate.slice().reverse(),
      ...SortOptions.year,
      ...SortOptions.id,
      ...SortOptions.location,
      ...SortOptions.bidStatus,
      ...SortOptions.currentBid,
    ],
    [SortOptions],
  );

  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [size, setSize] = useState(5);
  const { loading, isInitialLoad, lots, total = 0 } = useCurrentBids(sort, size);

  const rowsArray = getRowsArray(lots);

  return (
    <PreviewModalProvider>
      <div>
        <SectionTitle
          text={
            <>
              <FormattedMessage id="shared.label.currentBids" /> {!isInitialLoad && `(${total})`}
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
                              id="shared.label.bidStatus"
                              sortField="bid_status"
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
                        {
                          label: <FormattedMessage id="shared.cta.increaseBid" />,
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
                      <VehicleCompactCard lot={lot} key={index} customFooter={<MobileFooter lot={lot} />} />
                    ))}
                  </ContainerNegative>
                )}

                <VehiclePreviewModal lots={lots} />
              </>
            ) : (
              <EmptyStateCard
                icon={<img src={BidsSvg} alt="Current Bids" />}
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

export default CurrentBids;
