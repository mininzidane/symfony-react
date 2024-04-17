import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';
import ValidationService from 'backend/js/lib/ValidationService';

const { required } = ValidateErrors;
const InstantOfferPayMethodFormValidationSchema = yup.object().shape({
  payMethod: yup.string().nullable().required(required),
  zelleEmailPhone: yup.string().when('payMethod', {
    is: 'Zelle',
    then: yup.string().required(required),
  }),
  accountName: yup.string().when('payMethod', {
    is: 'Wire Transfer',
    then: yup.string().required(required),
  }),
  routingNumber: yup.string().when('payMethod', {
    is: (value) => ['ACH', 'Wire Transfer'].includes(value),
    then: yup
      .string()
      .trim()
      .matches(ValidationService.bankRoutingNumber, 'Invalid bank routing number')
      .required(required),
  }),
  bankName: yup.string().when('payMethod', {
    is: (value) => ['ACH', 'Wire Transfer'].includes(value),
    then: yup.string().required('Bank not identified'),
  }),
  accountNumber: yup.string().when(
    'payMethod',
    {
      is: 'ACH',
      then: yup.string().required(required),
    },
    {
      is: 'Wire Transfer',
      then: yup.string().required(required),
    },
  ),
  accountNumberRepeat: yup
    .string()
    .oneOf([yup.ref('accountNumber'), null], 'Account number values must be the same')
    .when(
      'payMethod',
      {
        is: 'ACH',
        then: yup.string().required(required),
      },
      {
        is: 'Wire Transfer',
        then: yup.string().required(required),
      },
    ),
  mailingAddress: yup
    .string()
    .nullable()
    .when('payMethod', {
      is: 'Check by FedEx',
      then: yup.string().when('sameAsPickupAddress', {
        is: false,
        then: yup.string().required(required),
      }),
    }),
});

export default InstantOfferPayMethodFormValidationSchema;
