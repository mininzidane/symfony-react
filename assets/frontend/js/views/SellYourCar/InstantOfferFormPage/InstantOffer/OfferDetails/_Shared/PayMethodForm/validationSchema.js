import * as yup from 'yup';
import ValidateErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import PaymentService from 'frontend/js/api/PaymentService/';

const { fieldRequired, email } = ValidateErrors;
const { WIRE_TRANSFER, ZELLE, ACH, CHECK_BY_FEDEX } = PaymentService.METHOD;

const validationSchema = yup.object().shape({
  payMethod: yup.string().nullable().required(fieldRequired),
  recipientName: yup
    .string()
    .when('payMethod', {
      is: ZELLE,
      then: yup.string().when('zelleEmail', {
        is: (zelleEmail) => !zelleEmail,
        then: yup.string().required(fieldRequired),
      }),
    })
    .when('payMethod', {
      is: CHECK_BY_FEDEX,
      then: yup.string().required(fieldRequired),
    }),
  zellePhoneNumber: yup.string().when('payMethod', {
    is: ZELLE,
    then: yup.string().when('zelleEmail', {
      is: (zelleEmail) => !zelleEmail,
      then: yup.string().required(fieldRequired),
    }),
  }),
  zelleEmail: yup.string().when('payMethod', {
    is: ZELLE,
    then: yup.string().when(['recipientName', 'zellePhoneNumber', 'zelleEmail'], {
      is: (recipientName, zellePhoneNumber, zelleEmail) =>
        (!recipientName && !zellePhoneNumber && !zelleEmail) || !!recipientName || !!zellePhoneNumber,
      then: yup.string().when('zelleEmail', {
        is: (zelleEmail) => !zelleEmail,
        otherwise: yup.string().email(email.format),
      }),
      otherwise: yup.string().trim().email(email.format).required(fieldRequired),
    }),
  }),
  accountName: yup.string().when('payMethod', {
    is: WIRE_TRANSFER,
    then: yup.string().required(fieldRequired),
  }),
  routingNumber: yup.string().when('payMethod', {
    is: (value) => [ACH, WIRE_TRANSFER].includes(value),
    then: yup
      .string()
      .trim()
      .required(fieldRequired)
      .test('validate', 'Invalid bank routing number', function testVin(val) {
        return ValidationService.bankRoutingNumberRegex.test(val) && Boolean(this.parent.bankName);
      }),
  }),
  accountNumber: yup.string().when(
    'payMethod',
    {
      is: ACH,
      then: yup.string().required(fieldRequired),
    },
    {
      is: WIRE_TRANSFER,
      then: yup.string().required(fieldRequired),
    },
  ),
  address: yup.string().when('payMethod', {
    is: CHECK_BY_FEDEX,
    then: yup.string().required(fieldRequired),
  }),
  accountNumberRepeat: yup
    .string()
    .oneOf([yup.ref('accountNumber'), null], 'Account number values must be the same')
    .when(
      'payMethod',
      {
        is: ACH,
        then: yup.string().required(fieldRequired),
      },
      {
        is: WIRE_TRANSFER,
        then: yup.string().required(fieldRequired),
      },
    ),
});

export default validationSchema;
