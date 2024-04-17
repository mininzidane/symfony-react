import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const ValidationSchema = yup.object().shape({
  newPassword: yup.string().trim().required(ValidationErrors.fieldRequired),
  newPasswordConfirmation: yup.string().trim().required(ValidationErrors.fieldRequired),
});

export default ValidationSchema;
