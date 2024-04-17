/* eslint-disable react/prop-types */
import React from 'react';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import DateHeader from '../../_Shared/DateHeader';
import Auctions from '../../_Shared/Auctions';
import useStyles from '../useStylesWeekRow';

function WeekWithoutTime({ auctions, statuses, auctionGroups, dates, todayDate, timeZoneAbbr }) {
  const classes = useStyles();
  return (
    <div className={classes.table}>
      <div className={classes.th}>
        {dates.map((date) => {
          const isToday = todayDate === DateTimeService.toLocaleDate(date);
          return (
            <div key={date} className={isToday ? classes.active : ''}>
              <DateHeader date={date} isToday={isToday} />
            </div>
          );
        })}
      </div>
      <div className={classes.tr}>
        {dates.map((date) => {
          if (!auctions[date]) {
            return <div key={date} />;
          }
          const dayAuctions = auctions[date];
          return (
            <div key={date}>
              <Auctions
                auctions={dayAuctions}
                statuses={statuses}
                date={DateTimeService.parseDateInLocalTimezone(date)}
                auctionGroups={auctionGroups}
                todayDate={todayDate}
                timeZoneAbbr={timeZoneAbbr}
                hasTime
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeekWithoutTime;
