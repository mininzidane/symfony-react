import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const ValidationSchema = yup.object().shape({
  newEmail: yup.string().trim().email(ValidationErrors.email.format).required(ValidationErrors.fieldRequired),
  newEmailConfirmation: yup
    .string()
    .trim()
    .email(ValidationErrors.email.format)
    .required(ValidationErrors.fieldRequired),
  currentPassword: yup.string().trim().required(ValidationErrors.fieldRequired),
});

export default ValidationSchema;
