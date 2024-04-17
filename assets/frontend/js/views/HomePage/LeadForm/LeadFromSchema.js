import * as yup from 'yup';
import ValidationErrors from '../../../lib/utils/ValidationErrors';

const LeadFormSchema = yup.object().shape({
  name: yup.string().required(ValidationErrors.fieldRequired),
  phoneNumber: yup.string().required(ValidationErrors.fieldRequired),
});

export default LeadFormSchema;
