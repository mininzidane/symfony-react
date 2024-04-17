import * as yup from 'yup';
import t from 'frontend/js/api/TranslatorService';

const ValidationSchema = yup.object().shape({
  title: yup.string().required(t('form.error.requiredField')),
});

export default ValidationSchema;
