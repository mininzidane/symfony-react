import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import BreadcrumbsPanel from 'frontend/js/views/Shared/PageSections/BreadcrumbsPanel';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Hero from './Hero';
import Advantages from './Advantages';
import LogisticMap from './LogisticMap';
import ShippingInformation from './ShippingInformation';
import PortsTable from './PortsTable';

function InternationalAutoShippingPage() {
  const intl = useIntl();
  const { isAboveSm } = useBreakpoint();

  return (
    <>
      {isAboveSm && (
        <BreadcrumbsPanel crumbs={[{ label: intl.formatMessage({ id: 'shipping.internationalShipping' }) }]} />
      )}
      <Hero />
      <Advantages />
      <LogisticMap />
      <ShippingInformation />
      <PortsTable />
    </>
  );
}

export default InternationalAutoShippingPage;
