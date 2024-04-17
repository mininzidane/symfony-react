import * as yup from 'yup';
import ValidateErrors from '../../../lib/ValidationErrors';
import ShippingOrderService from '../../../api/ShippingOrderService';

const { required } = ValidateErrors;
const { TypeDomestic, TypeBorderCrossing, TypeInternational } = ShippingOrderService;

const ShippingOrderFormSchema = yup.object().shape({
  country: yup
    .object()
    .shape({ id: yup.number().required(required) })
    .typeError(required)
    .required(required),
  destination: yup
    .object()
    .typeError(required)
    .when('shippingType', {
      is: TypeBorderCrossing,
      then: yup.object().shape({ id: yup.number() }).typeError(required).required(required),
    }),
  address: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(required),
  }),
  city: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(required),
  }),
  state: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(required),
  }),
  zip: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(required),
  }),
  consignee: yup.string().when('shippingType', {
    is: TypeInternational,
    then: yup.string().required(required),
  }),
  usPort: yup.object().when(['isCustomQuote', 'shippingType'], {
    is: (isCustomQuote, shippingType) => isCustomQuote && shippingType === TypeInternational,
    then: yup
      .object()
      .shape({
        id: yup.number(),
      })
      .required(required),
  }),
  customGroundQuote: yup.number().when('isCustomQuote', {
    is: true,
    then: yup.number().typeError('Invalid number provided').required(required),
  }),
  customOceanQuote: yup.number().when(['isCustomQuote', 'shippingType'], {
    is: (isCustomQuote, shippingType) => isCustomQuote && shippingType === TypeInternational,
    then: yup.number().typeError('Invalid number provided').required(required),
  }),
});

export default ShippingOrderFormSchema;
