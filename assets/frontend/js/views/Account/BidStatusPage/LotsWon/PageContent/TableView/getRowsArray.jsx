/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
import React from 'react';
import { LotWonContextProvider } from 'frontend/js/context/LotWonContext';
import { DocTypeCell } from 'frontend/js/components/ThemedTable/CustomCells/DocTypeCell';
import { LocationCell } from 'frontend/js/components/ThemedTable/CustomCells/LocationCell';
import { VehicleCell } from 'frontend/js/components/ThemedTable/CustomCells/VehicleCell';
import { BrokerCell, BrokerCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/BrokerCell';
import {
  VehicleImageCell,
  VehicleImageCellStyles,
} from 'frontend/js/components/ThemedTable/CustomCells/VehicleImageWithPreview';
import { WatchlistCell, WatchlistCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/WatchlistCell';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import {
  SaleDate,
  StatusCell,
  ShippingCell,
  ActionsCell,
  ActionsCellStyles,
} from 'frontend/js/components/ThemedTable/LotsWonCells';

function getRowsArray(invoices) {
  const { isB2BBroker } = useCustomerHelper();

  return invoices.map((invoice) => {
    const { lot: lotObject, lotPurchase, shippingOrder, auction } = invoice;
    const lot = !lotObject && !lotPurchase ? { ...shippingOrder?.lot, inventoryAuction: auction } : lotObject;

    const row = [
      isB2BBroker
        ? { content: <BrokerCell lotPurchase={lotPurchase} />, ...BrokerCellStyles }
        : { content: <VehicleImageCell lot={lot} />, ...VehicleImageCellStyles },
      { content: <VehicleCell lot={lot} lotPurchase={lotPurchase} /> },
      { content: <LocationCell lot={lot} /> },
      { content: <SaleDate lotPurchase={lotPurchase} /> },
      { content: <DocTypeCell lotPurchase={lotPurchase} /> },
      { content: <StatusCell hasTrackMyOrderButton /> },
      { content: <ShippingCell hasShippingActions /> },
      { content: <ActionsCell hasTotalAmountDue />, ...ActionsCellStyles },
    ];

    if (!isB2BBroker) {
      row.splice(2, 0, { content: <WatchlistCell lot={lot} lotPurchase={lotPurchase} />, ...WatchlistCellStyles });
    }

    row.id = invoice.token;
    row.wrapperProps = { invoice };
    row.wrapper = LotWonContextProvider;
    return row;
  });
}

export default getRowsArray;
