import * as yup from 'yup';
import ValidateErrors from '../../../lib/ValidationErrors';

const { required } = ValidateErrors;
const SeoContentFormValidationSchema = yup.object().shape({
  urlPattern: yup.string().required(required),
  pageType: yup.string().required(required),
});

export default SeoContentFormValidationSchema;
