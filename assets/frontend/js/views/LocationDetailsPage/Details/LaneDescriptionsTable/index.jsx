import React from 'react';
import t from 'frontend/js/api/TranslatorService';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';

function LaneDescriptionsTable() {
  return (
    <AdaptiveTable
      isGrayStyle
      isHoverable={false}
      headData={[
        {
          label: t('locationDetailsPage.laneDescriptions.table.head.itemNumbers'),
        },
        {
          label: t('locationDetailsPage.laneDescriptions.table.head.conditions'),
        },
        {
          label: t('locationDetailsPage.laneDescriptions.table.head.lane'),
        },
      ]}
      bodyData={[
        [
          { content: '1 - 500' },
          {
            content: t('locationDetailsPage.laneDescriptions.table.body.run&Drive'),
          },
          { content: 'A' },
        ],
        [
          { content: '501 - 600' },
          {
            content: t('locationDetailsPage.laneDescriptions.table.body.rental'),
          },
          { content: 'A' },
        ],
        [
          { content: '601 - 700' },
          {
            content: t('locationDetailsPage.laneDescriptions.table.body.moto'),
          },
          { content: 'A' },
        ],
        [
          { content: '701 - 800' },
          {
            content: (
              <>
                {t('locationDetailsPage.laneDescriptions.table.body.boats')}/
                {t('locationDetailsPage.laneDescriptions.table.body.jet')}/
                {t('locationDetailsPage.laneDescriptions.table.body.marine')}
              </>
            ),
          },
          { content: 'A' },
        ],
        [
          { content: '801 - 900' },
          { content: t('locationDetailsPage.laneDescriptions.table.body.heavy') },
          { content: 'A' },
        ],
        [
          { content: '901 - 1000' },
          { content: t('locationDetailsPage.laneDescriptions.table.body.recreational') },
          { content: 'A' },
        ],
        [
          { content: '1001 - 1100' },
          { content: t('locationDetailsPage.laneDescriptions.table.body.homeowners') },
          { content: 'A' },
        ],
        [
          { content: '1101 - 2000' },
          { content: t('locationDetailsPage.laneDescriptions.table.body.salvage') },
          { content: 'A' },
        ],
        [
          { content: '2001 - 2500' },
          { content: t('locationDetailsPage.laneDescriptions.table.body.run&Drive') },
          { content: 'B' },
        ],
        [
          { content: '2501 - 3000' },
          { content: t('locationDetailsPage.laneDescriptions.table.body.salvage') },
          { content: 'B' },
        ],
        [
          { content: '3001 - 4000' },
          { content: t('locationDetailsPage.laneDescriptions.table.body.salvage') },
          { content: 'C' },
        ],
        [
          { content: '4001 - 5000' },
          { content: t('locationDetailsPage.laneDescriptions.table.body.salvage') },
          { content: 'D' },
        ],
        [
          { content: '5001 - 6000' },
          { content: t('locationDetailsPage.laneDescriptions.table.body.salvage') },
          { content: 'E' },
        ],
      ]}
    />
  );
}

export default LaneDescriptionsTable;
