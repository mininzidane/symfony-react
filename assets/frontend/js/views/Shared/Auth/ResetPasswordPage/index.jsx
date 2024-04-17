import React from 'react';
import ReactDOM from 'react-dom';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import useIntl from 'frontend/js/hooks/useIntl';
import { Formik } from 'formik';
import classNames from 'classnames';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import CustomerService from 'frontend/js/api/CustomerService';
import PasswordVisualField from 'frontend/js/views/Shared/PasswordVisualField';
import getDefaultConditions from 'frontend/js/views/Shared/PasswordVisualField/getDefaultConditions';
import validationSchema from './validationSchema';

import ForgotPasswordLayout from '../_Shared/ForgotPasswordLayout';
import useStyles from './useStyles';

function ResetPasswordPage() {
  const classes = useStyles();
  const intl = useIntl();
  const conditionsConfig = getDefaultConditions(intl);

  const translations = {
    title: intl.formatMessage({ id: 'resetPasswordPage.title' }),
    subtitle: intl.formatMessage({ id: 'resetPasswordPage.subtitle' }),
    newPassword: intl.formatMessage({ id: 'securityPage.form.changePassword.newPassword' }),
    newPasswordConfirmation: intl.formatMessage({ id: 'securityPage.form.changePassword.newPasswordConfirmation' }),
    submitBtn: intl.formatMessage({ id: 'resetPasswordPage.form.resetBtn' }),
  };

  async function onSubmit(values, { setSubmitting, setFieldError }) {
    const splittedPathname = window.location.pathname.split('/');
    const token = splittedPathname[splittedPathname.length - 1];

    const payload = {
      token,
      newPassword: {
        first: values.newPassword,
        second: values.newPasswordConfirmation,
      },
    };

    setSubmitting(true);
    try {
      const data = await CustomerService.resetPassword(payload);
      RouterService.customRedirect(data.redirect || RouterService.getRoute('home'));
    } catch (error) {
      const { response } = error;

      const errors = response && response.data && response.data.errors;

      if (errors && errors.newPassword_first) {
        setFieldError('newPassword', errors.newPassword_first);
      }

      if (errors && errors.newPassword_second) {
        setFieldError('newPasswordConfirmation', errors.newPassword_second);
      }

      setSubmitting(false);
    }
  }

  return (
    <ForgotPasswordLayout title={translations.title} subtitle={translations.subtitle}>
      <Formik
        initialValues={{
          newPassword: '',
          newPasswordConfirmation: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
            <PasswordVisualField
              conditions={conditionsConfig.getNewPasswordConditions()}
              id="newPassword"
              name="newPassword"
              value={values.newPassword}
              touched={touched.newPassword}
              error={errors.newPassword}
              placeholder={translations.newPassword}
              className={classes.field}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              onError={setFieldError}
              isTrimmed
            />

            <PasswordVisualField
              conditions={conditionsConfig.getNewPasswordConfirmationConditions(values)}
              id="newPasswordConfirmation"
              name="newPasswordConfirmation"
              value={values.newPasswordConfirmation}
              touched={touched.newPasswordConfirmation}
              error={errors.newPasswordConfirmation}
              placeholder={translations.newPasswordConfirmation}
              className={classNames(classes.field, 'mt-20')}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              onError={setFieldError}
              isTrimmed
              suggestionsTopPosition="73px"
            />

            <Button
              type="submit"
              label={translations.submitBtn}
              size="lg"
              isLoading={isSubmitting}
              className={classes.submitButton}
            />
          </form>
        )}
      />
    </ForgotPasswordLayout>
  );
}

const $el = document.getElementById('reset-password-page');
ReactDOM.render(
  <TranslationProvider>
    <ThemeProvider>
      <ResetPasswordPage />
    </ThemeProvider>
  </TranslationProvider>,
  $el,
);
