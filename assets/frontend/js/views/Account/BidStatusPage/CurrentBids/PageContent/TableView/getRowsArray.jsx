/* eslint-disable comma-dangle */
import React from 'react';
import { BidStatusCell } from 'frontend/js/components/ThemedTable/CustomCells/BidStatusCell';
import { SaleStatusCell } from 'frontend/js/components/ThemedTable/CustomCells/SaleStatusCell';
import { LocationCell } from 'frontend/js/components/ThemedTable/CustomCells/LocationCell';
import { VehicleCell } from 'frontend/js/components/ThemedTable/CustomCells/VehicleCell';
import { WatchlistCell, WatchlistCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/WatchlistCell';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import AmountCell from './AmountCell';
import { ActionsCell, ActionsCellStyles } from './ActionsCell';
import PhotoCell from './PhotoCell';

function getRowsArray(lots) {
  const { isB2BBroker } = useCustomerHelper();

  return lots.map((lot) => {
    const row = [
      { content: <PhotoCell lot={lot} />, style: { padding: 0 } },
      { content: <VehicleCell lot={lot} /> },
      { content: <WatchlistCell lot={lot} />, ...WatchlistCellStyles },
      { content: <LocationCell lot={lot} /> },
      { content: <SaleDate lot={lot} /> },
      { content: <SaleStatusCell lot={lot} /> },
      { content: <BidStatusCell bidStatus={lot.bidStatus} /> },
      { content: <AmountCell value={lot.currentBid} bidStatus={lot.bidStatus} /> },
      { content: <ActionsCell lot={lot} hasMaxBid />, ...ActionsCellStyles },
    ];

    if (isB2BBroker) {
      row.unshift({ content: lot?.currentCustomerBid?.bidderName });
    }

    row.id = lot.id;
    return row;
  });
}

export default getRowsArray;
