/* eslint-disable react/prop-types */
import React, { useMemo, useEffect, useContext } from 'react';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import Pagination from 'frontend/js/components/Pagination';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import VehiclePreviewModal from '../../Shared/VehiclePreviewModal';
import GridView from './GridView';
import TableView from './TableView';

function PageContent({ invoices }) {
  const [{ setPreviewModalLots }] = usePreviewModalContext();
  const [{ addWatchlistEntries }] = useWatchlistContext();
  const { isGridView } = useContext(ViewModeContext);

  const lots = useMemo(
    () =>
      invoices
        ? invoices
            .map(({ lot: lotObject, lotPurchase, shippingOrder }) =>
              !lotObject && !lotPurchase ? shippingOrder?.lot : lotObject,
            )
            .filter(Boolean)
        : [],
    [invoices],
  );

  useEffect(() => {
    setPreviewModalLots(lots);
    addWatchlistEntries(lots);
  }, [lots]);

  return (
    <div>
      {isGridView ? <GridView invoices={invoices} /> : <TableView invoices={invoices} />}
      <Pagination />
      <VehiclePreviewModal lots={lots} />
    </div>
  );
}

export default PageContent;
