import * as yup from 'yup';

const PicturesUploadValidationSchema = yup.object().shape({
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
});

export default PicturesUploadValidationSchema;
