import React, { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import BaseApiService from 'backend/js/api/BaseApiService';
import SubmitButton from 'backend/js/components/SubmitButton';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import Input from 'backend/js/components/Form/Input';
import DatePicker from 'backend/js/components/DatePicker';
import PaymentService from 'backend/js/api/PaymentService';
import RouterService from 'backend/js/api/RouterService';
import InstantOfferRecordPaymentFormValidationSchema from './InstantOfferRecordPaymentFormValidationSchema';
import CarrierLabel from './CarrierLabel';

function RecordPaymentForm({
  instantOffer: initInstantOffer,
  setInstantOffer: setInstantOfferParent,
  setInstantOfferChangeLogs,
  setModalContent,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [instantOffer, setInstantOffer] = useState(initInstantOffer);
  const instantOfferService = new InstantOfferService();
  const ABSENT_PRINT_SAMPLE_STATES = ['AP', 'GU', 'MP', 'PW', 'VI', 'PR'];

  function updateInstantOffer(newInstantOffer) {
    setInstantOfferParent(newInstantOffer);
    setInstantOffer(newInstantOffer);
  }

  async function onSubmitRecordPayment(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const response = await instantOfferService.recordPaymentMethod(values.ref, {
        paymentRefNumber: values.paymentRefNumber,
        paidAmount: values.paidAmount,
        paymentDate: values.paymentDate,
        paymentNotes: values.paymentNotes,
      });

      enqueueSnackbar('Payment was saved successfully', { variant: 'success' });
      updateInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });

      setSubmitting(false);
    }
  }

  const { values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit } =
    useFormik({
      initialValues: {
        ref: instantOffer.ref,
        paymentRefNumber: instantOffer.paymentRefNumber || '',
        paidAmount: instantOffer.paidAmount || instantOffer.offerAmount || '',
        paymentDate: instantOffer.paymentDate || new Date().toLocaleDateString('en-US'),
        paymentNotes: instantOffer.paymentNotes || '',
      },
      enableReinitialize: true,
      validationSchema: InstantOfferRecordPaymentFormValidationSchema,
      onSubmit: onSubmitRecordPayment,
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="text-md mb-10">
          Payment method: <b>{instantOffer.payMethod}</b>
        </div>
        {instantOffer.payMethod === PaymentService.METHOD.CHECK_BY_FEDEX &&
          instantOffer.payMethodAdditionalInfo?.nameOnCheck && (
            <div className="text-md mb-10">
              Name on Check: <b>{instantOffer.payMethodAdditionalInfo.nameOnCheck}</b>
            </div>
          )}
        <div className="text-md mb-10">Payment ref#:</div>
        <Input
          id="paymentRefNumber"
          name="paymentRefNumber"
          value={values.paymentRefNumber}
          error={errors.paymentRefNumber}
          touched={touched.paymentRefNumber}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          onError={setFieldError}
        />

        <div className="text-md mb-10">Amount:</div>
        <Input
          id="paidAmount"
          name="paidAmount"
          value={values.paidAmount}
          error={errors.paidAmount}
          touched={touched.paidAmount}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          onError={setFieldError}
        />

        <div className="text-md mb-10">Payment date:</div>

        <div className="form-group">
          <DatePicker
            placeholder="Payment date"
            value={new Date(values.paymentDate)}
            onChange={(value) => {
              setFieldValue('paymentDate', value);
            }}
            onBlur={() => setFieldTouched('paymentDate')}
            className="form-group"
          />
        </div>

        {instantOffer.payMethod === PaymentService.METHOD.CHECK_BY_FEDEX && (
          <div className="mb-10">
            <CarrierLabel instantOffer={instantOffer} setInstantOffer={updateInstantOffer} />
          </div>
        )}

        <div className="p-r">
          <div className="text-md mb-10">Payment notes:</div>
          <Input
            id="paymentNotes"
            name="paymentNotes"
            value={values.paymentNotes}
            error={errors.paymentNotes}
            touched={touched.paymentNotes}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />
        </div>
        <div className="text-xs mt-10">
          Instruction:{' '}
          <a
            target="_blank"
            href={RouterService.getRoute('instantOffersInstructions', null, { ref: instantOffer.ref })}
            rel="noreferrer"
          >
            print
          </a>
        </div>
        <div className="text-xs mt-10">
          Power of Attorney:{' '}
          <a
            target="_blank"
            href={RouterService.getRoute('instantOffersPowerOfAttorney', null, { ref: instantOffer.ref })}
            rel="noreferrer"
          >
            print
          </a>
        </div>
        {instantOffer.titleState && !ABSENT_PRINT_SAMPLE_STATES.includes(instantOffer.titleState.code) && (
          <div className="text-xs mt-10">
            How to Sign:{' '}
            <a
              target="_blank"
              href={RouterService.getRoute('instantOffersHowToSign', null, { ref: instantOffer.ref })}
              rel="noreferrer"
            >
              print
            </a>
          </div>
        )}
      </div>

      <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
    </form>
  );
}

RecordPaymentForm.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

export default RecordPaymentForm;
