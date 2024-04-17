import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const Schema = yup.object().shape({
  vin: yup.string().required(required),
  year: yup.string().required(required),
  make: yup.string().required(required),
  model: yup.string().required(required),
  trim: yup.string().required(required),
  country: yup.string().required(required),
  vehicleType: yup.string().required(required),
  odometer: yup.string().required(required),
  odometerBrand: yup.string().required(required),
  color: yup.string().required(required),
  bodyStyle: yup.string().required(required),
  engine: yup.string().required(required),
  cylinders: yup.string().required(required),
  transmission: yup.string().required(required),
  drive: yup.string().required(required),
  titleCategory: yup.string().required(required),
  titleStateCode: yup.string().required(required),
  title: yup.string().required(required),
  condition: yup.string().required(required),
  whereIsVehicleStatus: yup.string().required(required),
  location: yup.string().required(required),
  price: yup.string().required(required),
  active: yup.number().required(required),
});

export default Schema;
