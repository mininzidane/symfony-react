import { parseISO, format, addBusinessDays, add, isWeekend, isToday, isTomorrow, isPast } from 'date-fns';
import LanguageService from 'frontend/js/api/LanguageService';

const DateTimeService = {
  format: (date, dateFormat = 'MM/dd/yyyy') => format(date, dateFormat),
  formatFromISOString: (dateStr, dateFormat) => {
    if (!dateStr) {
      return dateStr;
    }

    return DateTimeService.format(parseISO(dateStr), dateFormat);
  },
  addTimeToISOString: (dateStr, timeObj = {}) => {
    if (typeof dateStr !== 'string' || !dateStr) {
      return dateStr;
    }

    // @see https://date-fns.org/v2.21.1/docs/add for add object docs
    return add(parseISO(dateStr), timeObj);
  },
  parseDateInLocalTimezone(dateStr) {
    if (typeof dateStr !== 'string' || !dateStr) {
      return dateStr;
    }

    const [year, month, day] = dateStr.split(/\D/);
    return new Date(year, month - 1, day);
  },
  toLocaleString: (date = new Date(), opts = {}) =>
    new Date(date).toLocaleString(LanguageService.getIntlLocale(), opts),
  toLocaleDate: (date = new Date(), opts = {}) =>
    new Date(date).toLocaleDateString(LanguageService.getIntlLocale(), opts),
  toLocaleTime: (date = new Date(), opts = {}, parts = false) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
      ...opts,
    };

    if (parts) {
      return new Intl.DateTimeFormat(LanguageService.getIntlLocale(), options).formatToParts(new Date(date));
    }

    return new Date(date).toLocaleTimeString(LanguageService.getIntlLocale(), options);
  },
  shortDateSettings: {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
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
  getTimeLeft(targetDate) {
    if (!(targetDate instanceof Date)) {
      return null;
    }

    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

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
  isWeekend(date) {
    return isWeekend(date);
  },
  isToday(date) {
    return isToday(date);
  },
  isTomorrow(date) {
    return isTomorrow(date);
  },
  isPast(date) {
    return isPast(date);
  },
};

export default DateTimeService;
