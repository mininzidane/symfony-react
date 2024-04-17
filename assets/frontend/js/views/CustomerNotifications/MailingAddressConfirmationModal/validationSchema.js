import * as yup from 'yup';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const { fieldRequired, zip } = ValidationErrors;
const { validateZip } = ValidationService;

const validationSchema = yup.object().shape({
  // Mailing Address
  mailingName: yup.string().required(fieldRequired),
  mailingPhone: yup.string().required(fieldRequired),
  mailingAddress: yup.string().required(fieldRequired),
  mailingApartment: yup.string(),
  mailingCity: yup.string().required(fieldRequired),
  mailingState: yup.string().required(fieldRequired),
  mailingZip: yup.string().test('zip', zip.format, validateZip),
  mailingCountry: yup.string().required(fieldRequired),
});

export default validationSchema;
