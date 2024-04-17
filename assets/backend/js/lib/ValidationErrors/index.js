const ValidateErrors = {
  required: 'Required',
  fieldRequired: 'This field is required',
  numericType: 'Please only use numeric characters',
  // eslint-disable-next-line no-template-curly-in-string
  stringLength: 'Please limit to ${max} characters',
  zip: {
    format: 'Zipcode format is invalid',
  },
  phone: {
    format: 'Phone format is invalid',
  },
  email: {
    format: 'Invalid email address format',
    misMatchConfirm: 'Email does not match',
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
  selectFromDropdown: 'Please select a valid value from the dropdown',
  upload: {
    fileRequired: 'You must provide uploaded images.',
  },
  iban: {
    notValid: 'IBAN is not valid',
  },
  intlRoutingCode: {
    notValid: 'International Routing Code is invalid',
  },
};

export default ValidateErrors;
