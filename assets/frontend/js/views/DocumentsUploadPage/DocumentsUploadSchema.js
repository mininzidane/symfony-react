import * as yup from 'yup';

const DocumentsUploadSchema = yup.object().shape({
  amount: yup.string().min(2, 'Please enter correct amount').required('Amount is required'),
  wireTransferDocuments: yup
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

export default DocumentsUploadSchema;
