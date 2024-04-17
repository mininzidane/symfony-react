import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CustomerService from 'frontend/js/api/CustomerService';
import { useFormik } from 'formik';
import { FormattedMessage } from 'react-intl-phraseapp';
import Button from 'frontend/js/components/Button';
import validationSchema from './validationSchema';

function Phone({ onChange, value, isDisabled }) {
  const { id } = useCustomerHelper();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values, { setFieldError }) {
    const { phoneNumber } = values;

    const payload = {
      textNotifications: '1',
      mobilePhone: phoneNumber,
    };

    try {
      setIsLoading(true);
      await CustomerService.textNotifications(id, payload);
      onChange(phoneNumber);
      window.dispatchEvent(new CustomEvent('textNotificationsPhoneSet'));
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const { errors } = response.data;

        if (typeof errors === 'object') {
          setFieldError('phoneNumber', errors.mobilePhone);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: { phoneNumber: value },
    onSubmit,
    validationSchema,
  });

  const hasSubmitButton = value !== formik.values.phoneNumber;

  return (
    <>
      <PhoneInputPlane
        id="phoneNumber"
        name="phoneNumber"
        onBlur={formik.setFieldTouched}
        value={formik.values.phoneNumber}
        error={formik.errors.phoneNumber}
        touched={formik.touched.phoneNumber}
        onChange={formik.setFieldValue}
        disabled={isDisabled}
      />
      {hasSubmitButton && (
        <Button
          className="mt-10"
          onClick={formik.handleSubmit}
          label={<FormattedMessage id="shared.cta.submit" />}
          isLoading={isLoading}
          isDisabled={isDisabled}
        />
      )}
    </>
  );
}

Phone.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

Phone.defaultProps = {
  value: '',
  isDisabled: false,
};

export default Phone;
