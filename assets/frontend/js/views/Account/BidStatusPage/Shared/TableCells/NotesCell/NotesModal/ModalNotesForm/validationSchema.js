import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const { fieldRequired } = ValidationErrors;

const validationSchema = yup.object().shape({
  message: yup.string().required(fieldRequired),
});

export default validationSchema;
