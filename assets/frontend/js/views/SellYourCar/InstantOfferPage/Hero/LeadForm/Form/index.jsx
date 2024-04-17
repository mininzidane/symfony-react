import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import useEmailExistenceCheck from 'frontend/js/hooks/useEmailExistenceCheck';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useStyles from './useStyles';

function Form({ formik }) {
  const classes = useStyles();
  const intl = useIntl();

  const { isAuthenticated, email: customerEmail } = useCustomerHelper();
  const [emailExists, isEmailChecking] = useEmailExistenceCheck(
    formik.values.email,
    isAuthenticated && customerEmail ? { enabled: false } : {},
  );

  const alreadyRegisteredError = (
    <FormattedMessage
      id="form.error.emailAlreadyExists"
      values={{
        a: (chunks) => (
          <ButtonLink
            onClick={() => window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { tab: 'signIn' } }))}
            label={chunks[0]}
          />
        ),
      }}
    />
  );

  const isEmailValid = Boolean(
    formik.values.email &&
      ((!emailExists && !isEmailChecking) || (isAuthenticated && customerEmail === formik.values.email)),
  );
  const emailError =
    ['incorrect', 'taken'].includes(formik.errors.email) || (!isEmailValid && emailExists)
      ? alreadyRegisteredError
      : formik.errors.email;

  useEffect(() => {
    formik.setFieldValue('emailValid', isEmailValid);
  }, [isEmailValid]);

  useEffect(() => {
    if (isEmailChecking && !formik.touched.email) {
      formik.setFieldTouched('email', true);
    }
  }, [isEmailChecking, formik.touched.email]);

  return (
    <form onSubmit={formik.handleSubmit} className={classes.grid}>
      <div className={classes.gridGroup}>
        <InputPlane
          id="firstName"
          name="firstName"
          placeholder={intl.formatMessage({ id: 'shared.label.firstName' })}
          value={formik.values.firstName}
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          isAutoFocus
        />
        <InputPlane
          id="lastName"
          name="lastName"
          placeholder={intl.formatMessage({ id: 'shared.label.lastName' })}
          value={formik.values.lastName}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
        />
      </div>
      <PhoneInputPlane
        id="phoneNumber"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        error={formik.errors.phoneNumber}
        touched={formik.touched.phoneNumber}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
      />
      <InputPlane
        id="email"
        name="email"
        placeholder={intl.formatMessage({ id: 'shared.label.email' })}
        value={formik.values.email}
        touched={formik.touched.email}
        error={!isEmailChecking && emailError}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
        loading={isEmailChecking}
        checkmark={isEmailValid}
        isLabelOnTop
        isTrimmed
        disabled={isAuthenticated && customerEmail === formik.values.email}
      />
    </form>
  );
}

Form.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default Form;
