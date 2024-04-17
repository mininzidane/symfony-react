import * as yup from 'yup';
import ValidateErrors from '../../lib/ValidationErrors';

const { required } = ValidateErrors;

const PriceHistoryFormSchema = yup.object().shape({
  make: yup.string().required(required),
  model: yup.string().required(required),
});

export default PriceHistoryFormSchema;
