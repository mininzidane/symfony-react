import * as yup from 'yup';
import ValidateErrors from 'frontend/js/lib/utils/ValidationErrors';

const validationSchema = yup.object().shape({
  pickupDate: yup.string().required(ValidateErrors.fieldRequired),
  pickupTime: yup.string().required(ValidateErrors.fieldRequired),
});

export default validationSchema;
