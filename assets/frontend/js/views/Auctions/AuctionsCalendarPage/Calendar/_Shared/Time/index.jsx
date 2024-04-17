import React, { memo } from 'react';
import PropTypes from 'prop-types';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useStyles from './useStyles';

function Time({ time }) {
  const classes = useStyles();
  const localTime = DateTimeService.toLocaleTime(`1970-01-01T${time}:00`, {
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: undefined,
  });
  return (
    <div className={classes.root}>
      <strong>{localTime}</strong>
    </div>
  );
}

Time.propTypes = {
  time: PropTypes.string.isRequired,
};

export default memo(Time);
