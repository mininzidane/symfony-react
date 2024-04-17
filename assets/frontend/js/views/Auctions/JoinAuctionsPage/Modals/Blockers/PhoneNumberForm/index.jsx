import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import CustomerService from 'frontend/js/api/CustomerService';
import Button from 'frontend/js/components/Button';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function PhoneNumberForm({ label, onClick, onSubmitSuccess }) {
  const classes = useStyles();

  async function onSubmit(values, { setFieldError, setSubmitting }) {
    const { phoneNumber } = values;

    const payload = {
      phoneNumber,
    };

    try {
      setSubmitting(true);
      await CustomerService.changePhoneNumber(payload);
      await onSubmitSuccess();
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const { errors } = response.data;
        if (typeof errors === 'object') {
          setFieldError('phoneNumber', errors.customer_phone_number);
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <div className={classes.root}>
      <PhoneInputPlane
        id="phoneNumber"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        error={formik.errors.phoneNumber}
        touched={formik.touched.phoneNumber}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
      />
      <Button
        label={label}
        onClick={() => {
          onClick();
          formik.handleSubmit();
        }}
        isLoading={formik.isSubmitting}
      />
    </div>
  );
}

PhoneNumberForm.defaultProps = {
  onClick: () => {},
  onSubmitSuccess: () => {},
};

PhoneNumberForm.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
};

export default PhoneNumberForm;
