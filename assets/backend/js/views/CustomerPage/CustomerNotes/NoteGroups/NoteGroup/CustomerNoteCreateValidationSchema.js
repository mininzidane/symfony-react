import * as yup from 'yup';
import ValidationErrors from 'backend/js/lib/ValidationErrors';

const { fieldRequired } = ValidationErrors;

const CustomerNoteCreateValidationSchema = yup.object().shape({
  message: yup.string().required(fieldRequired),
});

export default CustomerNoteCreateValidationSchema;
