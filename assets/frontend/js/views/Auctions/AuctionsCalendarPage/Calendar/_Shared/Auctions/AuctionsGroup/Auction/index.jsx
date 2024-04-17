/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import LocationPopper from 'frontend/js/views/Shared/LocationPopper';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function Auction({ data, disabled, classes, status, statuses, timeZoneAbbr, hasTime }) {
  const auction = (
    <div className={classNames(classes.auction, !disabled && classes.hoverable)}>
      <div className={classes.auctionName}>{data.location.name}</div>
      {hasTime && (
        <div className={classes.time}>
          {DateTimeService.toLocaleTime(data.startedAt, {
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: undefined,
          })}{' '}
          {timeZoneAbbr}
        </div>
      )}
      {status !== statuses.upcoming && <div className={classes.dot2} />}
    </div>
  );

  if (disabled) {
    return auction;
  }

  return (
    <LocationPopper
      date={DateTimeService.parseDateInLocalTimezone(data.startedAt)}
      id={data.location?.sourceId}
      name={data.location?.name}
      auction={data.inventoryAuction}
      trigger={auction}
      keepMounted={false}
    />
  );
}

export default Auction;
