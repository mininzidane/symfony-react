/* eslint-disable react/prop-types */
import React from 'react';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function UpdatedAt({ lot }) {
  return (
    <>
      {DateTimeService.toLocaleString(lot.lastUpdatedAt, {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })}
    </>
  );
}

export default UpdatedAt;
