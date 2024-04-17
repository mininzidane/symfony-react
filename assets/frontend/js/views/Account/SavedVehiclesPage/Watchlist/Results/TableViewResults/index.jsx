/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import VehicleCompactCard from 'frontend/js/views/Shared/VehicleCompactCard';
import ThemedTable from 'frontend/js/components/ThemedTable';
import { PreviewModalProvider } from 'frontend/js/context/PreviewModalContext';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SortContext from '../../_Context/SortContext';
import VehiclePreviewModal from './VehiclePreviewModal';
import getRowsArray from './getRowsArray';
import useStyles from './useStyles';
import PhotoCell from './PhotoCell';

function TableViewResults({ lots }) {
  const classes = useStyles();
  const { sort, setSort, sortOptions } = useContext(SortContext);
  const { isAboveSm } = useBreakpoint();

  const rowsArray = getRowsArray({ lots });

  return (
    <div className={classes.root}>
      {isAboveSm ? (
        <PreviewModalProvider>
          <ThemedTable
            hasShadow
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
                    id="shared.label.damage"
                    sortField="primary_damage"
                    sort={sort}
                    setSort={setSort}
                    sortOptions={sortOptions}
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
            ]}
            bodyData={rowsArray}
          />

          <VehiclePreviewModal lots={lots} />
        </PreviewModalProvider>
      ) : (
        lots.map((lot, index) => <VehicleCompactCard lot={lot} key={index} imageBlock={<PhotoCell lot={lot} />} />)
      )}
    </div>
  );
}

export default TableViewResults;
