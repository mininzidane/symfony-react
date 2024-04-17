import React from 'react';
import { Formik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import { useSnackbar } from 'notistack';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CustomerService from 'frontend/js/api/CustomerService';
import Button from 'frontend/js/components/Button';
import PasswordInputPlane from 'frontend/js/components/Form/PlaneTheme/PasswordInputPlane';
import PasswordVisualField from 'frontend/js/views/Shared/PasswordVisualField';
import getDefaultConditions from 'frontend/js/views/Shared/PasswordVisualField/getDefaultConditions';

import validationSchema from './validationSchema';

import useStyles from './useStyles';

function ChangePassword() {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const conditionsConfig = getDefaultConditions(intl);

  const translations = {
    password: intl.formatMessage({ id: 'securityPage.form.changePassword.currentPassword' }),
    newPassword: intl.formatMessage({ id: 'securityPage.form.changePassword.newPassword' }),
    newPasswordConfirmation: intl.formatMessage({ id: 'securityPage.form.changePassword.newPasswordConfirmation' }),
    submitBtn: intl.formatMessage({ id: 'securityPage.form.changePassword.submitLabel' }),
    minChars: intl.formatMessage({ id: 'securityPage.form.criteria.minChars' }),
    maxChars: intl.formatMessage({ id: 'securityPage.form.criteria.maxChars' }),
    lowercase: intl.formatMessage({ id: 'securityPage.form.criteria.lowercase' }),
    uppercase: intl.formatMessage({ id: 'securityPage.form.criteria.uppercase' }),
    number: intl.formatMessage({ id: 'securityPage.form.criteria.number' }),
    symbols: intl.formatMessage({ id: 'securityPage.form.criteria.symbols' }),
    invalidChars: intl.formatMessage({ id: 'securityPage.form.criteria.invalidChars' }),
    passwordMatches: intl.formatMessage({ id: 'securityPage.form.criteria.passwordMatches' }),
    successPrompt: intl.formatMessage({ id: 'securityPage.form.changePassword.successPrompt' }),
  };

  async function onSubmit(values, { setFieldError, resetForm }) {
    const payload = {
      new_password: {
        first: values.newPassword,
        second: values.newPasswordConfirmation,
      },
      current_password: values.password,
    };

    try {
      await CustomerService.changePassword(payload);
      resetForm();

      enqueueSnackbar(translations.successPrompt, { variant: 'success' });
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const { errors } = response.data;

        if (typeof errors === 'object') {
          setFieldError('password', errors.change_password_current_password);
          setFieldError('newPassword', errors.password_reset_newPassword_first);
          setFieldError('newPasswordConfirmation', errors.password_reset_newPassword_second);
        }
      }
    }
  }

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>
        <FormattedMessage id="securityPage.form.changePassword.title" />
      </h2>
      <Formik
        initialValues={{
          password: '',
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
            <PasswordInputPlane
              id="password"
              name="password"
              value={values.password}
              touched={touched.password}
              error={errors.password}
              placeholder={translations.password}
              className={classes.field}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              onError={setFieldError}
              isTrimmed
            />

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
              suggestionsTopPosition="73px"
            />

            <PasswordVisualField
              conditions={conditionsConfig.getNewPasswordConfirmationConditions(values)}
              id="newPasswordConfirmation"
              name="newPasswordConfirmation"
              value={values.newPasswordConfirmation}
              touched={touched.newPasswordConfirmation}
              error={errors.newPasswordConfirmation}
              placeholder={translations.newPasswordConfirmation}
              className={classes.field}
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
    </div>
  );
}

export default ChangePassword;
