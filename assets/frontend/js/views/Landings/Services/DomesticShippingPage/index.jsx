import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import BreadcrumbsPanel from 'frontend/js/views/Shared/PageSections/BreadcrumbsPanel';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Hero from './Hero';
import Benefits from './Benefits';
import Delivery from './Delivery';
import ShippingInformation from './ShippingInformation';

function DomesticShippingPage() {
  const intl = useIntl();
  const { isAboveSm } = useBreakpoint();

  return (
    <>
      {isAboveSm && (
        <BreadcrumbsPanel crumbs={[{ label: intl.formatMessage({ id: 'domesticShippingPage.domesticShipping' }) }]} />
      )}
      <Hero />
      <Benefits />
      <Delivery />
      <ShippingInformation />
    </>
  );
}

export default DomesticShippingPage;
