import * as yup from 'yup';
import ValidationErrors from 'backend/js/lib/ValidationErrors';
import ValidationService from 'backend/js/lib/ValidationService';

const { validateZip } = ValidationService;

const { fieldRequired, zip } = ValidationErrors;

const WireTransferValidationSchema = yup.object().shape({
  name: yup.string().required(fieldRequired),
  address: yup.string().required(fieldRequired),
  city: yup.string().required(fieldRequired),
  state: yup.string().required(fieldRequired),
  zip_code: yup
    .string()
    .required(fieldRequired)
    .test('zip', zip.format, (val) => !!val && validateZip(val)),
});

export default WireTransferValidationSchema;
