import * as yup from 'yup';
import t from 'frontend/js/api/TranslatorService';

const ValidationSchema = yup.object().shape({
  phoneNumber: yup.string().required(t('form.error.requiredField')),
});

export default ValidationSchema;
