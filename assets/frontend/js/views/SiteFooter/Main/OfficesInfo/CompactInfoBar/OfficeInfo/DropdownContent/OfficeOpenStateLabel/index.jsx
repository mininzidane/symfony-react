/* eslint-disable react/prop-types */
import React from 'react';
import LanguageService from 'frontend/js/api/LanguageService';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function OfficeOpenStateLabel({ officeHourData }) {
  const { hoursFrom, hoursTo, serverTimezone } = officeHourData || {};
  const openHour = parseInt(hoursFrom, 10);
  const closeHour = parseInt(hoursTo, 10);

  if (!(hoursFrom && hoursTo && serverTimezone)) {
    return null;
  }

  const classes = useStyles();
  const locale = LanguageService.getCurrentLocale();

  const HOURS_IN_DAY = 24;
  const MINS_IN_HOUR = 60;

  const settings = { timeZone: serverTimezone, hour12: false };

  const d = new Intl.DateTimeFormat(['en-EN'], { ...settings, weekday: 'short' }).format(new Date());
  const h = parseInt(new Intl.DateTimeFormat(['en-EN'], { ...settings, hour: 'numeric' }).format(new Date()), 10);
  const m = parseInt(new Intl.DateTimeFormat(['en-EN'], { ...settings, minute: 'numeric' }).format(new Date()), 10);

  const isWeekend = ['Sun', 'Sat'].includes(d);
  const isOpen = h >= openHour && h < closeHour;

  if (!isWeekend && isOpen) {
    return null;
  }

  const isMorning = h < openHour;
  const isSharp = m === 0;
  let hoursTillOpen = openHour - h + (isMorning ? 0 : HOURS_IN_DAY);
  const minutesTillOpen = isSharp ? 0 : MINS_IN_HOUR - m;

  if (!isSharp) {
    hoursTillOpen -= 1;
  }

  if ((d === 'Fri' && !isMorning) || (d === 'Sat' && isMorning)) {
    hoursTillOpen += HOURS_IN_DAY * 2;
  }

  if ((d === 'Sat' && !isMorning) || (d === 'Sun' && isMorning)) {
    hoursTillOpen += HOURS_IN_DAY;
  }

  return (
    <div className={classes.root}>
      <FormattedMessage id="contactUsPage.directory.closed" /> {hoursTillOpen}
      {locale === 'en' ? ` hour${hoursTillOpen > 1 ? 's' : ''}` : <FormattedMessage id="timer.hours" />}{' '}
      {minutesTillOpen}
      {locale === 'en' ? ` minute${minutesTillOpen > 1 ? 's' : ''}` : <FormattedMessage id="timer.minutes" />}
    </div>
  );
}

OfficeOpenStateLabel.propTypes = {};

export default OfficeOpenStateLabel;
