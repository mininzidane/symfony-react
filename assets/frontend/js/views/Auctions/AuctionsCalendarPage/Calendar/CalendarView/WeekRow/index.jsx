/* eslint-disable react/prop-types */
import React from 'react';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import DateHeader from '../../_Shared/DateHeader';
import TimeHeader from '../../_Shared/TimeHeader';
import Auctions from '../../_Shared/Auctions';
import Time from '../../_Shared/Time';
import useStyles from '../useStylesWeekRow';
import useTimeGroups from './useTimeGroups';

function WeekRow({ auctions, statuses, auctionGroups, dates, todayDate, timeZoneAbbr }) {
  const classes = useStyles();
  const timeGroups = useTimeGroups(auctions, dates);
  if (timeGroups.length === 0) {
    return null;
  }

  return (
    <div className={classes.table}>
      <div className={classes.th}>
        <div className={classes.time}>
          <TimeHeader />
        </div>
        {dates.map((date) => {
          const isToday = todayDate === date;
          return (
            <div key={date} className={isToday ? classes.active : ''}>
              <DateHeader date={date} isToday={isToday} />
            </div>
          );
        })}
      </div>
      {timeGroups.map((time) => (
        <div className={classes.tr} key={time}>
          <div>
            <Time time={time} />
          </div>
          {dates.map((date) => {
            if (!auctions[date] || !auctions[date][time]) {
              return <div key={`${date}${time}`} />;
            }
            const dayAuctions = auctions[date][time];
            return (
              <div key={`${date}${time}`}>
                <Auctions
                  auctions={dayAuctions}
                  statuses={statuses}
                  date={DateTimeService.parseDateInLocalTimezone(date)}
                  auctionGroups={auctionGroups}
                  todayDate={todayDate}
                  timeZoneAbbr={timeZoneAbbr}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default WeekRow;
