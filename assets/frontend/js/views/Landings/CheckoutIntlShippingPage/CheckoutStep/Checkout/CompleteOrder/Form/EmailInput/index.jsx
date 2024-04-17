import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useFormikContext } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import useEmailExistenceCheck from 'frontend/js/hooks/useEmailExistenceCheck';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import ButtonLink from 'frontend/js/components/ButtonLink';
import AuthModal from 'frontend/js/providers/AuthModalProvider/Modal';

function EmailInput() {
  const intl = useIntl();
  const { values, touched, errors, setFieldValue, setFieldTouched } = useFormikContext();
  const [emailExists, isEmailChecking] = useEmailExistenceCheck(values.email);
  const { isAuthenticated, email: customerEmail } = useCustomerHelper();

  useEffect(() => {
    const emailIsFree = values.email && !isEmailChecking && !emailExists;

    if (emailIsFree || customerEmail === values.email) {
      setFieldValue('emailIsBlocked', false);
    } else {
      setFieldValue('emailIsBlocked', true);
    }
  }, [values.email, emailExists, isEmailChecking]);

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
    customerEmail === values.email || (values.email && !errors.email && !errors.emailIsBlocked && !isEmailChecking),
  );
  const error = ['incorrect', 'taken'].includes(errors.email) ? alreadyRegisteredError : errors.email;

  return (
    <>
      {isAuthenticated && !isEmailValid && <AuthModal />}
      <InputPlane
        id="email"
        name="email"
        value={values.email}
        touched={touched.email}
        error={error || (!isEmailValid ? alreadyRegisteredError : null)}
        placeholder={intl.formatMessage({ id: 'shared.label.emailAddress' })}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        isTrimmed
        loading={isEmailChecking}
        checkmark={isEmailValid}
      />
    </>
  );
}

export default EmailInput;
