/* eslint-disable react/prop-types */
import React from 'react';
import ButtonLink from 'frontend/js/components/ButtonLink';
import LocationPopper from 'frontend/js/views/Shared/LocationPopper';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function Location({ lot }) {
  if (!lot.location) {
    return null;
  }

  return (
    <LocationPopper
      trigger={<ButtonLink label={lot.location.name} isDashed style={{ textAlign: 'right' }} />}
      id={lot.location.id}
      date={DateTimeService.parseDateInLocalTimezone(lot.saleDate)}
      name={lot.location.name}
      auction={lot.inventoryAuction}
      defaultLane={lot.lane}
      isCtaBlockHidden
    />
  );
}

export default Location;
