/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import ThemedTable from 'frontend/js/components/ThemedTable';
import LotService from 'frontend/js/api/LotService';
import { useDisplaySettingsContext } from 'frontend/js/views/SearchResultsPage/_Context/DisplaySettingsContext';
import getRowsArray from './getRowsArray';
import useStyles from './useStyles';

function DesktopView({ lots, lastVisitedLotId }) {
  const classes = useStyles();
  const [{ sort, setSort, sortOptions }] = useDisplaySettingsContext();
  const hasOnlyAbmInventoryItems = lots.every((lot) => lot.inventoryAuction === LotService.AUCTION_ABM);
  const hasOnlyNpaInventoryItems = lots.every((lot) => lot.inventoryAuction === LotService.AUCTION_NPA);

  const headData = [
    { label: <FormattedMessage id="shared.label.image" />, style: { width: 96 } },
    {
      label: (
        <TableHeadControl
          id="shared.label.lotId"
          sortField="lot_id"
          isNowrap
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions}
        />
      ),
    },
    {
      label: (
        <TableHeadControl
          id="shared.label.year"
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
          id="shared.label.make"
          sortField="make"
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions}
        />
      ),
    },
    {
      label: (
        <TableHeadControl
          id="shared.label.model"
          sortField="model"
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
          sortField="mileage"
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions}
        />
      ),
    },
    {
      label: (
        <TableHeadControl
          id="shared.label.titleCode"
          sortField="doc_type"
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
          sortField="damage"
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
          sortField="current_bid"
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions}
        />
      ),
      style: { width: 190 },
    },
  ];

  if (!hasOnlyAbmInventoryItems) {
    headData.splice(
      5,
      0,
      ...[
        {
          label: (
            <TableHeadControl
              id="shared.label.itemNumber"
              sortField="item"
              isNowrap
              sort={sort}
              setSort={setSort}
              sortOptions={sortOptions}
            />
          ),
        },
        {
          label: (
            <TableHeadControl
              label={
                <>
                  <span>
                    <FormattedMessage id="shared.label.location" />
                  </span>
                  /
                  <wbr />
                  <span>
                    <FormattedMessage id="shared.label.lane" />
                  </span>
                  /
                  <wbr />
                  <span>
                    <FormattedMessage id="shared.label.row" />
                  </span>
                </>
              }
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
      ],
    );

    headData.splice(8, 0, {
      label: (
        <TableHeadControl
          id={hasOnlyNpaInventoryItems ? 'lotPage.details.estimatedValue' : 'lotPage.details.estimatedRetailValue'}
          sortField="est_retail_value"
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions}
        />
      ),
    });
  }

  return (
    <ThemedTable
      className={classnames(classes.root, 'qa_car_list')}
      hasShadow
      headData={headData}
      bodyData={getRowsArray({ lots, lastVisitedLotId, hasOnlyAbmInventoryItems })}
    />
  );
}

export default DesktopView;
