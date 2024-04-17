import React from 'react';
import PropTypes from 'prop-types';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function Date({ value }) {
  if (!value) {
    return <div>—</div>;
  }

  return <div>{DateTimeService.toLocaleDate(DateTimeService.parseDateInLocalTimezone(value))}</div>;
}

Date.propTypes = {
  value: PropTypes.string,
};

Date.defaultProps = {
  value: undefined,
};

export default Date;
