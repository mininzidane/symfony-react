import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import useCountries from 'frontend/js/hooks/useCountries';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import useStyles from '../useStyles';

function Step1Form({ formik }) {
  const classes = useStyles();
  const intl = useIntl();
  const countries = useCountries();

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
      <div className={classes.gridGroup}>
        <InputPlane
          id="email"
          name="email"
          placeholder={intl.formatMessage({ id: 'shared.label.email' })}
          value={formik.values.email}
          touched={formik.touched.email}
          error={formik.errors.email}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
          isLabelOnTop
        />
        <SelectPlane
          id="country"
          name="country"
          placeholder={intl.formatMessage({ id: 'shared.label.country' })}
          value={formik.values.country}
          options={countries}
          error={formik.errors.country}
          touched={formik.touched.country}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onChangeAttribute="id"
          formatOptionLabel={(option) => option.name}
          convertMobileSelectValue={(value) => parseInt(value, 10)}
          isSearchable
        />
      </div>
    </form>
  );
}

Step1Form.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default Step1Form;
