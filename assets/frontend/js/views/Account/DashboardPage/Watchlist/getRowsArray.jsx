/* eslint-disable comma-dangle */
import React from 'react';
import { OdometerCell } from 'frontend/js/components/ThemedTable/CustomCells/OdometerCell';
import { DamageCell } from 'frontend/js/components/ThemedTable/CustomCells/DamageCell';
import { LocationCell } from 'frontend/js/components/ThemedTable/CustomCells/LocationCell';
import { VehicleCell } from 'frontend/js/components/ThemedTable/CustomCells/VehicleCell';
import {
  VehicleImageCell,
  VehicleImageCellStyles,
} from 'frontend/js/components/ThemedTable/CustomCells/VehicleImageWithPreview';
import { WatchlistCell, WatchlistCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/WatchlistCell';
import { ActionsCell, ActionsCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/ActionsCell';
import SaleDate from 'frontend/js/views/Shared/SaleDate';

function getRowsArray(lots) {
  return lots.map((lot) => {
    const row = [
      { content: <VehicleImageCell lot={lot} />, ...VehicleImageCellStyles },
      { content: <VehicleCell lot={lot} /> },
      { content: <WatchlistCell lot={lot} />, ...WatchlistCellStyles },
      { content: <LocationCell lot={lot} /> },
      { content: <SaleDate lot={lot} /> },
      { content: <DamageCell lot={lot} /> },
      { content: <OdometerCell lot={lot} /> },
      { content: <ActionsCell lot={lot} />, ...ActionsCellStyles },
    ];

    row.id = lot.id;
    return row;
  });
}

export default getRowsArray;
