import * as yup from 'yup';
import t from 'frontend/js/api/TranslatorService';

const ValidationSchema = yup.object().shape({
  firstName: yup.string().required(t('form.error.requiredField')),
  lastName: yup.string().required(t('form.error.requiredField')),
});

export default ValidationSchema;
