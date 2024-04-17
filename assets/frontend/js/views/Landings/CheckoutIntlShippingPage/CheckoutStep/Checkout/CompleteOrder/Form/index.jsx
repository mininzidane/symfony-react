import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useFormikContext } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import EmailInput from './EmailInput';
import useStyles from './useStyles';

function Form({ className }) {
  const intl = useIntl();
  const classes = useStyles();
  const { values, touched, errors, setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <div className={classnames(classes.root, className)}>
      <EmailInput />
      <div className={classes.username}>
        <InputPlane
          id="firstName"
          name="firstName"
          placeholder={intl.formatMessage({ id: 'shared.label.firstName' })}
          value={values.firstName}
          error={errors.firstName}
          touched={touched.firstName}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          checkmark={touched.firstName && !errors.firstName}
        />
        <InputPlane
          id="lastName"
          name="lastName"
          placeholder={intl.formatMessage({ id: 'shared.label.lastName' })}
          value={values.lastName}
          error={errors.lastName}
          touched={touched.lastName}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          checkmark={touched.lastName && !errors.lastName}
        />
      </div>
      <PhoneInputPlane
        id="phoneNumber"
        name="phoneNumber"
        value={values.phoneNumber}
        error={errors.phoneNumber}
        touched={touched.phoneNumber}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        checkmark={touched.phoneNumber && !errors.phoneNumber}
      />
    </div>
  );
}

Form.defaultProps = {
  className: '',
};

Form.propTypes = {
  className: PropTypes.string,
};

export default Form;
