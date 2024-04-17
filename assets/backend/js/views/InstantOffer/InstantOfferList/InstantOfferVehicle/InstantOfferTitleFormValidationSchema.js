import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferOfferFormValidationSchema = yup.object().shape({
  titleName: yup.string().nullable().required(required),
  titleState: yup.string().nullable().required(required),
});

export default InstantOfferOfferFormValidationSchema;
