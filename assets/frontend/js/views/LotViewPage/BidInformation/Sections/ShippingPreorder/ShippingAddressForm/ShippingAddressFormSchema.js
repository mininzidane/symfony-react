import * as yup from 'yup';
import ValidationErrors from '../../../../../../lib/utils/ValidationErrors';
import ValidationService from '../../../../../../lib/utils/ValidationService';
import ShippingOrderService from '../../../../../../api/ShippingOrderService';

const { TypeDomestic, TypeInternational, TypeBorderCrossing } = ShippingOrderService;
const { validateZip } = ValidationService;
const { fieldRequired, selectFromDropdown, email, stringLength } = ValidationErrors;
const ShippingAddressFormSchema = yup.object().shape({
  countryId: yup.string().required(ValidationErrors.fieldRequired),
  address: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup
      .string()
      .required(fieldRequired)
      .test('zip', selectFromDropdown, function testZip(val) {
        return !!val && validateZip(this.parent.zip);
      }),
  }),
  destinationId: yup.mixed().when('shippingType', {
    is: TypeBorderCrossing,
    then: yup.number().typeError(fieldRequired).required(fieldRequired),
  }),
  firstName: yup.string().when('shippingType', {
    is: TypeDomestic || TypeBorderCrossing,
    then: yup.string().required(fieldRequired),
  }),
  lastName: yup.string().when('shippingType', {
    is: TypeDomestic || TypeBorderCrossing,
    then: yup.string().required(fieldRequired),
  }),
  phoneNumber: yup.string().when('shippingType', {
    is: TypeDomestic || TypeBorderCrossing,
    then: yup.string().required(fieldRequired),
  }),
  email: yup.string().when('shippingType', {
    is: TypeDomestic || TypeBorderCrossing,
    then: yup.string().email(email.format).required(fieldRequired),
  }),
  consignee: yup.string().when('shippingType', {
    is: TypeInternational,
    then: yup.string().trim().required(fieldRequired),
  }),
  comment: yup.string().max(512, stringLength),
});

export default ShippingAddressFormSchema;
