import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

const { fieldRequired, zip } = ValidationErrors;
const { validateZip } = ValidationService;

const validationSchema = yup.object().shape({
  address: yup.mixed().required(fieldRequired),
  city: yup.string().required(fieldRequired),
  state: yup.string().when('country', {
    is: (country) => country === `${ShippingOrderService.CountryIdUS}`,
    then: yup.string().required(fieldRequired),
  }),
  zip: yup.string().when('country', {
    is: `${ShippingOrderService.CountryIdUS}`,
    then: yup.string().required(fieldRequired).test('zip', zip.format, validateZip),
  }),
  country: yup.string().required(fieldRequired),
});

export default validationSchema;
