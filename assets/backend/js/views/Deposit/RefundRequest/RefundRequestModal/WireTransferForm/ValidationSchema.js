import * as yup from 'yup';
import ValidationService from 'backend/js/lib/ValidationService';
import ValidationErrors from 'backend/js/lib/ValidationErrors';
import CountryService from 'backend/js/api/CountryService';

const { fieldRequired, iban, intlRoutingCode } = ValidationErrors;

const WireTransferValidationSchema = yup.object().shape({
  swiftCode: yup.string().required(fieldRequired),
  ibanNumber: yup
    .string()
    .required(fieldRequired)
    .test(
      'ibanNumber',
      iban.notValid,
      async (value) =>
        // eslint-disable-next-line no-return-await
        await ValidationService.validateIBAN(value),
    ),
  account: yup.string().required(fieldRequired),
  city: yup.string().required(fieldRequired),
  state: yup.string().when('country', {
    is: `${CountryService.COUNTRIES.usa.code}`,
    then: yup.string().required(fieldRequired),
  }),
  zipCode: yup.string().when('country', {
    is: `${CountryService.COUNTRIES.usa.code}`,
    then: yup.string().required(fieldRequired),
  }),
  intlRoutingCode: yup.string().when('country', {
    is: `${CountryService.COUNTRIES.unitedKingdom.code}`,
    then: yup
      .string()
      .required()
      .test('intlRoutingCode', intlRoutingCode.notValid, (value) =>
        /^[0-9]{2}\s?-?[0-9]{2}\s?-?[0-9]{2}$/.test(value || ''),
      ),
  }),
});

export default WireTransferValidationSchema;
