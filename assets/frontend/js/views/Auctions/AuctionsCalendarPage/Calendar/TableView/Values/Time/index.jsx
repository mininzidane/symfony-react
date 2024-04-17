import React from 'react';
import PropTypes from 'prop-types';
import useTimeZoneAbbr from 'frontend/js/hooks/useTimeZoneAbbr';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useStyles from './useStyles';

function Time({ auction }) {
  const classes = useStyles();
  const timeZoneAbbr = useTimeZoneAbbr();
  const { startedAt, status } = auction;
  const isLive = status === 'live';
  const time = DateTimeService.format(new Date(startedAt), 'HH:mm a');

  return (
    <div className={classes.root}>
      <div className={classes.dot} style={{ background: isLive && '#4A9029' }} />
      <div>
        {time} {timeZoneAbbr}
      </div>
    </div>
  );
}

Time.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default Time;
