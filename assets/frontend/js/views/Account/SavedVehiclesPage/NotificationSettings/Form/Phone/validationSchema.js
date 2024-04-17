import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

const ValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required(ValidationErrors.fieldRequired)
    .test('phone', ValidationErrors.phone.format, (val) => !!val && ValidationService.validatePhoneNumber(val)),
});

export default ValidationSchema;
