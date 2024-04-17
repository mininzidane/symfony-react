import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const { fieldRequired } = ValidationErrors;

const validationSchema = yup.object().shape({
  amount: yup.string().trim().required(fieldRequired),
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
    .required('You must provide uploaded images.'),
});

export default validationSchema;
