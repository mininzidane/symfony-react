import * as yup from 'yup';
import ValidationErrors from 'backend/js/lib/ValidationErrors';

const { fieldRequired } = ValidationErrors;

const validationSchema = yup.object().shape({
  amountTowardsInvoice: yup
    .number()
    .transform((_, value) => Number(value.replace(/[^0-9.]/g, '')))
    .when('invoiceId', {
      is: (invoiceId) => invoiceId.length > 0,
      then: yup
        .number()
        .test('validate amount', 'Error. You cannot apply an amount greater than received.', function maxValue(value) {
          return !this.parent.amountReceived || value <= this.parent.amountReceived;
        })
        .min(1, fieldRequired)
        .required(fieldRequired),
    }),
  paymentAppliedDate: yup.string().nullable().required(fieldRequired),
});

export default validationSchema;
