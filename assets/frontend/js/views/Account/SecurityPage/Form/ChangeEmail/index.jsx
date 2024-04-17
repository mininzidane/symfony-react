import React, { useState } from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import { Formik } from 'formik';
import classNames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import { useSnackbar } from 'notistack';
import CustomerService from 'frontend/js/api/CustomerService';
import Button from 'frontend/js/components/Button';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PasswordInputPlane from 'frontend/js/components/Form/PlaneTheme/PasswordInputPlane';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

import validationSchema from './validationSchema';

import useStyles from './useStyles';

function ChangeEmail() {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState(useCustomerHelper().email);

  const translations = {
    currentEmail: intl.formatMessage({ id: 'securityPage.form.changeEmail.currentEmail' }),
    newEmail: intl.formatMessage({ id: 'securityPage.form.changeEmail.newEmail' }),
    newEmailConfirmation: intl.formatMessage({ id: 'securityPage.form.changeEmail.newEmailConfirmation' }),
    currentPassword: intl.formatMessage({ id: 'securityPage.form.changePassword.currentPassword' }),
    submitBtn: intl.formatMessage({ id: 'securityPage.form.changeEmail.submitLabel' }),
    successPrompt: intl.formatMessage({ id: 'securityPage.form.changeEmail.successPrompt' }),
  };

  async function onSubmit(values, { setFieldError, resetForm }) {
    const payload = {
      new_login: {
        first: values.newEmail,
        second: values.newEmailConfirmation,
      },
      current_password: values.currentPassword,
    };

    try {
      const result = await CustomerService.changeEmail(payload);

      setEmail(result.customer.email);
      resetForm();

      enqueueSnackbar(translations.successPrompt, { variant: 'success' });
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const { errors } = response.data;

        if (typeof errors === 'object') {
          setFieldError('newEmail', errors.change_login_new_login_first);
          setFieldError('newEmailConfirmation', errors.change_login_new_login_second);
          setFieldError('currentPassword', errors.change_login_current_password);
        }
      }
    }
  }

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>
        <FormattedMessage id="securityPage.form.changeEmail.title" />
      </h2>

      <Formik
        initialValues={{
          newEmail: '',
          newEmailConfirmation: '',
          currentPassword: '',
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
            <div className={classNames(classes.field, classes.currentEmail)}>
              <div className={classes.label}>{translations.currentEmail}</div>
              <div className={classes.value}>{email}</div>
            </div>

            <InputPlane
              id="newEmail"
              name="newEmail"
              value={values.newEmail}
              touched={touched.newEmail}
              error={errors.newEmail}
              placeholder={translations.newEmail}
              className={classes.field}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              onError={setFieldError}
              isTrimmed
              isAutoFocus
            />

            <InputPlane
              id="newEmailConfirmation"
              name="newEmailConfirmation"
              value={values.newEmailConfirmation}
              touched={touched.newEmailConfirmation}
              error={errors.newEmailConfirmation}
              placeholder={translations.newEmailConfirmation}
              className={classes.field}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              onError={setFieldError}
              isTrimmed
            />

            <PasswordInputPlane
              id="currentPassword"
              name="currentPassword"
              value={values.currentPassword}
              touched={touched.currentPassword}
              error={errors.currentPassword}
              placeholder={translations.currentPassword}
              className={classes.field}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              onError={setFieldError}
              isTrimmed
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

export default ChangeEmail;
