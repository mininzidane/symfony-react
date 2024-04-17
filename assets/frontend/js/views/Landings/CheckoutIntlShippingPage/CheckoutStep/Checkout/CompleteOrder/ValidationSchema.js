import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

const ValidationSchema = yup.object().shape({
  emailIsBlocked: yup.boolean().oneOf([false], 'Error').required(ValidationErrors.fieldRequired),
  email: yup
    .string()
    .trim()
    .matches(ValidationService.emailRegex, ValidationErrors.email.format)
    .required(ValidationErrors.fieldRequired),
  firstName: yup
    .string()
    .trim()
    .matches(ValidationService.asciiPrintableRegex, {
      message: ValidationErrors.characterValidation,
    })
    .required(ValidationErrors.fieldRequired),
  lastName: yup
    .string()
    .trim()
    .matches(ValidationService.asciiPrintableRegex, {
      message: ValidationErrors.characterValidation,
    })
    .required(ValidationErrors.fieldRequired),
  phoneNumber: yup
    .string()
    .required(ValidationErrors.fieldRequired)
    .test('phoneNumber', ValidationErrors.phone.format, ValidationService.validatePhoneNumber),
});

export default ValidationSchema;
