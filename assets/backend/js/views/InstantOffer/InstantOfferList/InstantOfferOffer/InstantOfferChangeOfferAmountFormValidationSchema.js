import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferChangeOfferAmountFormValidationSchema = yup.object().shape({
  offerAmount: yup.number().required(required),
});

export default InstantOfferChangeOfferAmountFormValidationSchema;
