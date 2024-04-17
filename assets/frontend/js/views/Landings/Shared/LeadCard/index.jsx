import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Formik } from 'formik';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import validationSchema from 'frontend/js/views/Shared/LeadForm/Form/LeadSchema';
import LeadService from 'frontend/js/api/LeadService';
import CountryService from 'frontend/js/api/CountryService';
import useIntl from 'frontend/js/hooks/useIntl';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';
import SubmitButton from './SubmitButton';
import SuccessState from './SuccessState';
import LeadFormInputs from './LeadFormInputs';

function LeadCard({ leadSource }) {
  const classes = useStyles();
  const intl = useIntl();
  const { fullName, phoneNumber, email } = useCustomerHelper();

  const [leadSubmitted, setLeadSubmitted] = useState(false);

  async function onSubmit(values, { setFieldError }) {
    const leadService = new LeadService();
    const payload = {
      name: values.name.trim(),
      email: values.email,
      phoneNumber: values.phoneNumber,
      appointmentTime: values.time,
      appointmentDate: values.date,
      country: CountryService.getUserCountryIso2(),
      source: leadSource,
    };

    try {
      await leadService.createLead(payload);
      setLeadSubmitted(true);
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
    <div className={classes.root} id="lounge-lead-form">
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={{
          email: email || '',
          name: fullName || '',
          phoneNumber: phoneNumber || '',
          time: '',
          date: '',
        }}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
          <form className={classnames(classes.form, leadSubmitted && 'is-submitted')} onSubmit={handleSubmit}>
            {leadSubmitted ? (
              <SuccessState email />
            ) : (
              <>
                <FormattedMessage id="loungePage.contactUs.title" className={classes.title} />
                <FormattedMessage id="loungePage.contactUs.subtitle" className={classes.subtitle} />
                <LeadFormInputs
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  setFieldError={setFieldError}
                />
                <SubmitButton
                  type="submit"
                  color="blue"
                  label={<FormattedMessage id="loungePage.contactUs.submit" />}
                  className={classes.submit}
                  isLoading={isSubmitting}
                />
              </>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}

LeadCard.propTypes = {
  leadSource: PropTypes.string.isRequired,
};

export default LeadCard;
