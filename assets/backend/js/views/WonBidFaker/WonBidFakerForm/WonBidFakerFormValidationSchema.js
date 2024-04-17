import * as yup from 'yup';
import ValidateErrors from '../../../lib/ValidationErrors';

const { required } = ValidateErrors;
const WonBidFakerFormValidationSchema = yup.object().shape({
  price: yup.number().required(required),
  bidderId: yup.number().required(required),
  email: yup.string().email().required(required),
});

export default WonBidFakerFormValidationSchema;
