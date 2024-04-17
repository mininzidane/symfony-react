import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const CounterBidValidationSchema = yup.object().shape({
  newBid: yup.number().required(required),
});

export default CounterBidValidationSchema;
