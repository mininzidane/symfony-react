import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferPickupTimeFormValidationSchema = yup.object().shape({
  pickupDate: yup.string().required(required),
  pickupTime: yup.string().required(required),
});

export default InstantOfferPickupTimeFormValidationSchema;
