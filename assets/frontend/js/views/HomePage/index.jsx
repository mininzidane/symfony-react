import React, { Suspense } from 'react';
import CountryService from 'frontend/js/api/CountryService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import NumberService from 'frontend/js/lib/utils/NumberService/index';
import HiddenFooterFallback from 'frontend/js/components/Suspense/HiddenFooterFallback';

import DelayedLoadService from 'frontend/js/api/DelayedLoadService';
import FinderForm from './FinderForm';

const PopularVehicles = React.lazy(() => import('frontend/js/views/Shared/PageSections/PopularVehicles'));
const Reviews = React.lazy(() => import('frontend/js/views/Shared/PageSections/Reviews'));
const Registration = React.lazy(() => import('./Registration'));
const InventoryList = React.lazy(() => import('./InventoryList'));
const InfoBlock = React.lazy(() => import('./InfoBlock'));
const IntlHomePage = React.lazy(() => import('./intlHomePage'));
const SchemaSearchBlock = React.lazy(() => import('./SchemaSearchBlock'));

function HomePage() {
  const isIntlPage = !CountryService.isUsa();
  const lotsCount = BootstrapService.getAppValue('totalLots', '').toString();
  const formattedCount = NumberService.formatNumber(lotsCount);
  const count = isIntlPage ? formattedCount.replace(',', ' ') : formattedCount;

  return (
    <>
      <FinderForm lotsCount={count} isIntlPage={isIntlPage} />

      <Suspense
        fallback={
          <HiddenFooterFallback
            onUnmount={() => {
              DelayedLoadService.done(DelayedLoadService.ACTIONS.MAIN_CONTENT_LOADED);
            }}
          />
        }
      >
        <PopularVehicles isIntlPage={isIntlPage} />
        <InventoryList />
        <Registration lotsCount={count} />

        {isIntlPage ? (
          <IntlHomePage />
        ) : (
          <>
            <Reviews hasViewAllButton hasGoogleAdd fullWidth />
            <InfoBlock />
          </>
        )}
        <SchemaSearchBlock />
      </Suspense>
    </>
  );
}

export default HomePage;
