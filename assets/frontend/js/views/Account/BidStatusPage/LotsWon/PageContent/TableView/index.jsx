/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ThemedTable from 'frontend/js/components/ThemedTable';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import ContainerNegative from 'frontend/js/components/ContainerNegative';
import VehicleCompactCard from 'frontend/js/views/Shared/VehicleCompactCard';
import ShippingQuoteContextProvider from 'frontend/js/context/ShippingQuoteContext';
import { PreviewModalProvider } from 'frontend/js/context/PreviewModalContext';
import { LotWonContextProvider } from 'frontend/js/context/LotWonContext';
import SortContext from 'frontend/js/context/SortContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import getRowsArray from './getRowsArray';
import useStyles from './useStyles';
import MobileFooter from './MobileFooter';

function TableView({ invoices }) {
  const { isB2BBroker } = useCustomerHelper();
  const classes = useStyles();
  const { sortOptions, sort, setSort } = useContext(SortContext);
  const { isAboveSm } = useBreakpoint();

  const rowsArray = getRowsArray(invoices);

  const headData = [
    isB2BBroker
      ? { label: <FormattedMessage id="shared.label.bidderName" /> }
      : { label: <FormattedMessage id="shared.label.image" /> },
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
          id="shared.label.status"
          sortField="vehicle_status"
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions}
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
          sortOptions={sortOptions}
        />
      ),
    },
    {
      label: (
        <TableHeadControl
          id="shared.label.due"
          sortField="due"
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions}
        />
      ),
    },
  ];

  if (!isB2BBroker) {
    headData.splice(2, 0, {
      label: <FormattedMessage id="shared.label.lotId" />,
    });
  }

  return (
    <PreviewModalProvider>
      {isAboveSm ? (
        <ThemedTable className={classes.table} hasHoverEffect headData={headData} bodyData={rowsArray} />
      ) : (
        <ContainerNegative className={classes.wrap}>
          {invoices.map((invoice) => {
            const { lot: lotObject, lotPurchase, shippingOrder, auction } = invoice;
            const lot = !lotObject && !lotPurchase ? { ...shippingOrder?.lot, inventoryAuction: auction } : lotObject;
            return (
              <LotWonContextProvider invoice={invoice} key={invoice.token}>
                <ShippingQuoteContextProvider>
                  <VehicleCompactCard
                    lot={lot}
                    lotPurchase={invoice.lotPurchase}
                    hasVin
                    hasOdometer={false}
                    hasDocType
                    hasShipping
                    hasBidderName={isB2BBroker}
                    hasDue
                    customFooter={<MobileFooter />}
                  />
                </ShippingQuoteContextProvider>
              </LotWonContextProvider>
            );
          })}
        </ContainerNegative>
      )}
    </PreviewModalProvider>
  );
}

export default TableView;
