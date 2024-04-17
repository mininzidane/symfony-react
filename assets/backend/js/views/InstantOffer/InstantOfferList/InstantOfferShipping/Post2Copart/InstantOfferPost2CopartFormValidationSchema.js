import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferPost2CopartFormValidationSchema = yup.object().shape({
  copartMinimumBid: yup.number().required(required),
});

export default InstantOfferPost2CopartFormValidationSchema;
