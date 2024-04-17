import * as yup from 'yup';
import ValidateErrors from 'backend/js/lib/ValidationErrors';

const { required } = ValidateErrors;
const InstantOfferSendFileNotificationFormValidationSchema = yup.object().shape({
  channelType: yup.string().required(required),
});

export default InstantOfferSendFileNotificationFormValidationSchema;
