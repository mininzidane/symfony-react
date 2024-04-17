import t from 'frontend/js/api/TranslatorService';

const ValidateErrors = {
  required: 'Required',
  fieldRequired: t('form.error.requiredField'),
  numericType: 'Please only use numeric characters',
  // eslint-disable-next-line no-template-curly-in-string
  stringLength: 'Please limit to ${max} characters',
  zip: {
    format: 'Zipcode format is invalid',
  },
  phone: {
    format: t('form.error.phone.invalidFormat'),
  },
  email: {
    format: t('form.error.email.invalidFormat'),
    misMatchConfirm: 'Email does not match',
  },
  vin: {
    format: t('form.error.vin.invalidFormat'),
  },
  tac: {
    longMessage: 'In order to use our services, you must agree to our Terms and Conditions',
  },
  card: {
    min: 'Incorrect card number',
  },
  cvv: {
    min: 'Code is too short',
    required: 'Field is required',
    threeDigitsRequired: 'Invalid CVV: 3 digits required',
    fourDigitsRequired: 'Invalid CVV: 4 digits required',
  },
  expDate: {
    incorrect: 'Incorrect date',
    required: 'Field is required',
  },
  bidder: {
    length: 'Please limit bidder# to 9 characters',
  },
  password: {
    invalid: 'Invalid password',
    invalidLong: 'Password contains invalid characters or symbols',
    short: 'Password is too short',
    min: 'Password is too short',
    max: 'Password is too long',
    number: "Password doesn't contain any numbers",
    symbol: "Password doesn't contain any symbols",
    whitespace: 'Password contains whitespace character',
    misMatchConfirm: 'Password does not match',
  },
  characterValidation: 'Please use English characters: A-Z, 0-9, and punctuation marks',
  selectFromDropdown: t('form.error.dropdown'),
  upload: {
    fileRequired: 'You must provide uploaded images.',
  },
};

export default ValidateErrors;
