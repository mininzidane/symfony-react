import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import STEPS from './steps';

const { validateZip } = ValidationService;

function checkVehicleFields(value) {
  const { vin, year, make, model } = this.parent;
  return !!vin || (!vin && !year && !make && !model) || (!vin && !!value);
}

const validationSchema = yup.lazy((values) => {
  if (values.step === STEPS.CONTACTS) {
    return yup.object().shape({
      firstName: yup
        .string()
        .trim()
        .matches(ValidationService.asciiPrintableRegex, {
          message: ValidationErrors.characterValidation,
        })
        .required(ValidationErrors.fieldRequired),
      lastName: yup
        .string()
        .trim()
        .matches(ValidationService.asciiPrintableRegex, {
          message: ValidationErrors.characterValidation,
        })
        .required(ValidationErrors.fieldRequired),
      phoneNumber: yup
        .string()
        .required(ValidationErrors.fieldRequired)
        .test('phoneNumber', ValidationErrors.phone.format, ValidationService.validatePhoneNumber),
      email: yup.string().trim().email(ValidationErrors.email.format).required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.VIN) {
    return yup.object().shape({
      vin: yup.string().when(['year', 'make', 'model'], {
        is: (year, make, model) => !!year || !!make || !!model,
        otherwise: yup
          .string()
          .required(ValidationErrors.fieldRequired)
          .test('validate vin', ValidationErrors.vin.format, function testVin(val) {
            return val?.length === 17 && ValidationService.validateVin(val) && this.parent.vinValid;
          }),
      }),
      year: yup.string().test('', ValidationErrors.fieldRequired, checkVehicleFields),
      make: yup.string().test('', ValidationErrors.fieldRequired, checkVehicleFields),
      model: yup.string().test('', ValidationErrors.fieldRequired, checkVehicleFields),
    });
  }

  if (values.step === STEPS.TITLE_TYPE) {
    return yup.object().shape({
      titleType: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.CAR_PAID_OFF) {
    return yup.object().shape({
      carPaidOff: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.ZIP) {
    return yup.object().shape({
      zip: yup
        .string()
        .required(ValidationErrors.fieldRequired)
        .test('zip', ValidationErrors.zip.format, function testZip(val) {
          return !!val && validateZip(val) && this.parent.zipValid;
        }),
    });
  }

  if (values.step === STEPS.WHEELS_AND_TIRES) {
    return yup.object().shape({
      wheelsAndTires: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.KEYS) {
    return yup.object().shape({
      keys: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.CONDITION_TYPE) {
    return yup.object().shape({
      conditionType: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.UNDER_THE_HOOD) {
    return yup.object().shape({
      underTheHood: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.MILEAGE) {
    return yup.object().shape({
      mileage: yup.number().when('unableToVerifyMileage', {
        is: (unableToVerifyMileage) => unableToVerifyMileage === '1',
        otherwise: yup
          .number()
          .typeError(ValidationErrors.numericType)
          .moreThan(0, ValidationErrors.fieldRequired)
          .required(ValidationErrors.fieldRequired),
      }),
    });
  }

  if (values.step === STEPS.REMOVED_OR_LOOSE_EXTERIOR_PANELS) {
    return yup.object().shape({
      removedOrLooseExteriorPanels: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.BODY_DAMAGE) {
    return yup.object().shape({
      bodyDamage: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.MIRRORS_GLASS_OR_LIGHTS_DAMAGE) {
    return yup.object().shape({
      mirrorsGlassOrLightsDamage: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.FLOOD_OR_FIRE_DAMAGE) {
    return yup.object().shape({
      floodOrFireDamage: yup.string().required(ValidationErrors.fieldRequired),
    });
  }

  if (values.step === STEPS.PHOTOS_ADDITIONAL) {
    return yup.object().shape({
      photos: yup
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
        .required(ValidationErrors.upload.fileRequired),
    });
  }

  if (values.step === STEPS.VIN_ADDITIONAL) {
    return yup.object().shape({
      vin: yup
        .string()
        .required(ValidationErrors.fieldRequired)
        .test('validate vin', ValidationErrors.vin.format, function testVin(val) {
          return val?.length === 17 && ValidationService.validateVin(val) && this.parent.vinValid;
        }),
    });
  }

  if (values.step === STEPS.ACCEPT_OFFER) {
    return yup.object().shape({
      address: yup.string().when('schedulePickUp', {
        is: true,
        then: yup
          .string()
          .required(ValidationErrors.fieldRequired)
          .test('validate', 'Please enter a valid address', function testAddress(val) {
            return val && this.parent.pickupAddress && this.parent.zip;
          }),
      }),
      pickupDate: yup.string().when('schedulePickUp', {
        is: true,
        then: yup.string().required(ValidationErrors.fieldRequired),
      }),
      pickupTime: yup.string().when('schedulePickUp', {
        is: true,
        then: yup.string().required(ValidationErrors.fieldRequired),
      }),
    });
  }

  return yup.object().shape({});
});

export default validationSchema;
