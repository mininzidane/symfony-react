import LanguageService from 'frontend/js/api/LanguageService';

const NumberService = {
  formatCurrency: (value = 0, currency = 'USD', fractionalPart = false, intlLocale = true) => {
    const { LANGUAGE_TAGS } = LanguageService;

    let locale;
    switch (currency) {
      case 'CAD':
        locale = LANGUAGE_TAGS.enCA;
        break;
      default:
        locale = LANGUAGE_TAGS.enUS;
    }

    const isLocaleRu = intlLocale && currency === 'USD' && LanguageService.getIntlLocale() === LANGUAGE_TAGS.ruRU;
    if (isLocaleRu) {
      locale = LANGUAGE_TAGS.ruRU;
    }

    const currencyFormatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    });

    let delimiter = '.';
    let result = currencyFormatter.format(value);

    if (isLocaleRu) {
      result = result.replace('$', '').trim().replace(/(-)?/, '$1$');
      delimiter = ',';
    }

    if (!fractionalPart && result.indexOf(delimiter) > -1) {
      [result] = result.split(delimiter);
    }

    return result;
  },

  formatUsCurrency: (value = 0, fractionalPart = false) =>
    NumberService.formatCurrency(value, 'USD', fractionalPart, false),

  formatNumber: (value = 0) => Intl.NumberFormat(LanguageService.getIntlLocale()).format(value),

  formatUsCurrencyForInput: (stringValue, sign = '$') => {
    const hasCents = stringValue.indexOf('.') > -1;
    let result = '';
    let dollars = '';
    let cents = '';

    if (hasCents) {
      [dollars, cents] = stringValue.split('.');

      if (cents) {
        cents = cents.slice(0, 2);
      }
    } else {
      dollars = stringValue;
    }

    dollars = dollars.replace(/^0+/, '');
    result += `${sign}${dollars.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

    if (hasCents) {
      result += `.${cents}`;
    }

    return result;
  },

  formatGeoLocationValue: (incomingValue) => {
    if (!incomingValue) {
      return incomingValue;
    }

    return parseFloat(incomingValue).toFixed(6);
  },

  parseFloatSafe: (value) => {
    const number = parseFloat(value);

    return Number.isNaN(number) ? 0 : number;
  },

  castToNumberSafe: (value, defaultValue = value) => {
    const number = Number(value);

    return Number.isNaN(number) ? defaultValue : number;
  },
};

export default NumberService;
