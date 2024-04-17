import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import InstantOfferService from 'frontend/js/api/InstantOfferService';

const validationSchema = yup.object().shape({
  files: yup
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
  titleName: yup.string().when('contentType', {
    is: (contentType) => contentType === InstantOfferService.FILE_CONTENT_TYPES.DOCUMENT,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  titleState: yup.string().when('contentType', {
    is: (contentType) => contentType === InstantOfferService.FILE_CONTENT_TYPES.DOCUMENT,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
});

export default validationSchema;
