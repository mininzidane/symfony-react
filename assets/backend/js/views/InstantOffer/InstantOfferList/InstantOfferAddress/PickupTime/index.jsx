import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import BaseApiService from '../../../../../api/BaseApiService';
import SubmitButton from '../../../../../components/SubmitButton';
import InstantOfferService from '../../../../../api/InstantOfferService';
import InstantOfferPickupTimeFormValidationSchema from './InstantOfferPickupTimeFormValidationSchema';
import DatePicker from '../../../../../components/DatePicker';
import Select from '../../../../../components/Form/Select';

function InstantOfferPickupTime({ instantOffer, pickupTimes, setFlash, setModalContent, setInstantOfferChangeLogs }) {
  const instantOfferService = new InstantOfferService();

  async function onSubmitPickupTime(values, { setSubmitting }) {
    setSubmitting(true);
    setFlash({ message: '', type: 'error' });

    try {
      const response = await instantOfferService.addPickupTime(values.ref, {
        pickupDate: values.pickupDate,
        pickupTime: values.pickupTime,
      });
      setFlash({ message: 'Pickup info saved successfully', type: 'success' });
      instantOffer.pickupDate = response.instantOffer.pickupDate;
      instantOffer.pickupTime = response.instantOffer.pickupTime;
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });

      setSubmitting(false);
    }
  }

  const { values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit } =
    useFormik({
      initialValues: {
        ref: instantOffer.ref,
        pickupDate: instantOffer.pickupDate,
        pickupTime: instantOffer.pickupTime,
      },
      enableReinitialize: true,
      validationSchema: InstantOfferPickupTimeFormValidationSchema,
      onSubmit: onSubmitPickupTime,
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <DatePicker
          placeholder="Pickup date"
          value={values.pickupDate ? new Date(values.pickupDate) : null}
          onChange={(value) => {
            setFieldValue('pickupDate', value);
          }}
          onBlur={() => setFieldTouched('pickupDate')}
        />
      </div>
      <Select
        id="pickupTime"
        name="pickupTime"
        placeholder="Pickup Time"
        className="react-select-hollow m-b "
        value={values.pickupTime}
        error={errors.pickupTime}
        touched={touched.pickupTime}
        onBlur={setFieldTouched}
        options={pickupTimes.map((pickupTime) => ({
          label: pickupTime,
          value: pickupTime,
        }))}
        onChange={setFieldValue}
        onError={setFieldError}
      />
      <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
    </form>
  );
}

InstantOfferPickupTime.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setFlash: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  pickupTimes: PropTypes.array,
};

InstantOfferPickupTime.defaultProps = {
  pickupTimes: [],
};

export default InstantOfferPickupTime;
