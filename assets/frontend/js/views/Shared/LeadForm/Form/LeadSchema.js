import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

const LeadSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(ValidationService.asciiPrintableRegex, {
      message: ValidationErrors.characterValidation,
    })
    .required(ValidationErrors.fieldRequired),
  email: yup.string().trim().email(ValidationErrors.email.format).required(ValidationErrors.fieldRequired),
  phoneNumber: yup
    .string()
    .required(ValidationErrors.fieldRequired)
    .test('phoneNumber', ValidationErrors.phone.format, ValidationService.validatePhoneNumber),
});

export default LeadSchema;
