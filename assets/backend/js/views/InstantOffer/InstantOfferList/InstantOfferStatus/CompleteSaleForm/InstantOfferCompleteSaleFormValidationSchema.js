import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferCompleteSaleFormValidationSchema = yup.object().shape({
  auctionFeesAmount: yup.number().required(required),
  soldAmount: yup.number().required(required),
  soldDate: yup.string().required(required),
});

export default InstantOfferCompleteSaleFormValidationSchema;
