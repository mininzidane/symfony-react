/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { FormattedMessage } from 'react-intl-phraseapp';
import ThemedTable from 'frontend/js/components/ThemedTable';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import SortContext from 'frontend/js/context/SortContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import getRowsArray from './getRowsArray';
import useStyles from './useStyles';

function TableView({ invoices, noteStats, isNoteStatsLoading }) {
  const classes = useStyles({ headerOffset: 0 });
  const { sortOptions, sort, setSort } = useContext(SortContext);
  const { brokerDisplayOnlyLotPurchase } = useCustomerHelper();

  const rowsArray = useMemo(
    () => getRowsArray(invoices, brokerDisplayOnlyLotPurchase, noteStats, isNoteStatsLoading),
    [invoices, brokerDisplayOnlyLotPurchase, noteStats, isNoteStatsLoading],
  );

  return (
    <div id="purchases-table">
      <ScrollContainer hideScrollbars={false} ignoreElements=".no-drag">
        <ThemedTable
          className={classes.table}
          headData={[
            {
              label: (
                <TableHeadControl
                  id="shared.label.buyerName"
                  sortField="buyer_name"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.purchaseDate"
                  sortField="sale_date"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl id="shared.label.photo" sort={sort} setSort={setSort} sortOptions={sortOptions} />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.vehicle"
                  sortField="vehicle"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: <FormattedMessage id="shared.label.lotId" />,
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.vin"
                  sortField="vin"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.vehicleType"
                  sortField="vehicle_type"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.auctionName"
                  sortField="auction_name"
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
                  sortField="location_state"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.USPort"
                  sortField="port_of_loading"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.portOfDestination"
                  sortField="port_of_destination"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.pickUpDate"
                  sortField="pick_up_date"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.deliveredToWarehouse"
                  sortField="at_warehouse_date"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.titleStatus"
                  sortField="title_status"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.titleAtWarehouse"
                  sortField="title_at_warehouse"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: <FormattedMessage id="shared.label.shippingDocs" />,
            },
            {
              label: (
                <TableHeadControl
                  id="lotPage.details.keys"
                  sortField="keys"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: <FormattedMessage id="shared.label.notes" />,
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.departureFromUS"
                  sortField="departure_date"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.estDeliveryDate"
                  sortField="est_delivery_date"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="trackingPage.trackingInformation.booking"
                  sortField="booking_id"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="trackingPage.trackingInformation.container"
                  sortField="container_id"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.bidAmount"
                  sortField="bid_amount"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.fee.auctionFees"
                  sortField="auction_fees"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="vehicleCalculator.brokerFee"
                  sortField="transaction_fee"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.label.docFee"
                  sortField="documentation_fee"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            {
              label: (
                <TableHeadControl
                  id="shared.fee.storageFee"
                  sortField="storage_fee"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
            ...(!brokerDisplayOnlyLotPurchase
              ? [
                  {
                    label: (
                      <TableHeadControl
                        id="shared.label.groundShipping"
                        sortField="ground_shipping"
                        sort={sort}
                        setSort={setSort}
                        sortOptions={sortOptions}
                      />
                    ),
                  },
                  {
                    label: (
                      <TableHeadControl
                        id="shared.label.oceanShipping"
                        sortField="ocean_shipping"
                        sort={sort}
                        setSort={setSort}
                        sortOptions={sortOptions}
                      />
                    ),
                  },
                  {
                    label: (
                      <TableHeadControl
                        id="shared.label.paidAmount"
                        sortField="amount_applied"
                        sort={sort}
                        setSort={setSort}
                        sortOptions={sortOptions}
                      />
                    ),
                  },
                  {
                    label: (
                      <TableHeadControl
                        id="lotsWonPage.shippingDue"
                        sortField="shipping_due"
                        sort={sort}
                        setSort={setSort}
                        sortOptions={sortOptions}
                      />
                    ),
                  },
                ]
              : []),
            {
              label: (
                <TableHeadControl
                  id="shared.label.purchaseDue"
                  sortField="purchase_due"
                  sort={sort}
                  setSort={setSort}
                  sortOptions={sortOptions}
                />
              ),
            },
          ].filter(Boolean)}
          bodyData={rowsArray}
        />
      </ScrollContainer>
    </div>
  );
}

export default TableView;
