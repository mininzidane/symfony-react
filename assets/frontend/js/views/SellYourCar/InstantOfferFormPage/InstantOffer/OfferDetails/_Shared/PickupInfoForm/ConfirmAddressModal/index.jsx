import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import CountryService from 'frontend/js/api/CountryService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import AddressFieldsFormik from 'frontend/js/views/Shared/AddressFieldsFormik';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function ConfirmAddressModal({
  isOpen,
  onClose,
  onSubmitPickupInfo,
  pickupAddress,
  pickupApartment,
  pickupCity,
  pickupStateCode,
  pickupState,
  zip,
}) {
  const classes = useStyles();
  const intl = useIntl();

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    const result = await onSubmitPickupInfo({
      pickupAddress: values.address,
      pickupApartment: values.apartment,
      pickupCity: values.city,
      pickupState: values.state,
      pickupCountry: values.country,
      zip: values.zip,
    });
    if (result) {
      onClose();
    }
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      address: pickupAddress || '',
      apartment: pickupApartment || '',
      city: pickupCity || '',
      stateCode: pickupStateCode || '',
      state: pickupState || '',
      zip: zip || '',
      country: CountryService.COUNTRIES.usa.code,
    },
    validationSchema,
    onSubmit,
  });

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={432} rootClassName={classes.root}>
      <ModalWindowHeader
        onClose={onClose}
        title={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.confirmAddressForPickUp' })}
      />
      <ModalWindowBody hasFooter className={classes.body} isOverflowVisible>
        <AddressFieldsFormik formik={formik} countryDisabled restrictCountry="us" />
      </ModalWindowBody>
      <ModalWindowFooter className={classes.footer}>
        <Button
          label={intl.formatMessage({ id: 'shared.done' })}
          isLoading={formik.isSubmitting}
          onClick={formik.submitForm}
          isNowrap
        />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

ConfirmAddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitPickupInfo: PropTypes.func.isRequired,
  pickupAddress: PropTypes.string,
  pickupApartment: PropTypes.string,
  pickupCity: PropTypes.string,
  pickupStateCode: PropTypes.string,
  pickupState: PropTypes.number,
  zip: PropTypes.string,
};

ConfirmAddressModal.defaultProps = {
  pickupAddress: '',
  pickupApartment: '',
  pickupCity: '',
  pickupStateCode: '',
  pickupState: '',
  zip: '',
};

export default ConfirmAddressModal;
