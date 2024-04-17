import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import { useFormikContext } from 'formik';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import useStyles from './useStyles';

function Inputs({ className }) {
  const classes = useStyles();
  const intl = useIntl();
  const { values, touched, errors, setFieldValue, setFieldError, setFieldTouched } = useFormikContext();

  const translationSets = {
    name: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.name' }),
    email: intl.formatMessage({ id: 'shared.label.email' }),
    phoneNumber: intl.formatMessage({ id: 'shared.label.phoneNumber' }),
    alreadyRegistered: intl.formatMessage({ id: 'form.error.alreadyRegistered' }),
  };

  return (
    <div className={classNames(classes.root, className, 'with-phone-number')}>
      <InputPlane
        id="name"
        name="name"
        value={values.name}
        touched={touched.name}
        error={errors.name}
        placeholder={translationSets.name}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        onError={setFieldError}
        isTrimmed
        isAutoFocus
      />

      <PhoneInputPlane
        id="phoneNumber"
        name="phoneNumber"
        value={values.phoneNumber}
        error={errors.phoneNumber}
        touched={touched.phoneNumber}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
      />

      <InputPlane
        id="email"
        name="email"
        value={values.email}
        touched={touched.email}
        error={errors.email}
        placeholder={translationSets.email}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        onError={setFieldError}
        isTrimmed
      />
    </div>
  );
}

Inputs.defaultProps = {
  className: '',
};

Inputs.propTypes = {
  className: PropTypes.string,
};

export default Inputs;
