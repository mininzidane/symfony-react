import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import useIntl from 'backend/js/hooks/useIntl';

function SaleDateTimer({ saleStartAt, updateTimer }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const intl = useIntl();

  function updateTimeLeft() {
    setTimeLeft(DateTimeService.getTimeLeft(new Date(saleStartAt)));
  }

  const translationSets = {
    day: intl.formatMessage({ id: 'shared.time.day.singleLetter' }),
    hour: intl.formatMessage({ id: 'shared.time.hour.singleLetter' }),
    minute: intl.formatMessage({ id: 'shared.time.minute.short' }),
    second: intl.formatMessage({ id: 'shared.time.second.short' }),
  };

  useEffect(() => {
    let interval;

    if (saleStartAt) {
      updateTimeLeft();
      interval = updateTimer && setInterval(updateTimeLeft, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return null;
  }

  return (
    <>
      {Boolean(timeLeft.days) && (
        <>
          {timeLeft.days}
          {translationSets.day}&nbsp;
        </>
      )}
      {(Boolean(timeLeft.days) || Boolean(timeLeft.hours)) && (
        <>
          {timeLeft.hours}
          {translationSets.hour}&nbsp;
        </>
      )}
      {(Boolean(timeLeft.days) || Boolean(timeLeft.hours) || Boolean(timeLeft.minutes)) && (
        <>
          {timeLeft.minutes}
          {translationSets.minute}
          &nbsp;
        </>
      )}
      {timeLeft.seconds}
      {translationSets.second}
    </>
  );
}

SaleDateTimer.propTypes = {
  saleStartAt: PropTypes.string,
  updateTimer: PropTypes.bool,
};

SaleDateTimer.defaultProps = {
  saleStartAt: null,
  updateTimer: true,
};

export default SaleDateTimer;
