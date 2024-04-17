/* eslint-disable comma-dangle */
import React from 'react';
import Amount from 'frontend/js/components/Amount';
import { ShowSimilarCell, ShowSimilarCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/ShowSimilarCell';
import { BidStatusCell } from 'frontend/js/components/ThemedTable/CustomCells/BidStatusCell';
import { SaleStatusCell } from 'frontend/js/components/ThemedTable/CustomCells/SaleStatusCell';
import { LocationCell } from 'frontend/js/components/ThemedTable/CustomCells/LocationCell';
import { VehicleCell } from 'frontend/js/components/ThemedTable/CustomCells/VehicleCell';
import {
  VehicleImageCell,
  VehicleImageCellStyles,
} from 'frontend/js/components/ThemedTable/CustomCells/VehicleImageWithPreview';
import { WatchlistCell, WatchlistCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/WatchlistCell';
import SaleDate from 'frontend/js/views/Shared/SaleDate';

function getRowsArray(lots) {
  return lots.map((lot) => {
    const row = [
      { content: <VehicleImageCell lot={lot} />, ...VehicleImageCellStyles },
      { content: <VehicleCell lot={lot} /> },
      { content: <WatchlistCell lot={lot} />, ...WatchlistCellStyles },
      { content: <LocationCell lot={lot} /> },
      { content: <SaleDate lot={lot} /> },
      { content: <SaleStatusCell lot={lot} /> },
      { content: <BidStatusCell bidStatus={lot.bidStatus} /> },
      { content: <Amount value={lot.currentBid} hasCurrency /> },
      { content: <ShowSimilarCell lot={lot} />, ...ShowSimilarCellStyles },
    ];

    row.id = lot.id;
    return row;
  });
}

export default getRowsArray;
