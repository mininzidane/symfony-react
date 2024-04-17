import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import Button from 'frontend/js/components/Button';
import ButtonLink from 'frontend/js/components/ButtonLink';
import CustomerService from 'frontend/js/api/CustomerService';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function PhoneNumberFormModal({ isOpen, onClose, onSubmitSuccess }) {
  const intl = useIntl();
  const classes = useStyles();

  async function onSubmit(values, { setFieldError, setSubmitting }) {
    const { phoneNumber } = values;

    const payload = {
      phoneNumber,
    };

    try {
      setSubmitting(true);
      const { customer } = await CustomerService.changePhoneNumber(payload);
      onSubmitSuccess(customer);
      onClose();
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
      phoneNumber: '',
    },
    onSubmit,
  });

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} size="md">
      <ModalWindowHeader title={intl.formatMessage({ id: 'shared.label.phoneNumber' })} onClose={onClose} />
      <ModalWindowBody isOverflowVisible className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.title}>{intl.formatMessage({ id: 'phoneNumberFormModal.addYourPhoneNumber' })}</div>
          <div className={classes.description}>{intl.formatMessage({ id: 'phoneNumberFormModal.description' })}</div>
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
            label={intl.formatMessage({ id: 'shared.cta.addPhoneNumber' })}
            onClick={formik.handleSubmit}
            isLoading={formik.isSubmitting}
            className={classes.cta}
          />
          <div className={classes.close}>
            <ButtonLink label={intl.formatMessage({ id: 'shared.cta.cancel' })} onClick={onClose} />
          </div>
        </form>
      </ModalWindowBody>
    </ModalWindow>
  );
}

PhoneNumberFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
};

PhoneNumberFormModal.defaultProps = {
  onClose: () => {},
  onSubmitSuccess: () => {},
};

export default PhoneNumberFormModal;
