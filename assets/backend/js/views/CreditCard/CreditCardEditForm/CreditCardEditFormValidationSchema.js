import * as yup from 'yup';
import ValidateErrors from '../../../lib/ValidationErrors';

const { required } = ValidateErrors;
const CreditCardEditFormValidationSchema = yup.object().shape({
  cvv: yup.number().required(required),
  expMonth: yup.number().min(1).max(12).required(required),
  expYear: yup.number().min(new Date().getFullYear()).required(required),
});

export default CreditCardEditFormValidationSchema;
