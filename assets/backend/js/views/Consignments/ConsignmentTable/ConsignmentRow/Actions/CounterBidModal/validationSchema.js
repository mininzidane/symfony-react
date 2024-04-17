import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const validationSchema = yup.object().shape({
  counterOffer: yup.string().required(required),
});

export default validationSchema;
