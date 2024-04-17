import React from 'react';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import { OdometerCell } from 'frontend/js/components/ThemedTable/CustomCells/OdometerCell';
import {
  VehicleImageCell,
  VehicleImageCellStyles,
} from 'frontend/js/components/ThemedTable/CustomCells/VehicleImageWithPreview';
import { WatchlistCell, WatchlistCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/WatchlistCell';
import { ActionsCell, ActionsCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/ActionsCell';
import { DamageCell } from 'frontend/js/components/ThemedTable/CustomCells/DamageCell';
import { VehicleCell } from 'frontend/js/components/ThemedTable/CustomCells/VehicleCell';
import { LocationCell } from 'frontend/js/components/ThemedTable/CustomCells/LocationCell';
import GoogleAd from 'frontend/js/components/GoogleAd';
import ArrayService from 'frontend/js/lib/utils/ArrayService';

function getRowsArray({ lots }) {
  const rows = lots.map((lot) => {
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

  return ArrayService.appendEl(rows, 4, (idx) => [
    {
      content: (
        <GoogleAd
          id={`"div-gpt-ad-1665182489390-${idx}`}
          adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
          placement="watchlist-0"
          className="width-xl-728 spacer-xl-90 width-sm-300"
          withSlot
        />
      ),
      colSpan: 12,
      style: {
        background: 'transparent',
      },
    },
  ]);
}

export default getRowsArray;
