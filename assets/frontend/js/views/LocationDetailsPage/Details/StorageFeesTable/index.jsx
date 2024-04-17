import React from 'react';
import t from 'frontend/js/api/TranslatorService';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';
import Amount from 'frontend/js/components/Amount';

function StorageFeesTable() {
  const free = t('shared.label.free').toUpperCase();
  const dayOfSale = t('locationDetailsPage.storageFeesTable.dayOfSale');

  function amount(v) {
    return <Amount value={v} fontWeight={400} fontSize={16} />;
  }

  return (
    <AdaptiveTable
      isGrayStyle
      isHoverable={false}
      headData={[
        {
          label: t('locationDetailsPage.storageFeesTable.head.day'),
        },
        {
          label: t('locationDetailsPage.storageFeesTable.head.onlineBids'),
        },
        {
          label: t('locationDetailsPage.storageFeesTable.head.kiosk'),
        },
      ]}
      bodyData={[
        [{ content: `1 (${dayOfSale})` }, { content: free }, { content: free }],
        [{ content: '2' }, { content: free }, { content: free }],
        [{ content: '3' }, { content: free }, { content: amount(5) }],
        [{ content: '4' }, { content: amount(5) }, { content: amount(5) }],
        [{ content: '5' }, { content: amount(10) }, { content: amount(10) }],
        [{ content: '6' }, { content: amount(15) }, { content: amount(15) }],
        [{ content: '7' }, { content: amount(20) }, { content: amount(20) }],
        [{ content: '8' }, { content: amount(25) }, { content: amount(25) }],
        [{ content: '9' }, { content: amount(25) }, { content: amount(25) }],
        [{ content: '10+' }, { content: amount(30) }, { content: amount(30) }],
      ]}
    />
  );
}

export default StorageFeesTable;
