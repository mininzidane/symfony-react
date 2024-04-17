import * as yup from 'yup';
import t from 'frontend/js/api/TranslatorService';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const ValidationSchema = yup.object().shape({
  email: yup.string().email(t('form.error.email.invalidFormat')).required(t('form.error.requiredField')),
  vin: yup
    .string()
    .test('validate vin', ValidationErrors.vin.format, (value) => ValidationService.validateVin(value))
    .required(t('form.error.requiredField')),
});

export default ValidationSchema;
