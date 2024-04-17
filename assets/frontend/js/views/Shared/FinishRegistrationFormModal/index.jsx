import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import Button from 'frontend/js/components/Button';
import CustomerService from 'frontend/js/api/CustomerService';
import EditableInput from './EditableInput';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function FinishRegistrationFormModal({ isOpen, onSubmitSuccess }) {
  const intl = useIntl();
  const classes = useStyles();
  const {
    setCustomer,
    phoneNumberRaw: customerPhoneNumber,
    firstName: customerFirstName,
    lastName: customerLastName,
  } = useCustomerHelper();

  async function onSubmit(values, { setFieldError, setSubmitting }) {
    const { phoneNumber, firstName, lastName } = values;

    const payload = {
      phoneNumber,
      firstName,
      lastName,
    };

    try {
      setSubmitting(true);
      const { customer } = await CustomerService.changePhoneNumber(payload);
      setCustomer(customer);
      onSubmitSuccess(customer);
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
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      firstName: customerFirstName || '',
      lastName: customerLastName || '',
      phoneNumber: customerPhoneNumber || '',
    },
    onSubmit,
  });

  return (
    <ModalWindow isOpen={isOpen} onClose={() => {}} size="md">
      <ModalWindowBody isOverflowVisible className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.title}>
            {intl.formatMessage({ id: 'registerCongratulations.finishRegistration.title' })}
          </div>
          <div className={classes.description}>
            {intl.formatMessage({ id: 'registerCongratulations.finishRegistration.description' })}
          </div>
          <div className={classes.fields}>
            <EditableInput
              id="firstName"
              name="firstName"
              placeholder={intl.formatMessage({ id: 'shared.label.firstName' })}
              value={formik.values.firstName}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
            <EditableInput
              id="lastName"
              name="lastName"
              placeholder={intl.formatMessage({ id: 'shared.label.lastName' })}
              value={formik.values.lastName}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>
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
            label={intl.formatMessage({ id: 'registerCongratulations.finishRegistration.cta' })}
            onClick={formik.handleSubmit}
            isLoading={formik.isSubmitting}
            className={classes.cta}
          />
        </form>
      </ModalWindowBody>
    </ModalWindow>
  );
}

FinishRegistrationFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSubmitSuccess: PropTypes.func,
};

FinishRegistrationFormModal.defaultProps = {
  onSubmitSuccess: () => {},
};

export default FinishRegistrationFormModal;
