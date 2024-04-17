/* eslint-disable react/prop-types */
import React from 'react';
import ButtonLink from 'frontend/js/components/ButtonLink';
import LocationPopper from 'frontend/js/views/Shared/LocationPopper';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';

function Location({ lot }) {
  if (!lot.location) {
    return null;
  }

  function handleClick() {
    const ga = new GoogleAnalyticsService();
    ga.sendEvent('sale_information', 'won_lots_page', 'location');
  }

  return (
    <LocationPopper
      trigger={<ButtonLink label={lot.location.name} isDashed onClick={handleClick} />}
      id={lot.location.id}
      date={DateTimeService.parseDateInLocalTimezone(lot.saleDate)}
      name={lot.location.name}
      auction={lot.inventoryAuction}
      defaultLane={lot.lane}
    />
  );
}

export default Location;
