import * as yup from 'yup';
import ValidateErrors from '../../../lib/ValidationErrors';

const { required } = ValidateErrors;
const CrmEmailFormValidationSchema = yup.object().shape({
  name: yup.string().required(required),
});

export default CrmEmailFormValidationSchema;
