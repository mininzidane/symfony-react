import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import Button from 'frontend/js/components/Button';
import Link from 'frontend/js/components/Link';
import CustomerService from 'frontend/js/api/CustomerService';
import RouterService from 'frontend/js/api/RouterService';
import validationSchema from './validationSchema';

import ForgotPasswordLayout from '../../_Shared/ForgotPasswordLayout';
import useStyles from './useStyles';

function Form({ setShowSuccessState, setSendedEmail, onSignInClick }) {
  const classes = useStyles();
  const intl = useIntl();

  const translations = {
    title: intl.formatMessage({ id: 'forgotPasswordPage.form.title' }),
    subtitle: intl.formatMessage({ id: 'forgotPasswordPage.form.subtitle' }),
    email: intl.formatMessage({ id: 'forgotPasswordPage.form.label.email' }),
    submitBtn: intl.formatMessage({ id: 'authComponents.forgotPassword.sendLink' }),
    back: intl.formatMessage({ id: 'authComponents.forgotPassword.back' }),
  };

  async function onSubmit(values, { setSubmitting, setFieldError }) {
    const payload = {
      email: values.email,
    };

    setSubmitting(true);
    try {
      const data = await CustomerService.forgotPassword(payload);
      setSendedEmail(data.email);
      setShowSuccessState(true);
    } catch (error) {
      const { response } = error;

      if (response && response.data && response.data.errors && response.data.errors.email) {
        setFieldError('email', response.data.errors.email);
      }

      setSubmitting(false);
    }
  }

  return (
    <ForgotPasswordLayout title={translations.title} subtitle={translations.subtitle}>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={{
          email: '',
        }}
        enableReinitialize
        render={({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          setFieldError,
          isSubmitting,
          handleSubmit,
        }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <InputPlane
              id="email"
              name="email"
              value={values.email}
              touched={touched.email}
              error={errors.email}
              placeholder={translations.email}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              onError={setFieldError}
              isTrimmed
              isAutoFocus
            />

            <Button
              type="submit"
              label={translations.submitBtn}
              isLoading={isSubmitting}
              className={classes.submitButton}
            />
          </form>
        )}
      />

      <Link
        href={RouterService.getRoute('login')}
        onClick={(e) => {
          onSignInClick(e);
          e.preventDefault();
        }}
      >
        {translations.back}
      </Link>
    </ForgotPasswordLayout>
  );
}

Form.propTypes = {
  setShowSuccessState: PropTypes.func.isRequired,
  setSendedEmail: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func,
};

Form.defaultProps = {
  onSignInClick: () => {},
};

export default Form;
