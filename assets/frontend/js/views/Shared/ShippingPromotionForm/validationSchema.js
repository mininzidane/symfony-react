import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import t from 'frontend/js/api/TranslatorService';

const { TypeDomestic, TypeInternational, TypeBorderCrossing, getShippingTypeByCountryId } = ShippingOrderService;
const ValidationSchema = yup.object().shape({
  address: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  city: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  state: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  zip: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  contact: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  phone: yup.string().when('shippingType', {
    is: TypeDomestic,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  country: yup.string().when('shippingType', {
    is: TypeInternational,
    then: yup.string().required(ValidationErrors.fieldRequired),
  }),
  destination: yup.string().when('country', (countryId, schema) => {
    const country = parseInt(countryId, 10);
    const shippingType = getShippingTypeByCountryId(country);
    return shippingType === TypeBorderCrossing ? schema.required(ValidationErrors.fieldRequired) : schema;
  }),
  consignee: yup.string().when('country', (countryId, schema) => {
    const country = parseInt(countryId, 10);
    const shippingType = getShippingTypeByCountryId(country);
    return shippingType !== TypeBorderCrossing ? schema.required(ValidationErrors.fieldRequired) : schema;
  }),
  consentCheck: yup.boolean().when('isPreorder', {
    is: false,
    then: yup.boolean().oneOf([true], t('form.error.agreement')),
  }),
});

export default ValidationSchema;
