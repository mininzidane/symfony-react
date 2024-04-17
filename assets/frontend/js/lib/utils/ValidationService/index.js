const ValidationService = {
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneRegExp:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  zipcodeRegex: /^[0-9]{5}$/,
  asciiPrintableRegex: /^[ -~]+$/,
  asciiPrintableWithNewLineRegex: /^[ -~\r\n]+$/,
  bankRoutingNumberRegex: /^[0-9]{9}$/,

  isObjEqual: (obja, objb) => {
    const aProps = Object.getOwnPropertyNames(obja);
    const bProps = Object.getOwnPropertyNames(objb);
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];
      if (obja[propName] !== objb[propName]) {
        return false;
      }
    }

    return true;
  },

  isObject: (value) => typeof value === 'object' && !Array.isArray(value) && value !== null,

  isEmptyArray: (value) => Array.isArray(value) && value.length === 0,

  validateEmail: (email) => ValidationService.emailRegex.test(email.trim()),

  validateZip: (zip) => typeof zip === 'string' && ValidationService.zipcodeRegex.test(zip.trim()),

  validateVin: (vin = '') => /^[A-HJ-NPR-Z0-9]{11,17}$/.test(vin),

  validateVinPattern: (vin = '') => /[A-HJ-NPR-Z0-9]/.test(vin),

  validateStockNumber: (stockNumber = '') => /^\d{5,10}$/.test(stockNumber),

  validatePhoneNumber: async (number) => {
    if (!number) {
      return false;
    }

    const { parsePhoneNumberFromString } = await import('libphonenumber-js/min/exports/parsePhoneNumberFromString');
    const phoneNumber = parsePhoneNumberFromString(number);

    return phoneNumber && phoneNumber.isValid();
  },

  identifyCreditCardType: (cardNumber) => {
    let type = null;
    const number = `${cardNumber}`.replace(/\s/g, '');
    const RegExps = {
      visa: '^4',
      mastercard: '^(5[1-5]|2(22[1-9]|2[3-9]|[3-6]|7[0-1]|720))',
      amex: '^3[47]',
      discover: '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
    };

    Object.keys(RegExps).forEach((key) => {
      if (number.match(new RegExp(RegExps[key])) != null) {
        type = key;
      }
    });

    return type;
  },

  validateCardNumberLength: (cardNumber) => {
    if (!cardNumber) {
      return false;
    }

    const type = ValidationService.identifyCreditCardType(cardNumber);
    const rawCardNumber = cardNumber.replace(/\s/g, '');
    const correctLength = type === 'amex' ? 15 : 16;

    return rawCardNumber.length === correctLength;
  },

  validateExpDate: (dateString) => {
    let isCorrect = true;
    if (!dateString || dateString.length < 7) {
      isCorrect = false;
    } else {
      const currentYear = new Date().getFullYear() - 2000;
      const dateArray = dateString.split(/ \/ /);
      const month = +dateArray[0];
      const year = +dateArray[1];
      const isInvalidMonth = month < 1 || month > 12;
      const isInvalidYear = year < currentYear || year > currentYear + 20;
      const isPastDate = +new Date(2000 + year, month) < Date.now();

      if (isInvalidMonth || isInvalidYear || isPastDate) {
        isCorrect = false;
      }
    }

    return isCorrect;
  },
  validateIBAN: async (value) => {
    const ibantools = await import('ibantools');

    return ibantools.validateIBAN(value).valid;
  },
};

export default ValidationService;
