import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

const { TypeDomestic } = ShippingOrderService;
const { validateZip } = ValidationService;
//
const ValidationSchema = yup.object().shape({
  countryId: yup.string().required(ValidationErrors.fieldRequired),
  destinationId: yup.mixed().when('shippingType', {
    is: (v) => v !== TypeDomestic,
    then: yup.number().typeError(ValidationErrors.fieldRequired).required(ValidationErrors.fieldRequired),
  }),
  address: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  city: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  stateCode: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  zip: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup
      .string()
      .required(ValidationErrors.fieldRequired)
      .test('zip', ValidationErrors.zip.format, (val) => !!val && validateZip(val)),
  }),
});

export default ValidationSchema;
