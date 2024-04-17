/* eslint-disable react/prop-types */
import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import AuctionsGroup from './AuctionsGroup';
import useStyles from './useStyles';

function Auctions({ date, auctions, statuses, auctionGroups, todayDate, timeZoneAbbr, hasTime }) {
  const intl = useIntl();
  const classes = useStyles();

  const calendarDate = DateTimeService.toLocaleDate(date);

  return (
    <div className={classes.root}>
      <AuctionsGroup
        title={intl.formatMessage({ id: 'auctionsCalendar.auctionsInProgress' })}
        auctions={auctions[statuses.live]}
        auctionGroups={auctionGroups}
        statuses={statuses}
        status={statuses.live}
        timeZoneAbbr={timeZoneAbbr}
        hasTime={hasTime}
      />
      <AuctionsGroup
        title={intl.formatMessage({ id: 'auctionsCalendar.auctionsLaterToday' })}
        auctions={auctions[statuses.later]}
        auctionGroups={auctionGroups}
        statuses={statuses}
        status={statuses.later}
        timeZoneAbbr={timeZoneAbbr}
        hasTime={hasTime}
      />
      {todayDate !== calendarDate && (
        <AuctionsGroup
          auctions={auctions[statuses.upcoming]}
          auctionGroups={auctionGroups}
          statuses={statuses}
          status={statuses.upcoming}
          timeZoneAbbr={timeZoneAbbr}
          hasTime={hasTime}
        />
      )}
      <AuctionsGroup
        title={intl.formatMessage({ id: 'auctionsCalendar.endedAuctions' })}
        auctions={auctions[statuses.ended]}
        auctionGroups={auctionGroups}
        statuses={statuses}
        status={statuses.ended}
        timeZoneAbbr={timeZoneAbbr}
        hasTime={hasTime}
        disabled
      />
    </div>
  );
}

export default Auctions;
