/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function DateCell({ date, className }) {
  if (!date) {
    return null;
  }
  return (
    <span className={classnames('ws-n', className)}>
      {DateTimeService.toLocaleDate(DateTimeService.parseDateInLocalTimezone(date), {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </span>
  );
}

export default DateCell;
