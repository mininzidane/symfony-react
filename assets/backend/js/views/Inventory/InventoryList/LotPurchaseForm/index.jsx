import { Formik } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Input from 'backend/js/components/Form/Input';
import SubmitButton from 'backend/js/components/SubmitButton';
import InventoryService from 'backend/js/api/InventoryService';
import PhoneInput from 'backend/js/components/Form/PhoneInput';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import BaseApiService from 'backend/js/api/BaseApiService';
import LotPurchaseFormValidationSchema from './LotPurchaseFormValidationSchema';

function LotPurchaseForm({ stockNumber, price, setModalContent }) {
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const { lotPurchase } = await InventoryService.createLotPurchase(stockNumber, values);
      enqueueSnackbar(`Purchase ${lotPurchase.token} created successfully`, { variant: 'success' });
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message || 'An error occurred on submit', { variant: 'error' });
    }

    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={{
        isNewUser: false,
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        price: price || '',
      }}
      enableReinitialize
      validationSchema={LotPurchaseFormValidationSchema}
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormikTickbox onChange={setFieldValue} name="isNewUser" id="isNewUser" value={values.isNewUser}>
            New User?
          </FormikTickbox>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            value={values.email}
            error={errors.email}
            touched={touched.email}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />
          {values.isNewUser && (
            <>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={values.firstName}
                error={errors.firstName}
                touched={touched.firstName}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                onError={setFieldError}
              />
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={values.lastName}
                error={errors.lastName}
                touched={touched.lastName}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                onError={setFieldError}
              />
              <PhoneInput
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={values.phoneNumber}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                onError={setFieldError}
                inputComponent={Input}
              />
            </>
          )}
          <Input
            id="price"
            name="price"
            placeholder="Price"
            value={values.price}
            error={errors.price}
            touched={touched.price}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />

          <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );
}

LotPurchaseForm.propTypes = {
  stockNumber: PropTypes.number.isRequired,
  setModalContent: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};

LotPurchaseForm.defaultProps = {};

export default LotPurchaseForm;
