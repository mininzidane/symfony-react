import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import PlacesInput from 'backend/js/components/Form/PlacesInputPlane';
import { useQuery } from 'react-query';
import BaseApiService from 'backend/js/api/BaseApiService';
import SubmitButton from 'backend/js/components/SubmitButton';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import DatePicker from 'backend/js/components/DatePicker';
import Select from 'backend/js/components/Form/Select';
import schema from './schema';

function InstantOfferShippingForm({ instantOffer, pickupTimes, setFlash, setModalContent, setInstantOfferChangeLogs }) {
  const { data: copartLocations = [] } = useQuery('copartLocations', () =>
    ShippingOrderService.getCopartLocations(true),
  );

  async function onSubmit(values, { setSubmitting, setFieldError }) {
    setSubmitting(true);
    setFlash({ message: '', type: 'error' });

    try {
      if (!values.zip || !values.address) {
        setFieldError('fullAddress', 'Required');
      }

      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.placeShippingOrder(values.ref, {
        zip: values.zip,
        pickupAddress: values.address,
        pickupDate: values.pickupDate,
        pickupTime: values.pickupTime,
        nearestLocation: values.destination,
      });
      setFlash({ message: 'Order successfully placed', type: 'success' });
      instantOffer.pickupAddress = response.instantOffer.pickupAddress;
      instantOffer.zip = response.instantOffer.zip;
      instantOffer.pickupTime = response.instantOffer.pickupTime;
      instantOffer.pickupDate = response.instantOffer.pickupDate;
      instantOffer.nearestLocation = response.instantOffer.nearestLocation;
      instantOffer.activeShippingOrders = response.instantOffer.activeShippingOrders;
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={{
        ref: instantOffer.ref,
        fullAddress: [instantOffer.zip, instantOffer.pickupAddress].filter(Boolean).join(' '),
        pickupDate: instantOffer.pickupDate,
        pickupTime: instantOffer.pickupTime,
        destination: instantOffer.nearestLocation?.id,
        zip: instantOffer.zip || '',
        address: instantOffer.pickupAddress || '',
      }}
      enableReinitialize
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="text-md mb-10">Pickup info:</div>
          <div className="m-b">
            <PlacesInput
              label=""
              id="fullAddress"
              name="fullAddress"
              placeholder="Pickup Address"
              value={values.fullAddress}
              error={errors.fullAddress}
              touched={touched.fullAddress}
              restrictAddress
              applyMask={(val) => {
                if (typeof val !== 'object' || val === null) {
                  return val;
                }

                const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = val;
                return [gAddress, gCity, gState, gZip].filter(Boolean).join(' ');
              }}
              onChange={(name, value) => {
                if (typeof value === 'object') {
                  const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = value;
                  setFieldValue(name, [gAddress, gCity, gState, gZip].filter(Boolean).join(' '));
                  setFieldValue('zip', gZip);
                  setFieldValue('address', gAddress);
                } else {
                  setFieldValue(name, value);
                  setFieldValue('address', '');
                  setFieldValue('zip', '');
                }
              }}
              onError={setFieldError}
              onBlur={setFieldTouched}
            />
          </div>
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
            className="react-select-hollow m-b"
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

          <div className="text-md mb-10">Destination:</div>
          <Select
            id="destination"
            name="destination"
            placeholder="Destination"
            className="react-select-hollow m-b "
            value={values.destination}
            error={errors.destination}
            touched={touched.destination}
            onBlur={setFieldTouched}
            options={copartLocations
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((location) => ({
                label: location.name,
                value: location.id,
              }))}
            onChange={setFieldValue}
            onError={setFieldError}
          />

          <SubmitButton label="Order" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );
}

InstantOfferShippingForm.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setFlash: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  pickupTimes: PropTypes.array,
};

InstantOfferShippingForm.defaultProps = {
  pickupTimes: [],
};

export default InstantOfferShippingForm;
