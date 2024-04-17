import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const { fieldRequired } = ValidationErrors;

const validationSchema = yup.object().shape({
  consignee: yup.string().trim().required(fieldRequired),
});

export default validationSchema;
