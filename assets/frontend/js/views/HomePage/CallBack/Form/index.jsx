import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import classnames from 'classnames';
import { Formik } from 'formik';
import CountryService from 'frontend/js/api/CountryService';
import Button from 'frontend/js/components/Button';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import LeadService from 'frontend/js/api/LeadService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function CallBack({ className, ctaText }) {
  const [isSent, setIsSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const { fullName, phoneNumberRaw, isAuthenticated } = useCustomerHelper();

  const { getUserCountryIso2 } = CountryService;
  const userCountryIso2 = getUserCountryIso2();
  const classes = useStyles();
  const leadService = new LeadService();
  const ga = new GoogleAnalyticsService();

  const intl = useIntl();
  const translationSets = {
    yourName: intl.formatMessage({ id: 'shared.label.yourName' }),
    requestCallback: intl.formatMessage({ id: 'shared.cta.requestCallback' }),
    formError: intl.formatMessage({ id: 'form.error.general' }),
  };

  function onSubmit(values, { setSubmitting }) {
    const payload = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      country: userCountryIso2,
      source: LeadService.SOURCE_SHIPPING_QUESTIONS_HOMEPAGE,
    };

    leadService
      .createLead(payload)
      .then((response) => {
        if (!isAuthenticated) {
          ga.sendEvent('click', 'contact', 'contactus');
        }

        if (response && response.lead && response.lead.createdAt) {
          setSenderName(values.name);
          setIsSent(true);
        }
      })
      .catch(() => null)
      .finally(() => setSubmitting(false));
  }

  return (
    <Formik
      initialValues={{
        name: fullName,
        phoneNumber: phoneNumberRaw,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, setFieldValue, setFieldError, setFieldTouched, handleSubmit, isSubmitting }) => (
        <>
          {isSent ? (
            <div className={classes.successMessage}>
              <FormattedMessage id="lotPage.contact.contactReceived" values={{ senderFirstName: senderName }} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={classnames(classes.root, className)}>
              <div>
                <InputPlane
                  id="сallBack_name"
                  name="name"
                  value={values.name}
                  touched={touched.name}
                  error={errors.name}
                  placeholder={translationSets.yourName}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  onError={setFieldError}
                />
              </div>
              <div>
                <PhoneInputPlane
                  id="сallBack_phoneNumber"
                  name="phoneNumber"
                  onBlur={setFieldTouched}
                  value={values.phoneNumber}
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                  onChange={setFieldValue}
                  className={classes.phoneNumber}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  label={ctaText || translationSets.requestCallback}
                  color="yellow"
                  isLoading={isSubmitting}
                />
              </div>
            </form>
          )}
        </>
      )}
    </Formik>
  );
}

CallBack.propTypes = {
  className: PropTypes.string,
  ctaText: PropTypes.string,
};

CallBack.defaultProps = {
  className: '',
  ctaText: '',
};

export default CallBack;
