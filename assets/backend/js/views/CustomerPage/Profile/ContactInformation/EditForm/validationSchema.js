import * as yup from 'yup';
import ValidationErrors from 'backend/js/lib/ValidationErrors';

const { fieldRequired } = ValidationErrors;

const validationSchema = yup.object().shape({
  // Account Information
  firstName: yup.string().required(fieldRequired),
  lastName: yup.string().required(fieldRequired),
  phoneNumber: yup.string().required(fieldRequired),
});

export default validationSchema;
