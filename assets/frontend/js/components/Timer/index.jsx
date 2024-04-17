import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StringService from '../../lib/utils/StringService';
import t from '../../api/TranslatorService';

function Timer({ date, formatCountdown, formatCountup }) {
  const [id] = useState(StringService.randomString());

  function format() {
    const timeParts = [];
    const now = Date.now();
    let delta = Math.floor(Math.abs(date - now) / 1000);

    const days = Math.floor(delta / 86400);
    if (days) {
      timeParts.push(`${days}${t('timer.days')}`);
    }
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;
    if (hours) {
      timeParts.push(`${hours}${t('timer.hours')}`);
    }
    delta -= hours * 3600;

    const minutes = Math.floor(delta / 60) % 60;
    if (minutes) {
      timeParts.push(`${minutes}${t('timer.minutes')}`);
    }
    delta -= minutes * 60;

    const seconds = parseInt(delta % 60, 10);
    if (seconds) {
      timeParts.push(`${seconds}${t('timer.seconds')}`);
    }

    const time = timeParts.join(' ');

    if (date > now) {
      return formatCountdown(time);
    }

    return formatCountup(time);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = format();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <span id={id}>{format()}</span>;
}

Timer.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  formatCountdown: PropTypes.func,
  formatCountup: PropTypes.func,
};

Timer.defaultProps = {
  formatCountdown: (v) => v,
  formatCountup: (v) => v,
};

export default Timer;
