import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferOfferFormValidationSchema = yup.object().shape({
  to: yup.string().required(required),
  subject: yup.string().required(required),
  message: yup.string().required(required),
});

export default InstantOfferOfferFormValidationSchema;
