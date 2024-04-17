import * as yup from 'yup';
import ValidateErrors from '../../../lib/ValidationErrors';

const { required } = ValidateErrors;
const DynamicPageFormValidationSchema = yup.object().shape({
  url: yup.string().required(required),
  domain: yup.string().required(required),
});

export default DynamicPageFormValidationSchema;
