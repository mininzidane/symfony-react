import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

const AlertSchema = yup.object().shape({
  frequency: yup.string().required(ValidationErrors.fieldRequired),
  method: yup.string().required(ValidationErrors.fieldRequired),
  firstName: yup.string().required(ValidationErrors.fieldRequired),
  lastName: yup.string().required(ValidationErrors.fieldRequired),
  phoneNumber: yup.string().when('method', {
    is: 'sms',
    then: yup
      .string()
      .required(ValidationErrors.fieldRequired)
      .test('phoneNumber', ValidationErrors.phone.format, ValidationService.validatePhoneNumber),
  }),
  email: yup.string().when('method', {
    is: 'email',
    then: yup.string().trim().email(ValidationErrors.email.format).required(ValidationErrors.fieldRequired),
  }),
});

export default AlertSchema;
