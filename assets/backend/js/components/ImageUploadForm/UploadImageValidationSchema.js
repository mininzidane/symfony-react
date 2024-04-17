import * as yup from 'yup';

const UploadImageValidationSchema = yup.object().shape({
  images: yup
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

export default UploadImageValidationSchema;
