import React from 'react';
import LocationPopper from 'frontend/js/views/Shared/LocationPopper';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import ButtonLink from 'frontend/js/components/ButtonLink';

function SaleLocation({ lot }) {
  const googleAnalyticsService = new GoogleAnalyticsService();

  if (!lot.location) {
    return null;
  }

  function handleTriggerClick() {
    googleAnalyticsService.sendEvent('sale_information', 'lot_page', 'location');
  }

  return (
    <LocationPopper
      trigger={
        <ButtonLink label={lot.location.name} style={{ fontWeight: 700 }} isDashed onClick={handleTriggerClick} />
      }
      id={lot.location.id}
      date={DateTimeService.parseDateInLocalTimezone(lot.saleDate)}
      name={lot.location.name}
      auction={lot.inventoryAuction}
      popoverOptions={{ placement: 'bottom-start' }}
      defaultLane={lot.lane}
      isCtaBlockHidden
    />
  );
}

SaleLocation.propTypes = {
  lot: LotShape.isRequired,
};

export default SaleLocation;
