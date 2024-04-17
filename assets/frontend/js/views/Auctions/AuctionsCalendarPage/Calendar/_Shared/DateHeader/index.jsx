import React, { memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import StringService from 'frontend/js/lib/utils/StringService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useStyles from './useStyles';

function DateHeader({ date, isToday }) {
  const classes = useStyles();
  const dateInLocalTimezone = DateTimeService.parseDateInLocalTimezone(date);

  return (
    <div className={classnames(classes.root, isToday && 'is-active')}>
      <div className={classes.day}>{DateTimeService.toLocaleDate(dateInLocalTimezone, { day: 'numeric' })}</div>
      <div>
        <div className={classes.weekday}>
          {StringService.capitalize(DateTimeService.toLocaleDate(dateInLocalTimezone, { weekday: 'long' }))}
        </div>
        <div className={classes.monthAndYear}>
          {StringService.capitalize(
            DateTimeService.toLocaleDate(dateInLocalTimezone, { month: 'long', year: 'numeric' }),
          )}
        </div>
      </div>
    </div>
  );
}

DateHeader.propTypes = {
  date: PropTypes.string.isRequired,
  isToday: PropTypes.bool,
};

DateHeader.defaultProps = {
  isToday: false,
};

export default memo(DateHeader);
