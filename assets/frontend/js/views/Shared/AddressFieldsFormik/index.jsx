import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import useCountriesOptions from './useCountriesOptions';
import useFieldsConfig from './useFieldsConfig';
import useStyles from './useStyles';

function AddressFieldsFormik({
  formik,
  onChange,
  config: fieldsConfig,
  restrictCountry,
  countryDisabled,
  hideApartment,
}) {
  const classes = useStyles();
  const config = useFieldsConfig(fieldsConfig);
  const [countryCode, setCountryCode] = useState(null);
  const [stateCode, setStateCode] = useState(
    (!config.state?.value && !formik.values[config.state?.name] && formik.values[config.stateCode?.name]) || null,
  );

  const { countries, states, isStateLoading, getCountryIdByCode, getStateIdByCode } = useCountriesOptions(
    config.country?.value || formik.values[config.country.name],
  );

  function handleChange(name, value) {
    if (onChange) {
      onChange(name, value);
    }
    formik.setFieldValue(name, value);
  }

  useEffect(() => {
    if (countryCode) {
      const countryId = getCountryIdByCode(countryCode);
      handleChange(config.country.name, countryId || '');
    }
  }, [countries, countryCode]);

  useEffect(() => {
    if (stateCode && !isStateLoading) {
      const stateId = getStateIdByCode(stateCode);
      handleChange(config.state.name, stateId || '');
      if (config.stateCode) {
        handleChange(config.stateCode.name, stateCode || '');
      }
      setStateCode(null);
    }
  }, [isStateLoading, stateCode]);

  return (
    <div className={classes.root}>
      <div className={classes.address}>
        <PlacesInputPlane
          id={config.address.name}
          value={formik.values[config.address.name]}
          error={formik.errors[config.address.name]}
          touched={formik.touched[config.address.name]}
          onError={formik.setFieldError}
          onBlur={formik.setFieldTouched}
          disableBlurSelect
          restrictAddress
          country={restrictCountry}
          onChange={(name, value) => {
            if (typeof value === 'object') {
              const {
                address: gAddress,
                city: gCity,
                state_code: gStateCode,
                zip: gZip,
                country_code: gCountryCode = '',
              } = value;

              if (config.address) {
                handleChange(config.address.name, gAddress);
              }
              if (config.city) {
                handleChange(config.city.name, gCity);
              }
              if (config.zip) {
                handleChange(config.zip.name, gZip);
              }

              if (config.state || config.stateCode) {
                setStateCode(gStateCode);
              }

              if (!config.country?.disabled) {
                setCountryCode(gCountryCode);
              }
            } else {
              handleChange(name, value);
            }
          }}
          isShowGoogleMapIcon={false}
          {...config.address}
        />
      </div>
      {!hideApartment && (
        <div className={classes.apartment}>
          <InputPlane
            id={config.apartment.name}
            value={formik.values[config.apartment.name]}
            error={formik.errors[config.apartment.name]}
            touched={formik.touched[config.apartment.name]}
            onBlur={formik.setFieldTouched}
            onError={formik.setFieldError}
            onChange={handleChange}
            {...config.apartment}
          />
        </div>
      )}
      <div className={classes.city}>
        <InputPlane
          id={config.city.name}
          value={formik.values[config.city.name]}
          error={formik.errors[config.city.name]}
          touched={formik.touched[config.city.name]}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
          onChange={handleChange}
          {...config.city}
        />
      </div>
      <div className={classes.state}>
        <SelectPlane
          id={config.state.name}
          value={config.state.value ?? formik.values[config.state.name]}
          error={formik.errors[config.state.name]}
          touched={formik.touched[config.state.name]}
          onBlur={formik.setFieldTouched}
          options={states}
          onChange={handleChange}
          onChangeAttribute="id"
          onChangeCallback={(state) => {
            if (config.stateCode) {
              handleChange(config.stateCode.name, state.code);
            }
          }}
          formatOptionLabel={(option) => option.name}
          isSearchable
          convertMobileSelectValue={(value) => parseInt(value, 10)}
          {...config.state}
        />
      </div>
      <div className={classes.zip}>
        <InputPlane
          id={config.zip.name}
          value={formik.values[config.zip.name]}
          error={formik.errors[config.zip.name]}
          touched={formik.touched[config.zip.name]}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
          onChange={handleChange}
          {...config.zip}
        />
      </div>

      <div className={classes.country}>
        <SelectPlane
          id={config.country.name}
          value={config.country?.value ?? formik.values[config.country.name]}
          error={formik.errors[config.country.name]}
          touched={formik.touched[config.country.name]}
          onBlur={formik.setFieldTouched}
          options={countries}
          onChange={(name, value) => {
            handleChange(name, value);
            if (config.state) {
              handleChange(config.state.name, '');
            }
            if (config.stateCode) {
              handleChange(config.stateCode.name, '');
            }
          }}
          onChangeAttribute="id"
          formatOptionLabel={(option) => option.name}
          convertMobileSelectValue={(value) => parseInt(value, 10)}
          isSearchable
          disabled={countryDisabled}
          {...config.country}
        />
      </div>
    </div>
  );
}

AddressFieldsFormik.propTypes = {
  formik: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  config: PropTypes.object,
  restrictCountry: PropTypes.string,
  countryDisabled: PropTypes.bool,
  hideApartment: PropTypes.bool,
};

AddressFieldsFormik.defaultProps = {
  onChange: null,
  config: null,
  restrictCountry: '',
  countryDisabled: false,
  hideApartment: false,
};

export default AddressFieldsFormik;
