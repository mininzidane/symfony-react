import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useFormikContext } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import useEmailExistenceCheck from 'frontend/js/hooks/useEmailExistenceCheck';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import ButtonLink from 'frontend/js/components/ButtonLink';
import Input from '../Input';

function EmailInput() {
  const intl = useIntl();
  const { values, touched, errors, setFieldValue, setFieldTouched } = useFormikContext();
  const [emailExists, isEmailChecking] = useEmailExistenceCheck(values.email);

  useEffect(() => {
    const emailIsFree = values.email && !isEmailChecking && !emailExists;

    if (emailIsFree) {
      setFieldValue('emailIsUsed', false);
    } else {
      setFieldValue('emailIsUsed', true);
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

  const isEmailValid = Boolean(values.email && !errors.email && !errors.emailIsUsed && !isEmailChecking);
  const error = ['incorrect', 'taken'].includes(errors.email) ? alreadyRegisteredError : errors.email;

  return (
    <Input
      component={InputPlane}
      id="email"
      name="email"
      value={values.email}
      touched={touched.email}
      error={error || (!isEmailValid ? alreadyRegisteredError : null)}
      placeholder={intl.formatMessage({ id: 'shippingCalculator.completeOrder.form.email.placeholder' })}
      onChange={setFieldValue}
      onBlur={setFieldTouched}
      isTrimmed
      loading={isEmailChecking}
      checkmark={isEmailValid}
    />
  );
}

export default EmailInput;
