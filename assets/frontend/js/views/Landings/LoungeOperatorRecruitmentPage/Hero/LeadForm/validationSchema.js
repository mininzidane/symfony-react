import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

const { fieldRequired, phone, email, characterValidation, upload } = ValidationErrors;
const { asciiPrintableRegex, validatePhoneNumber } = ValidationService;

const validationSchema = [
  yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .matches(asciiPrintableRegex, { message: characterValidation })
      .required(fieldRequired),
    lastName: yup
      .string()
      .trim()
      .matches(asciiPrintableRegex, { message: characterValidation })
      .required(fieldRequired),
    phoneNumber: yup.string().required(fieldRequired).test('phoneNumber', phone.format, validatePhoneNumber),
    email: yup.string().trim().email(email.format).required(fieldRequired),
    country: yup.string().required(fieldRequired),
  }),
  yup.object().shape({
    businessName: yup.string().required(fieldRequired),
    website: yup.string().required(fieldRequired),
    isCarsImporter: yup.string().required(fieldRequired),
    annualVolume: yup.string().when('isCarsImporter', {
      is: '1',
      then: yup.string().required(fieldRequired),
    }),
  }),
  yup.object().shape({
    hasOffice: yup.string().required(fieldRequired),
    officeAddress: yup.string().when('hasOffice', {
      is: '1',
      then: yup.string().required(fieldRequired),
    }),
    officePhotos: yup.array().when('hasOffice', {
      is: '1',
      then: yup
        .array()
        .of(
          yup
            .object()
            .shape({
              name: yup.string.required,
              path: yup.string.required,
              type: yup.string.required,
              size: yup.number.required,
              lastModified: yup.number.required,
            })
            .nullable(),
        )
        .required(upload.fileRequired),
    }),
  }),
  yup.object().shape({
    hasStaffing: yup.string().required(fieldRequired),
    staffMembersInfo: yup.string().when('hasStaffing', {
      is: '1',
      then: yup.string().required(fieldRequired),
    }),
    additionalInfo: yup.string(),
  }),
];

export default validationSchema;
