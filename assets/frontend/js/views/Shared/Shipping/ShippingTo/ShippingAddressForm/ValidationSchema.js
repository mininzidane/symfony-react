import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

const { TypeDomestic, TypeBorderCrossing } = ShippingOrderService;
const { validateZip } = ValidationService;
const { fieldRequired, selectFromDropdown } = ValidationErrors;

const ValidationSchema = yup.object().shape({
  countryId: yup.string().required(ValidationErrors.fieldRequired),
  destinationId: yup.mixed().when('shippingType', {
    is: TypeBorderCrossing,
    then: yup.number().typeError(fieldRequired).required(fieldRequired),
  }),
  place: yup.mixed().when('shippingType', {
    is: TypeDomestic,
    then: yup
      .mixed()
      .required(fieldRequired)
      .test('zip', selectFromDropdown, function testZip(val) {
        return !!val && validateZip(this.parent.zip);
      }),
  }),
});

export default ValidationSchema;
