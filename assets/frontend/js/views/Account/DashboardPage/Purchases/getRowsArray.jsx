/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
import React from 'react';
import { LocationCell } from 'frontend/js/components/ThemedTable/CustomCells/LocationCell';
import { VehicleCell } from 'frontend/js/components/ThemedTable/CustomCells/VehicleCell';
import {
  VehicleImageCell,
  VehicleImageCellStyles,
} from 'frontend/js/components/ThemedTable/CustomCells/VehicleImageWithPreview';
import { WatchlistCell, WatchlistCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/WatchlistCell';
import { LotWonContextProvider } from 'frontend/js/context/LotWonContext';
import {
  SaleDate,
  StatusCell,
  ShippingCell,
  ActionsCell,
  ActionsCellStyles,
} from 'frontend/js/components/ThemedTable/LotsWonCells';

function getRowsArray(lots) {
  return lots.map((invoice) => {
    const { lot, lotPurchase } = invoice;
    const row = [
      { content: <VehicleImageCell lot={lot} />, ...VehicleImageCellStyles },
      { content: <VehicleCell lot={lot} lotPurchase={lotPurchase} /> },
      { content: <WatchlistCell lot={lot} lotPurchase={lotPurchase} />, ...WatchlistCellStyles },
      { content: <LocationCell lot={lot} /> },
      { content: <SaleDate lotPurchase={lotPurchase} /> },
      { content: <StatusCell /> },
      { content: <ShippingCell /> },
      { content: <ActionsCell hasShippingActions />, ...ActionsCellStyles },
    ];

    row.id = invoice.token;
    row.wrapperProps = { invoice };
    row.wrapper = LotWonContextProvider;
    return row;
  });
}

export default getRowsArray;
