import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import LeadService from 'frontend/js/api/LeadService';
import CountryService from 'frontend/js/api/CountryService';
import leadSchema from './LeadSchema';

function Form({ onSuccess, className, children, id, leadSource }) {
  const intl = useIntl();

  async function onSubmit(values, { setFieldError }) {
    const leadService = new LeadService();
    const payload = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      country: CountryService.getUserCountryIso2(),
      source: leadSource,
    };

    try {
      await leadService.createLead(payload);
      onSuccess();
    } catch (error) {
      const { response } = error;
      let fieldError = false;

      if (response && response.data) {
        const { errors } = response.data;

        const errorsMap = {
          email: 'email',
          name: 'name',
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

      if (!fieldError) {
        setFieldError('email', intl.formatMessage({ id: 'form.error.general' }));
      }
    }
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phoneNumber: '',
      }}
      validationSchema={leadSchema}
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
};

Form.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  leadSource: PropTypes.string.isRequired,
};

export default Form;
