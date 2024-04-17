import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PasswordInputPlane from 'frontend/js/components/Form/PlaneTheme/PasswordInputPlane';
import Link from 'frontend/js/components/Link';
import Button from 'frontend/js/components/Button';
import CustomerService from 'frontend/js/api/CustomerService';
import RouterService from 'frontend/js/api/RouterService';
import FlashMessagesService from 'frontend/js/api/FlashMessagesService';
import TermsAgreement from '../../_Shared/TermsAgreement';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function LoginForm({ onSuccess, onForgotPasswordClick, setIsSubmitting, isDisabled }) {
  const classes = useStyles();
  const intl = useIntl();
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    new FlashMessagesService().getFlashMessages().then(({ error }) => {
      setEmailError(error?.length > 0 ? error[0] : null);
    });
  }, []);

  const translations = {
    email: intl.formatMessage({ id: 'loginPage.label.email' }),
    password: intl.formatMessage({ id: 'shared.label.password' }),
    submitBtn: intl.formatMessage({ id: 'shared.access.signIn' }),
  };

  async function onSubmit(values, { setSubmitting, setFieldError }) {
    const payload = {
      security: {
        login: values.email,
        password: values.password,
      },
    };
    setIsSubmitting(true);
    setSubmitting(true);
    try {
      await CustomerService.login(payload);

      onSuccess(payload);
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const { errors } = response.data;
        let fieldError = false;

        Object.keys(errors).forEach((key) => {
          if (typeof values[key] !== 'undefined') {
            setFieldError(
              key,
              errors[key] === 'Bad credentials.'
                ? intl.formatMessage({ id: 'shared.access.badCredentials' })
                : errors[key],
            );
            fieldError = true;
          }
        });

        if (!fieldError) {
          setFieldError('email', 'An error has occurred, please try again later');
        }
      }
    }

    setIsSubmitting(false);
    setSubmitting(false);
  }

  function handleMouseDown(e) {
    onForgotPasswordClick(e);
    RouterService.redirect('forgottenPassword');
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialTouched={{ email: !!emailError }}
      initialErrors={{ email: emailError }}
      validationSchema={validationSchema}
      initialValues={{
        email: '',
        password: '',
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
            error={touched.password && errors.email}
            placeholder={translations.email}
            className={classes.field}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            isTrimmed
            isAutoFocus
            onError={(name, error) => {
              setFieldError(name, error);
              setEmailError(error);
            }}
          />

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

          <div className={classes.forgotPassword}>
            <Link href={RouterService.getRoute('forgottenPassword')} onMouseDown={handleMouseDown}>
              <FormattedMessage id="shared.access.forgotPassword" />
            </Link>
          </div>

          <TermsAgreement ctaLabel={translations.submitBtn} />

          <Button
            type="submit"
            label={translations.submitBtn}
            isLoading={isSubmitting}
            className={classnames(classes.submitButton, 'qa_sing_in_button')}
            isDisabled={isDisabled}
          />
        </form>
      )}
    />
  );
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onForgotPasswordClick: PropTypes.func,
  setIsSubmitting: PropTypes.func,
  isDisabled: PropTypes.bool,
};

LoginForm.defaultProps = {
  onForgotPasswordClick: () => {},
  setIsSubmitting: () => {},
  isDisabled: false,
};

export default LoginForm;
