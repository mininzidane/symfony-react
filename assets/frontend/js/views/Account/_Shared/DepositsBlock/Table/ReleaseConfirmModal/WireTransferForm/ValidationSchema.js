import * as yup from 'yup';
import t from 'frontend/js/api/TranslatorService';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import CountryService from 'frontend/js/api/CountryService';

const WireTransferValidationSchema = yup.object().shape({
  swiftCode: yup.string().required(t('form.error.requiredField')),
  ibanNumber: yup
    .string()
    .required(t('form.error.requiredField'))
    .test(
      'ibanNumber',
      t('form.error.iban.notValid'),
      async (value) =>
        // eslint-disable-next-line no-return-await
        await ValidationService.validateIBAN(value),
    ),
  account: yup.string().required(t('form.error.requiredField')),
  city: yup.string().required(t('form.error.requiredField')),
  state: yup.string().when('country', {
    is: `${CountryService.COUNTRIES.usa.code}`,
    then: yup.string().required(t('form.error.requiredField')),
  }),
  zipCode: yup.string().when('country', {
    is: `${CountryService.COUNTRIES.usa.code}`,
    then: yup.string().required(t('form.error.requiredField')),
  }),
  intlRoutingCode: yup.string().when('country', {
    is: `${CountryService.COUNTRIES.unitedKingdom.code}`,
    then: yup
      .string()
      .required()
      .test('intlRoutingCode', t('form.error.intlRoutingCode.notValid'), (value) =>
        /^[0-9]{2}\s?-?[0-9]{2}\s?-?[0-9]{2}$/.test(value || ''),
      ),
  }),
});

export default WireTransferValidationSchema;
