import { parsePhoneNumberFromString } from 'libphonenumber-js';

const NumberService = {
  formatCurrency: (value = 0, currency = 'USD', fractionalPart = false) => {
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    });

    let result = currencyFormatter.format(value);

    if (!fractionalPart && result.indexOf('.') > -1) {
      [result] = result.split('.');
    }

    return result;
  },

  formatUsCurrency: (value = 0, fractionalPart = false) => NumberService.formatCurrency(value, 'USD', fractionalPart),

  formatNumber: (value = 0) => Intl.NumberFormat().format(value),

  formatUsCurrencyForInput: (stringValue) => {
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
    if (dollars === '') {
      dollars = '0';
    }
    result += `$${dollars.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

    if (hasCents) {
      result += `.${cents}`;
    }

    return result;
  },

  maskPhoneInput: (phoneStr) => {
    const number = parsePhoneNumberFromString(phoneStr);
    if (number) {
      const formattedNumber = number.formatNational().replace(/[0-9](?=.{2,}$)/g, '#');

      return number.countryCallingCode ? `+${number.countryCallingCode} ${formattedNumber}` : formattedNumber;
    }

    return phoneStr;
  },

  formatGeoLocationValue: (incomingValue) => {
    if (!incomingValue) {
      return incomingValue;
    }

    return parseFloat(incomingValue).toFixed(6);
  },
};

export default NumberService;
