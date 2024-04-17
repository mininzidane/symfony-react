import * as yup from 'yup';

const InventoryNoteValidationSchema = yup.object().shape({
  message: yup.string().required('required'),
});

export default InventoryNoteValidationSchema;
