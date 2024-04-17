/* eslint-disable comma-dangle */
import React from 'react';
import BootstrapService from 'frontend/js/api/BootstrapService';
import GoogleAd from 'frontend/js/components/GoogleAd';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import LotService from 'frontend/js/api/LotService';
import { OdometerCell } from 'frontend/js/components/ThemedTable/CustomCells/OdometerCell';
import { WatchlistCell, WatchlistCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/WatchlistCell';
import { ActionsCell, ActionsCellStyles } from 'frontend/js/components/ThemedTable/CustomCells/ActionsCell';
import { DamageCell } from 'frontend/js/components/ThemedTable/CustomCells/DamageCell';
import { EstRetailValue } from 'frontend/js/components/ThemedTable/CustomCells/EstRetailValue';
import {
  VehicleImageCell,
  VehicleImageCellStyles,
} from 'frontend/js/components/ThemedTable/CustomCells/VehicleImageWithPreview';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import SchemaEventJsonLdBlock from '../../SchemaEventJsonLdBlock';

function getRowsArray({ lots, lastVisitedLotId, hasOnlyAbmInventoryItems }) {
  const eventTrackingService = new EventTrackingService();
  const EMPTY_VALUE = '—';

  function handleBidNowClick() {
    eventTrackingService.sendEvent({ step: 'abm_carfinder_filters', substep: 'bidnow_button' });
  }

  function handleBuyItNowClick() {
    eventTrackingService.sendEvent({ step: 'abm_carfinder_filters', substep: 'buyitnow_button' });
  }

  function handleJoinAuctionClick() {
    eventTrackingService.sendEvent({ step: 'abm_carfinder_filters', substep: 'joinauction_button' });
  }

  function handleSoldViewDetailsClick() {
    eventTrackingService.sendEvent({ step: 'abm_carfinder_filters', substep: 'choose_car_on' });
  }

  const rows = lots.map((lot) => {
    const { year, make, model, id, locationName, title, item, itemId, inventoryAuction } = lot;
    const lotTitle = title && title.name;
    const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;

    const row = [
      { content: <VehicleImageCell lot={lot} />, ...VehicleImageCellStyles },
      {
        content: (
          <>
            <WatchlistCell lot={lot} />
            <SchemaEventJsonLdBlock lot={lot} />
          </>
        ),
        ...WatchlistCellStyles,
      },
      { content: <strong className="ws-n">{year}</strong> },
      { content: <strong>{make}</strong> },
      { content: <strong>{model}</strong> },
      { content: <OdometerCell lot={lot} /> },
      { content: lotTitle || EMPTY_VALUE },
      { content: <DamageCell lot={lot} /> },
      {
        content: (
          <ActionsCell
            lot={lot}
            onBidNowClick={handleBidNowClick}
            onBuyItNowClick={handleBuyItNowClick}
            onJoinAuctionClick={handleJoinAuctionClick}
            onSoldViewDetailsClick={handleSoldViewDetailsClick}
            isAbmInventory={isAbmInventory}
          />
        ),
        ...ActionsCellStyles,
      },
    ];

    if (!hasOnlyAbmInventoryItems) {
      row.splice(
        5,
        0,
        ...(isAbmInventory
          ? [{}, {}, {}]
          : [
              { content: item || EMPTY_VALUE },
              {
                content: (
                  <>
                    {locationName || EMPTY_VALUE}
                    <div style={{ marginTop: 5 }} />
                    {`${lot.lane || EMPTY_VALUE} / ${lot.gridRow || EMPTY_VALUE}`}
                    {itemId && (
                      <div style={{ fontWeight: 700, marginTop: 5 }}>
                        <FormattedMessage id="shared.label.itemNumber" />: {itemId}
                      </div>
                    )}
                  </>
                ),
              },
              { content: <SaleDate lot={lot} hasWrapper={false} />, style: { width: 160 } },
            ]),
      );

      row.splice(8, 0, isAbmInventory ? {} : { content: <EstRetailValue lot={lot} /> });
    }

    row.id = id;

    if (lastVisitedLotId === id) {
      row.className = 'is-highlighted';
    }

    return row;
  });

  const rowsWithAds = [];
  const hasGoogleAdsEnabled =
    BootstrapService.isFeatureEnabled(BootstrapService.FEATURE.GOOGLEADS) ||
    BootstrapService.isAdEnabled('srp_results_list');

  rows.forEach((item, index) => {
    // Add ads block every 5 items
    if (index !== 0 && index % 5 === 0 && hasGoogleAdsEnabled) {
      const row = [
        {
          content: (
            <GoogleAd
              id={`div-gpt-ad-1657811664105-${index}`}
              className="width-xl-728 width-sm-300"
              adUnitPath="/93216436/Search-Page-728x90-300x50"
              targetsArray={['page_spot', ['bottom_1']]}
              pubTargetsArray={['page', ['main_page']]}
              placement="srp_results_list"
              withSlot
            />
          ),
          colSpan: 12,
        },
      ];
      row.id = `${index}-ads`;
      rowsWithAds.push(row);
    }

    rowsWithAds.push(item);
  });

  return rowsWithAds;
}

export default getRowsArray;
