import * as yup from 'yup';

const ConsigneeValidationSchema = yup.object().shape({
  consignee: yup.string().required(),
});

export default ConsigneeValidationSchema;
