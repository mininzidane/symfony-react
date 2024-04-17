import * as yup from 'yup';

const WireConfirmationValidationSchema = yup.object().shape({
  documents: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          name: yup.string.required,
          path: yup.string.required,
          type: yup.string.required,
          size: yup.number.required,
          lastModified: yup.number.required,
        })
        .nullable(),
    )
    .required('You must provide upload documents.'),
  amount: yup
    .string()
    .required()
    .test('amount', 'You must provide upload amount.', (value) => (value?.replace(/[^0-9.]/g, '') || '') !== ''),
});

export default WireConfirmationValidationSchema;
