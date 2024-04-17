import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import AddressFieldsFormik from 'backend/js/views/_Shared/Forms/AddressFieldsFormik';
import SubmitButton from 'backend/js/components/SubmitButton';
import Input from 'backend/js/components/Form/Input';
import BaseApiService from 'backend/js/api/BaseApiService';
import CountryService from 'backend/js/api/CountryService';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import validationSchema from './validationSchema';

function PickupAddress({ instantOffer, setInstantOffer, setInstantOfferChangeLogs, setModalContent }) {
  const { enqueueSnackbar } = useSnackbar();
  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.addPickupAddress(values.ref, {
        pickupContactName: values.contactName,
        pickupPhone: values.phone,
        pickupCity: values.city,
        pickupApartment: values.apartment,
        pickupState: values.state,
        pickupCountry: values.country,
        pickupAddress: values.address,
        zip: values.zip,
      });
      enqueueSnackbar('Pickup info saved successfully', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });

      setSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      ref: instantOffer.ref,
      zip: instantOffer.zip || '',
      address: instantOffer.pickupAddress || '',
      apartment: instantOffer.pickupApartment || '',
      city: instantOffer.pickupCity || '',
      state: instantOffer.pickupState?.id || '',
      country: instantOffer.pickupCountry?.id || CountryService.COUNTRIES.usa.code,
      contactName: instantOffer.pickupContactName || '',
      phone: instantOffer.pickupPhone || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-md mb-10">Pickup contact name:</div>
      <div className="m-b">
        <Input
          id="contactName"
          name="contactName"
          placeholder="Contact Name"
          value={formik.values.contactName}
          error={formik.errors.contactName}
          touched={formik.touched.contactName}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
        />
        <div className="text-md mb-10">Pickup phone:</div>
        <Input
          id="phone"
          name="phone"
          placeholder="Phone"
          value={formik.values.phone}
          error={formik.errors.phone}
          touched={formik.touched.phone}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
        />

        <div className="text-md mb-10">Pickup address:</div>
        <AddressFieldsFormik formik={formik} countryDisabled restrictCountry="us" />
      </div>
      <SubmitButton
        label="Save"
        className="btn-primary"
        isLoading={formik.isSubmitting}
        disabled={formik.isSubmitting}
      />
    </form>
  );
}

PickupAddress.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

export default PickupAddress;
