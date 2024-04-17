/* eslint-disable react/prop-types */
import React from 'react';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function AvailableDateCell({ estDate, actDate, className }) {
  const date = actDate || estDate;
  if (!date) {
    return null;
  }

  return (
    <span className={className}>
      {!actDate && 'Est. '}
      <span className="ws-n">
        {DateTimeService.toLocaleDate(DateTimeService.parseDateInLocalTimezone(date), {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </span>
    </span>
  );
}

export default AvailableDateCell;
