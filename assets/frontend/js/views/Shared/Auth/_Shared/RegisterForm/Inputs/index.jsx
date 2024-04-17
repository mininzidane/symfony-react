import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import CountryService from 'frontend/js/api/CountryService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import EmailSuggestions from 'frontend/js/views/Shared/Auth/_Shared/RegisterForm/Inputs/EmailSuggestions';
import useSuggestions from 'frontend/js/hooks/useSuggestions';
import useStyles from './useStyles';

function Inputs({ className, autoFocus, isPhoneNumberShown }) {
  const AT_SIGN = '@';
  const classes = useStyles();
  const intl = useIntl();

  const { values, touched, errors, setFieldValue, setFieldError, setFieldTouched } = useFormikContext();
  const { shouldShowSuggestions, isEmailFocused, setIsEmailFocused, isEmailFocusedDelayed } = useSuggestions(
    values,
    AT_SIGN,
  );

  const translationSets = {
    firstName: intl.formatMessage({ id: 'shared.label.firstName' }),
    lastName: intl.formatMessage({ id: 'shared.label.lastName' }),
    email: intl.formatMessage({ id: 'shared.label.email' }),
    phoneNumber: intl.formatMessage({ id: 'shared.label.phoneNumber' }),
    alreadyRegistered: intl.formatMessage({ id: 'form.error.alreadyRegistered' }),
  };

  function setEmailDomain(domain) {
    const newEmail = values.email.split(AT_SIGN)[0] + AT_SIGN + domain;
    setFieldValue('email', newEmail);
  }

  return (
    <div className={classNames(classes.root, className, { 'with-phone-number': isPhoneNumberShown })}>
      <div className={classes.firstName}>
        <InputPlane
          id="register-first-name"
          name="firstName"
          value={values.firstName}
          touched={touched.firstName}
          error={touched.lastName && errors.firstName}
          placeholder={translationSets.firstName}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          onError={setFieldError}
          isAutoFocus={autoFocus}
          isTrimmed
        />
      </div>

      <div className={classes.lastName}>
        <InputPlane
          id="register-last-name"
          name="lastName"
          value={values.lastName}
          touched={touched.lastName}
          error={errors.lastName}
          placeholder={translationSets.lastName}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          onError={setFieldError}
          isTrimmed
        />
      </div>

      {isPhoneNumberShown && (
        <div className={classes.phone}>
          <PhoneInputPlane
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            error={errors.phoneNumber}
            touched={touched.phoneNumber}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            className="qa_number_phone"
          />
        </div>
      )}

      <div className={classes.email}>
        <InputPlane
          id="email"
          name="email"
          value={values.email}
          touched={isEmailFocusedDelayed ? false : touched.email}
          error={['incorrect', 'taken'].includes(errors.email) ? translationSets.alreadyRegistered : errors.email}
          placeholder={translationSets.email}
          onChange={setFieldValue}
          onBlur={(name, value) => {
            setFieldTouched(name, value);
            setIsEmailFocused(false);
          }}
          onError={setFieldError}
          onFocus={() => setIsEmailFocused(true)}
          isTrimmed
        />

        <EmailSuggestions isOpen={isEmailFocused && shouldShowSuggestions} onClick={setEmailDomain} />
      </div>
    </div>
  );
}

Inputs.defaultProps = {
  className: '',
  autoFocus: true,
  isPhoneNumberShown: !CountryService.isDomestic(),
};

Inputs.propTypes = {
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  isPhoneNumberShown: PropTypes.bool,
};

export default Inputs;
