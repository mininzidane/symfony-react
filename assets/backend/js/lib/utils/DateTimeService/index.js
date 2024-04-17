import { parseISO, format, addBusinessDays } from 'date-fns';

const DateTimeService = {
  format: (date, dateFormat = 'MM/dd/yyyy') => format(date, dateFormat),
  formatFromISOString: (dateStr, dateFormat = 'MM/dd/yyyy') => {
    if (!dateStr) {
      return dateStr;
    }

    return format(parseISO(dateStr), dateFormat);
  },
  formatFromISOStringWithoutTimezone: (dateStr = '', dateFormat = 'MM/dd/yyyy') =>
    format(parseISO(dateStr.substring(0, 19)), dateFormat),
  toLocaleDate: (date = new Date()) => new Date(date).toLocaleDateString(),
  toLocaleTime: (date = new Date(), opts = {}, parts = false) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
      ...opts,
    };

    if (parts) {
      return new Intl.DateTimeFormat('default', options).formatToParts(new Date(date));
    }

    return new Date(date).toLocaleTimeString('default', options);
  },
  parseDateInLocalTimezone(dateStr) {
    if (typeof dateStr !== 'string' || !dateStr) {
      return dateStr;
    }

    const [year, month, day] = dateStr.split(/\D/);
    return new Date(year, month - 1, day);
  },
  addBusinessDaysFromString: (dateStr, numBusinessDays = 1) => {
    if (!dateStr) {
      return dateStr;
    }

    return addBusinessDays(parseISO(dateStr), numBusinessDays);
  },
  addBusinessDays(date, numBusinessDays) {
    return addBusinessDays(date, numBusinessDays);
  },
  getTimezoneAbbr(timezone) {
    return new Date().toLocaleTimeString('en-us', { timeZone: timezone, timeZoneName: 'short' }).split(' ')[2];
  },
  getTimeLeft(to, from = new Date()) {
    if (!(from instanceof Date)) {
      return null;
    }

    const distance = to.getTime() - from.getTime();

    if (distance < 0) {
      return null;
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  },
};

export default DateTimeService;
