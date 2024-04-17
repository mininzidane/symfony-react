import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';
import ValidationService from 'backend/js/lib/ValidationService';

const { required, zip } = ValidateErrors;
const validationSchema = yup.object().shape({
  contactName: yup.string().required(required),
  phone: yup.string().required(required),
  address: yup.mixed().required(required),
  city: yup.string().required(required),
  state: yup.string().required(required),
  zip: yup.string().required(required).test('zip', zip.format, ValidationService.validateZip),
  country: yup.string().required(required),
});

export default validationSchema;
