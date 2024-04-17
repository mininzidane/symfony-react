import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;

const LotPurchaseFormValidationSchema = yup.object().shape({
  email: yup.string().required(required),
  price: yup.number().required(required),
  firstName: yup.string().when('isNewUser', {
    is: true,
    then: yup.string().required(required),
  }),
  lastName: yup.string().when('isNewUser', {
    is: true,
    then: yup.string().required(required),
  }),
  phoneNumber: yup.string().when('isNewUser', {
    is: true,
    then: yup.string().required(required),
  }),
});

export default LotPurchaseFormValidationSchema;
