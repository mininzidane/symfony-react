import React from 'react';
import PropTypes from 'prop-types';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';

function SaleDate({ saleStartAt }) {
  if (!saleStartAt) {
    return null;
  }

  return (
    <>
      {DateTimeService.toLocaleDate(saleStartAt, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
      {' - '}
      {DateTimeService.toLocaleTime(saleStartAt, {
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
      })}
    </>
  );
}

SaleDate.propTypes = {
  saleStartAt: PropTypes.string,
};

SaleDate.defaultProps = {
  saleStartAt: null,
};

export default SaleDate;
