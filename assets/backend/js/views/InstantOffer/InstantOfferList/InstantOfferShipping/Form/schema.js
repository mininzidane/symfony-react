import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferOfferFormValidationSchema = yup.object().shape({
  fullAddress: yup.string().required(required),
  pickupDate: yup.string().required(required),
  pickupTime: yup.string().required(required),
  destination: yup.string().required(required),
});

export default InstantOfferOfferFormValidationSchema;
