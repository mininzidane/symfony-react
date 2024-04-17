import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const ValidationSchema = yup.object().shape({
  blAmountFixed: yup.string().required(ValidationErrors.fieldRequired),
  blCount: yup.string().when('blAmountFixed', {
    is: (value) => value === '1',
    then: yup
      .string()
      .required(ValidationErrors.fieldRequired)
      .test('blCount', ValidationErrors.fieldRequired, (value) => parseInt(value.replace(/[^0-9.]/g, ''), 10) > 0),
  }),
  blAmount: yup.string().when('blAmountFixed', {
    is: (value) => value === '1',
    then: yup
      .string()
      .required(ValidationErrors.fieldRequired)
      .test('blAmount', ValidationErrors.fieldRequired, (value) => parseInt(value.replace(/[^0-9.]/g, ''), 10) > 0),
  }),
});

export default ValidationSchema;
