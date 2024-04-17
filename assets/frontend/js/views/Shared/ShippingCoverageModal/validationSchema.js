import * as yup from 'yup';
import ValidationErrors from 'frontend/js/lib/utils/ValidationErrors';

const { fieldRequired } = ValidationErrors;

const validationSchema = yup.object().shape({
  vehiclePrice: yup.string().when('isLotPurchase', {
    is: false,
    then: yup.string().required(fieldRequired),
  }),
  insuranceType: yup.number().required(fieldRequired),
  unlimitedAuctionStorage: yup.boolean(),
});

export default validationSchema;
