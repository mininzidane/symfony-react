import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const validationSchema = yup.object().shape({
  name: yup.string().required(ValidationErrors.fieldRequired),
  phoneNumber: yup.string().required(ValidationErrors.fieldRequired),
});

export default validationSchema;
