import * as yup from 'yup';

const InstantOfferFormValidationSchema = yup.object().shape({
  notes: yup.string(),
});

export default InstantOfferFormValidationSchema;
