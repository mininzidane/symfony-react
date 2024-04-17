/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ThemedTable from 'frontend/js/components/ThemedTable';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import ContainerNegative from 'frontend/js/components/ContainerNegative';
import VehicleCompactCard from 'frontend/js/views/Shared/VehicleCompactCard';
import { PreviewModalProvider } from 'frontend/js/context/PreviewModalContext';
import SortContext from 'frontend/js/context/SortContext';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import getRowsArray from './getRowsArray';
import useStyles from './useStyles';
import MobileFooter from './MobileFooter';

function TableView({ lots }) {
  const classes = useStyles();
  const { sortOptions, sort, setSort } = useContext(SortContext);
  const { isAboveSm } = useBreakpoint();

  const rowsArray = getRowsArray(lots);

  return (
    <PreviewModalProvider>
      {isAboveSm ? (
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
                  sortOptions={sortOptions}
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
                  sortOptions={sortOptions}
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
                  sortOptions={sortOptions}
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
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.saleStatus"
                  sortField="sale_status"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
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
                  sortOptions={sortOptions}
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
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: <FormattedMessage id="shared.label.action" />,
            },
          ]}
          bodyData={rowsArray}
        />
      ) : (
        <ContainerNegative>
          {lots.map((lot, index) => (
            <VehicleCompactCard lot={lot} key={index} customFooter={<MobileFooter lot={lot} />} />
          ))}
        </ContainerNegative>
      )}
    </PreviewModalProvider>
  );
}

export default TableView;
