import * as yup from 'yup';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

const { fieldRequired, zip, email } = ValidationErrors;
const { validateZip } = ValidationService;

const validationSchema = yup.object().shape({
  // Account Information
  firstName: yup.string().required(fieldRequired),
  lastName: yup.string().required(fieldRequired),
  phoneNumber: yup.string().required(fieldRequired),
  email: yup.string().email(email.format).required(fieldRequired),
  // Physical Address
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
  // Mailing Address
  mailingName: yup.string().when('mailingAsPhysical', {
    is: false,
    then: yup.string().required(fieldRequired),
  }),
  mailingPhone: yup.string().when('mailingAsPhysical', {
    is: false,
    then: yup.string().required(fieldRequired),
  }),
  mailingAddress: yup.mixed().when(['mailingAsPhysical', 'invoiceCompany'], {
    is: (mailingAsPhysical, invoiceCompany) => !mailingAsPhysical && !invoiceCompany,
    then: yup.mixed().required(fieldRequired),
  }),
  mailingApartment: yup.mixed().when(['mailingAsPhysical', 'invoiceCompany'], {
    is: (mailingAsPhysical, invoiceCompany) => !mailingAsPhysical && !invoiceCompany,
    then: yup.string(),
  }),
  mailingCity: yup.string().when(['mailingAsPhysical', 'invoiceCompany'], {
    is: (mailingAsPhysical, invoiceCompany) => !mailingAsPhysical && !invoiceCompany,
    then: yup.string().required(fieldRequired),
  }),
  mailingState: yup.string().when(['mailingAsPhysical', 'invoiceCompany'], {
    is: (mailingAsPhysical, invoiceCompany) => !mailingAsPhysical && !invoiceCompany,
    then: yup.string().when('mailingCountry', {
      is: (mailingCountry) => mailingCountry === `${ShippingOrderService.CountryIdUS}`,
      then: yup.string().required(fieldRequired),
    }),
  }),
  mailingZip: yup.string().when(['mailingAsPhysical', 'invoiceCompany'], {
    is: (mailingAsPhysical, invoiceCompany) => !mailingAsPhysical && !invoiceCompany,
    then: yup.string().when('mailingCountry', {
      is: (mailingCountry) => mailingCountry === `${ShippingOrderService.CountryIdUS}`,
      then: yup.string().required(fieldRequired).test('zip', zip.format, validateZip),
      otherwise: yup.string().required(fieldRequired),
    }),
  }),
  mailingCountry: yup.string().when(['mailingAsPhysical', 'invoiceCompany'], {
    is: (mailingAsPhysical, invoiceCompany) => !mailingAsPhysical && !invoiceCompany,
    then: yup.string().required(fieldRequired),
  }),
  blCount: yup.string().when('blAmountFixed', {
    is: (value) => value === '1',
    then: yup
      .string()
      .required(fieldRequired)
      .test('blCount', fieldRequired, (value) => parseInt(value.replace(/[^0-9.]/g, ''), 10) > 0),
  }),
  blAmount: yup.string().when('blAmountFixed', {
    is: (value) => value === '1',
    then: yup
      .string()
      .required(fieldRequired)
      .test('blAmount', fieldRequired, (value) => parseInt(value.replace(/[^0-9.]/g, ''), 10) > 0),
  }),
});

export default validationSchema;
