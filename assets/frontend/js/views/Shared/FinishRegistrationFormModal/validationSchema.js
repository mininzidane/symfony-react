import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const { fieldRequired } = ValidationErrors;

const validationSchema = yup.object().shape({
  phoneNumber: yup.string().required(fieldRequired),
  firstName: yup.string().required(fieldRequired),
  lastName: yup.string().required(fieldRequired),
});

export default validationSchema;
