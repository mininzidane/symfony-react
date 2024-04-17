import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import { Formik } from 'formik';
import CustomerService from 'frontend/js/api/CustomerService';
import CountryService from 'frontend/js/api/CountryService';
import RegisterSchema from './RegisterSchema';

function Form({ onSuccess, className, children, id, channel, setIsSubmitting }) {
  const intl = useIntl();

  async function onSubmit(values, { setFieldError }) {
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      ...(channel ? { channel } : {}),
    };

    try {
      setIsSubmitting(true);
      await CustomerService.register(payload);
      onSuccess();
    } catch (error) {
      const { response } = error;
      let fieldError = false;

      if (response && response.data) {
        const { errors } = response.data;

        const errorsMap = {
          email: 'email',
          first_name: 'firstName',
          second_name: 'secondName',
          phoneNumber: 'phoneNumber',
        };

        if (typeof errors === 'object') {
          Object.keys(errors).forEach((fieldName) => {
            if (fieldName && errorsMap[fieldName]) {
              setFieldError(errorsMap[fieldName], errors[fieldName]);
              fieldError = true;
            }
          });
        }
      }

      setIsSubmitting(false);

      if (!fieldError) {
        setFieldError('email', intl.formatMessage({ id: 'form.error.general' }));
      }
    }
  }

  const isPhoneNumberShown = !CountryService.isDomestic();

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        isPhoneNumberShown,
      }}
      validationSchema={RegisterSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form className={className} onSubmit={handleSubmit} id={id}>
          {children}
        </form>
      )}
    </Formik>
  );
}

Form.defaultProps = {
  className: '',
  id: '',
  channel: null,
  setIsSubmitting: () => {},
};

Form.propTypes = {
  channel: PropTypes.number,
  onSuccess: PropTypes.func.isRequired,
  setIsSubmitting: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Form;
