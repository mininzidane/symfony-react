import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferAcceptPriceFormValidationSchema = yup.object().shape({
  acceptedPrice: yup.number().required(required),
});

export default InstantOfferAcceptPriceFormValidationSchema;
