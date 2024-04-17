import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferRecordPaymentFormValidationSchema = yup.object().shape({
  paymentRefNumber: yup.string().required(required),
  paidAmount: yup.number().required(required),
  paymentDate: yup.string().required(required),
});

export default InstantOfferRecordPaymentFormValidationSchema;
