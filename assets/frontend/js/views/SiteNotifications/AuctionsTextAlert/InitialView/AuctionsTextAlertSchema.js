import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

const AuctionsTextAlertSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required(ValidationErrors.fieldRequired)
    .test('phoneNumber', ValidationErrors.phone.format, ValidationService.validatePhoneNumber),
});

export default AuctionsTextAlertSchema;
