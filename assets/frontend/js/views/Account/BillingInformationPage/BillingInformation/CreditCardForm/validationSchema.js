import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

const { identifyCreditCardType, validateCardNumberLength, validateExpDate, characterValidation } = ValidationService;
const { fieldRequired, card, expDate, cvv, asciiPrintableRegex } = ValidationErrors;

const validationSchema = yup.object().shape({
  // Card information
  cardNumber: yup.string().required(fieldRequired).test('cardNumber', card.min, validateCardNumberLength),
  expDate: yup.string().required(expDate.required).test('expDate', expDate.incorrect, validateExpDate),
  cvv: yup
    .string()
    .trim()
    .required(cvv.required)
    .when('cardNumber', {
      is: (cardNumber) => identifyCreditCardType(cardNumber) === 'amex',
      then: yup.string().min(4, cvv.fourDigitsRequired),
      otherwise: yup.string().min(3, cvv.threeDigitsRequired).max(3, cvv.threeDigitsRequired),
    }),
  // Address information
  isBillingAsProfile: yup.boolean(),
  address: yup.string().when('isBillingAsProfile', {
    is: false,
    then: yup
      .string()
      .trim()
      .matches(asciiPrintableRegex, {
        message: characterValidation,
      })
      .required(fieldRequired),
  }),
  city: yup.string().when('isBillingAsProfile', {
    is: false,
    then: yup
      .string()
      .trim()
      .matches(asciiPrintableRegex, {
        message: characterValidation,
      })
      .required(fieldRequired),
  }),
  zip: yup.string().when('isBillingAsProfile', {
    is: false,
    then: yup.string().trim().required(fieldRequired),
  }),
  state: yup.string().when('isBillingAsProfile', {
    is: false,
    then: yup.string().trim().required(fieldRequired),
  }),
  countryId: yup.string().when('isBillingAsProfile', {
    is: false,
    then: yup.string().trim().required(fieldRequired),
  }),
});

export default validationSchema;
