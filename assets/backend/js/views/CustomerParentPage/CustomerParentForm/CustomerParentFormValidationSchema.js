import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required, email } = ValidateErrors;
const CustomerParentFormValidationSchema = yup.object().shape({
  adminEmail: yup
    .string()
    .email(email.format)
    .when('edit', {
      is: false,
      then: yup.string().email(email.format).required(required),
    }),
  adminFirstName: yup.string().when('edit', {
    is: false,
    then: yup.string().required(required),
  }),
  adminLastName: yup.string().when('edit', {
    is: false,
    then: yup.string().required(required),
  }),
  adminCountry: yup.number().when('edit', {
    is: false,
    then: yup.number().required(required),
  }),
  adminState: yup.number().when('edit', {
    is: false,
    then: yup.number().required(required),
  }),
  adminAddress: yup.string().when('edit', {
    is: false,
    then: yup.string().required(required),
  }),
  adminCity: yup.string().when('edit', {
    is: false,
    then: yup.string().required(required),
  }),
  adminPhone: yup.string().when('edit', {
    is: false,
    then: yup.string().required(required),
  }),
  adminLocale: yup.string().when('edit', {
    is: false,
    then: yup.string().min(2).required(required),
  }),
});

export default CustomerParentFormValidationSchema;
