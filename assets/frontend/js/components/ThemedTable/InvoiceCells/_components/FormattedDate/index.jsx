import React from 'react';
import PropTypes from 'prop-types';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function FormattedDate({ date }) {
  return <div>{DateTimeService.formatFromISOString(date)}</div>;
}

FormattedDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default FormattedDate;
