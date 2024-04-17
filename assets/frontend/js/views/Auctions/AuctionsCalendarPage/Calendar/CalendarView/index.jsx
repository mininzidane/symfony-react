import React from 'react';
import PropTypes from 'prop-types';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useTimeZoneAbbr from 'frontend/js/hooks/useTimeZoneAbbr';
import useGroupByLocalDateTime from '../_Shared/useGroupByLocalDateTime';
import WeekRow from './WeekRow';
import WeekRowWithoutTime from './WeekRowWithoutTime';
import useWeeks from './useWeeks';
import useStyles from './useStyles';

function CalendarView({ statuses, auctions, auctionGroups, hideTimes }) {
  const classes = useStyles();
  const todayDate = DateTimeService.format(new Date(), 'yyyy-MM-dd');

  const groupedAuctions = useGroupByLocalDateTime(auctions, hideTimes);
  const weeks = useWeeks();
  const timeZoneAbbr = useTimeZoneAbbr();
  const WeekRowComponent = hideTimes ? WeekRowWithoutTime : WeekRow;

  return (
    <div className={classes.root}>
      {weeks.map((dates, index) => (
        <WeekRowComponent
          key={index}
          dates={dates}
          statuses={statuses}
          auctions={groupedAuctions}
          auctionGroups={auctionGroups}
          todayDate={todayDate}
          timeZoneAbbr={timeZoneAbbr}
        />
      ))}
    </div>
  );
}

CalendarView.propTypes = {
  statuses: PropTypes.object,
  auctions: PropTypes.object,
  auctionGroups: PropTypes.array,
  hideTimes: PropTypes.bool,
};

CalendarView.defaultProps = {
  statuses: [],
  auctions: {},
  auctionGroups: [],
  hideTimes: false,
};

export default CalendarView;
