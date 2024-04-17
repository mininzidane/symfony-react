/* eslint-disable comma-dangle */
import React from 'react';
import Amount from 'frontend/js/components/Amount';
import { BidStatusCell } from 'frontend/js/components/ThemedTable/CustomCells/BidStatusCell';
import { LocationCell } from 'frontend/js/components/ThemedTable/CustomCells/LocationCell';
import { VehicleCell } from 'frontend/js/components/ThemedTable/CustomCells/VehicleCell';
import {
  VehicleImageCell,
  VehicleImageCellStyles,
} from 'frontend/js/components/ThemedTable/CustomCells/VehicleImageWithPreview';
import { WatchlistCell, WatchlistCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/WatchlistCell';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import { ActionsCell, ActionsCellStyles } from './ActionsCell';

function getRowsArray(lots) {
  return lots.map((lot) => {
    const row = [
      { content: <VehicleImageCell lot={lot} />, ...VehicleImageCellStyles },
      { content: <VehicleCell lot={lot} /> },
      { content: <WatchlistCell lot={lot} />, ...WatchlistCellStyles },
      { content: <LocationCell lot={lot} /> },
      { content: <SaleDate lot={lot} /> },
      { content: <BidStatusCell bidStatus={lot.bidStatus} /> },
      { content: <Amount value={lot.currentBid} hasCurrency /> },
      { content: <ActionsCell lot={lot} />, ...ActionsCellStyles },
    ];

    row.id = lot.id;
    return row;
  });
}

export default getRowsArray;
