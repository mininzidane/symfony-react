import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import BaseApiService from 'backend/js/api/BaseApiService';
import SubmitButton from 'backend/js/components/SubmitButton';
import { useSnackbar } from 'notistack';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import Input from 'backend/js/components/Form/Input';

function AssignCarrierLabelForm({ instantOffer, setInstantOffer, setAddLabelModalContent }) {
  const { enqueueSnackbar } = useSnackbar();
  const instantOfferService = new InstantOfferService();

  async function onSubmitAssignCarrierLabel(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const response = await instantOfferService.assignCarrierLabel(instantOffer.ref, {
        trackingNumber: values.trackingNumber,
      });
      setInstantOffer(response.instantOffer);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }
    setSubmitting(false);
    setAddLabelModalContent(null);
  }

  const { values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit } =
    useFormik({
      initialValues: {
        trackingNumber: '',
      },
      enableReinitialize: true,
      onSubmit: onSubmitAssignCarrierLabel,
    });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="trackingNumber"
        name="trackingNumber"
        placeholder="Tracking number"
        value={values.trackingNumber}
        error={errors.trackingNumber}
        touched={touched.trackingNumber}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        onError={setFieldError}
      />

      <SubmitButton label="Add label" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
    </form>
  );
}

AssignCarrierLabelForm.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
  setAddLabelModalContent: PropTypes.func.isRequired,
};

export default AssignCarrierLabelForm;
