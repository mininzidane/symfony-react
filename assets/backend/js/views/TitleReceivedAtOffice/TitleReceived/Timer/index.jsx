import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Timer({ startDate, endDate }) {
  const [formattedTime, setFormattedTime] = useState('00:00');

  function getFormattedTime(start, end) {
    const delta = end - start;
    const seconds = Math.floor(delta / 1000);

    const h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor((seconds % 3600) % 60);

    m = String(m).padStart(2, '0');
    s = String(s).padStart(2, '0');

    return `${h > 0 ? `${h}:` : ''}${m}:${s}`;
  }

  useEffect(() => {
    let intervalId = 0;
    if (startDate && !endDate) {
      intervalId = setInterval(() => {
        setFormattedTime(getFormattedTime(startDate, Date.now()));
      }, 1000);
      setFormattedTime(getFormattedTime(startDate, Date.now()));
    } else {
      clearInterval(intervalId);
      if (startDate && endDate) {
        setFormattedTime(getFormattedTime(startDate, endDate));
      } else {
        setFormattedTime('00:00');
      }
    }
    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  return formattedTime;
}

Timer.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
};

Timer.defaultProps = {
  startDate: null,
  endDate: null,
};

export default Timer;
