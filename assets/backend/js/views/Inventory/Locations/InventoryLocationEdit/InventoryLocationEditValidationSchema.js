import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const Schema = yup.object().shape({
  name: yup.string().required(required),
  country: yup.string().required(required),
  zip: yup.string().required(required),
});

export default Schema;
