import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

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
