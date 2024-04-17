import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useTimeZoneAbbr from 'frontend/js/hooks/useTimeZoneAbbr';
import useGroupByLocalDateTime from '../_Shared/useGroupByLocalDateTime';
import DateHeader from '../_Shared/DateHeader';
import Auctions from '../_Shared/Auctions';
import useStyles from './useStyles';

function CardsView({ calendarDays, statuses, auctions, auctionGroups }) {
  const classes = useStyles();
  const todayDate = DateTimeService.format(new Date(), 'yyyy-MM-dd');
  const groupedAuctions = useGroupByLocalDateTime(auctions, true);
  const timeZoneAbbr = useTimeZoneAbbr();

  return (
    <div className={classes.grid}>
      {calendarDays.map((day) => {
        const date = day.date.split(' ')[0];
        const dayAuctions = groupedAuctions[date];
        if (!dayAuctions) {
          return null;
        }
        const isToday = todayDate === date;
        return (
          <div className={classes.card} key={date}>
            <div className={classnames(classes.header, isToday && classes.active)}>
              <DateHeader date={date} isToday={isToday} />
            </div>
            <div className={classes.content}>
              <Auctions
                key={date}
                auctions={dayAuctions}
                statuses={statuses}
                date={DateTimeService.parseDateInLocalTimezone(date)}
                auctionGroups={auctionGroups}
                todayDate={todayDate}
                timeZoneAbbr={timeZoneAbbr}
                hasTime
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

CardsView.propTypes = {
  calendarDays: PropTypes.array,
  statuses: PropTypes.object,
  auctions: PropTypes.object,
  auctionGroups: PropTypes.array,
};

CardsView.defaultProps = {
  calendarDays: [],
  statuses: [],
  auctions: {},
  auctionGroups: [],
};

export default CardsView;
