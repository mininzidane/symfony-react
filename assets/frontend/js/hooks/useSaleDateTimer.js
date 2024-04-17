import { useState, useEffect } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';

function useSaleDateTimer(date) {
  if (!date) {
    return {};
  }

  const intl = useIntl();

  const translationSets = {
    day: intl.formatMessage({ id: 'shared.time.day.singleLetter' }),
    hour: intl.formatMessage({ id: 'shared.time.hour.singleLetter' }),
    minute: intl.formatMessage({ id: 'shared.time.minute.singleLetter' }),
    second: intl.formatMessage({ id: 'shared.time.second.singleLetter' }),
  };

  const [isTimeLeft, setTimeLeft] = useState(date.isTimeLeft);
  const [d, setD] = useState(date.d);
  const [h, setH] = useState(date.h);
  const [m, setM] = useState(date.m);
  const [s, setS] = useState(date.s);

  function getTimeString() {
    let timeString = '';

    const showDay = d !== 0;
    const showHour = showDay || h !== 0;
    const showMinute = showHour || m !== 0;

    if (showDay) {
      timeString += `${(d + translationSets.day).toUpperCase()} `;
    }
    if (showHour) {
      timeString += `${h + translationSets.hour} `;
    }
    if (showMinute) {
      timeString += `${m + translationSets.minute} `;
    }
    timeString += s + translationSets.second;

    return timeString;
  }

  function updateTimer(prevMsLeft) {
    const delay = 1000;

    setTimeout(() => {
      const msLeft = prevMsLeft - delay;
      if (msLeft < 0) {
        setTimeLeft(false);
        return;
      }

      setD(Math.floor(msLeft / (1000 * 60 * 60 * 24)));
      setH(Math.floor((msLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setM(Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60)));
      setS(Math.floor((msLeft % (1000 * 60)) / 1000));

      updateTimer(msLeft);
    }, delay);
  }

  useEffect(() => {
    updateTimer(1000 * (d * 86400 + h * 3600 + m * 60));
  }, []);

  return { isTimeLeft, timeString: getTimeString() };
}

export default useSaleDateTimer;
