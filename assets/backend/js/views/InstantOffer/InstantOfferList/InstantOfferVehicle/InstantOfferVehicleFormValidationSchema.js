import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferOfferFormValidationSchema = yup.object().shape({
  vin: yup.string().required(required),
});

export default InstantOfferOfferFormValidationSchema;
