import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import BaseApiService from 'backend/js/api/BaseApiService';
import SubmitButton from 'backend/js/components/SubmitButton';
import Select from 'backend/js/components/Form/Select';
import InstantOfferService from 'backend/js/api/InstantOfferService';

function CreateCarrierLabelForm({ instantOffer, setInstantOffer, setAddLabelModalContent }) {
  const { enqueueSnackbar } = useSnackbar();
  const instantOfferService = new InstantOfferService();
  const { data: { carrierServiceTypes = [] } = {}, isLoading } = useQuery('carrier_service_types', () =>
    instantOfferService.getCarrierServiceTypes(instantOffer.ref),
  );

  async function onSubmitCreateCarrierLabel(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const response = await instantOfferService.createCarrierLabel(instantOffer.ref, {
        carrierServiceType: values.carrierServiceType,
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
        carrierServiceType: '',
      },
      enableReinitialize: true,
      onSubmit: onSubmitCreateCarrierLabel,
    });

  if (isLoading) {
    return (
      <div>
        <SpinnerWheel size={40} thickness={3} color="gray-dark" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Select
        id="carrierServiceType"
        name="carrierServiceType"
        placeholder="Service Type"
        className="react-select-hollow m-b"
        options={carrierServiceTypes.map((carrierServiceType) => ({
          label: carrierServiceType.name,
          value: carrierServiceType.objectKey,
        }))}
        value={values.carrierServiceType}
        error={errors.carrierServiceType}
        touched={touched.carrierServiceType}
        onBlur={setFieldTouched}
        onChange={setFieldValue}
        onError={setFieldError}
      />

      <SubmitButton label="Get label" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
    </form>
  );
}

CreateCarrierLabelForm.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
  setAddLabelModalContent: PropTypes.func.isRequired,
};

export default CreateCarrierLabelForm;
