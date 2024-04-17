import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useFormikContext } from 'formik';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import Input from './Input';
import EmailInput from './EmailInput';
import Refinement from './Refinement';
import useStyles from './useStyles';

function Form({ className }) {
  const classes = useStyles();
  const intl = useIntl();
  const { values, touched, errors, setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <div className={classnames(classes.root, className)}>
      <Refinement label={<FormattedMessage id="shared.label.emailAddress" />} input={<EmailInput />} />

      <Refinement
        label={<FormattedMessage id="shared.label.firstName" />}
        input={
          <Input
            component={InputPlane}
            id="firstName"
            name="firstName"
            placeholder={intl.formatMessage({ id: 'shippingCalculator.completeOrder.form.firstName.placeholder' })}
            value={values.firstName}
            error={errors.firstName}
            touched={touched.firstName}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            checkmark={touched.firstName && !errors.firstName}
          />
        }
      />

      <Refinement
        label={<FormattedMessage id="shared.label.lastName" />}
        input={
          <Input
            component={InputPlane}
            id="lastName"
            name="lastName"
            placeholder={intl.formatMessage({ id: 'shippingCalculator.completeOrder.form.lastName.placeholder' })}
            value={values.lastName}
            error={errors.lastName}
            touched={touched.lastName}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            checkmark={touched.lastName && !errors.lastName}
          />
        }
      />

      <Refinement
        label={<FormattedMessage id="shared.label.phoneNumber" />}
        input={
          <Input
            component={PhoneInputPlane}
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            error={errors.phoneNumber}
            touched={touched.phoneNumber}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            checkmark={touched.phoneNumber && !errors.phoneNumber}
          />
        }
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
