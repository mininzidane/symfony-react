import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const ValidationSchema = yup.object().shape({
  email: yup.string().trim().email(ValidationErrors.email.format).required(ValidationErrors.fieldRequired),
});

export default ValidationSchema;
