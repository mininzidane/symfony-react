import * as yup from 'yup';
import t from 'frontend/js/api/TranslatorService';

const ValidationSchema = yup.object().shape({
  towingMarkup: yup.number().required(t('form.error.requiredField')),
});

export default ValidationSchema;
