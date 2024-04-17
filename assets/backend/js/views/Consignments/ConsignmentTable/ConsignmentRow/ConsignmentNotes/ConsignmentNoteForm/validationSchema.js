import * as yup from 'yup';

const CustomerNoteValidationSchema = yup.object().shape({
  message: yup.string().required('required'),
});

export default CustomerNoteValidationSchema;
