import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import useVinDecode from './useVinDecode';
import useStyles from '../useStyles';

function VinForm({ formik, yearOptions, makeOptions, modelOptions, onChangeMake, hasYMM }) {
  const classes = useStyles();
  const intl = useIntl();
  const [vin, setVin] = useState(formik.values.vin);
  const [vinData, isLoading] = useVinDecode(vin);

  const preparedYearOptions = useMemo(() => {
    if (!formik.values.year || yearOptions.some(({ label }) => label === formik.values.year)) {
      return yearOptions;
    }
    return [{ label: formik.values.year, value: formik.values.year }, ...yearOptions];
  }, [yearOptions, formik.values.year]);

  const preparedMakeOptions = useMemo(() => {
    if (!formik.values.make || makeOptions.some(({ label }) => label === formik.values.make)) {
      return makeOptions;
    }
    return [{ label: formik.values.make, value: formik.values.make }, ...makeOptions];
  }, [makeOptions, formik.values.make]);

  const preparedModelOptions = useMemo(() => {
    if (!formik.values.model || modelOptions.some(({ label }) => label === formik.values.model)) {
      return modelOptions;
    }
    return [{ label: formik.values.model, value: formik.values.model }, ...modelOptions];
  }, [modelOptions, formik.values.model]);

  useEffect(() => {
    if (formik.values.vin?.length === 17 && ValidationService.validateVin(formik.values.vin)) {
      setVin(formik.values.vin);
    }
  }, [formik.values.vin]);

  useEffect(() => {
    const isVinValid =
      ValidationService.validateVin(formik.values.vin) &&
      vin === formik.values.vin &&
      !isLoading &&
      Boolean(vinData?.valid);
    formik.setFieldValue('vinValid', isVinValid);
    if (isVinValid) {
      const { year, make, model } = vinData?.data || {};
      formik.setFieldValue('vinYMM', `${year} ${make} ${model}`);
    }
  }, [vinData, formik.values.vin, vin]);

  useEffect(() => {
    if (preparedModelOptions.length === 1) {
      formik.setFieldValue('model', preparedModelOptions[0].value);
    }
  }, [preparedModelOptions]);

  const isVinValid = formik.values.vinValid;
  const hasVin = Boolean(formik.values.vin);

  return (
    <form onSubmit={formik.handleSubmit} className={classes.grid}>
      <div>
        <InputPlane
          id="vin"
          name="vin"
          placeholder={intl.formatMessage({ id: 'shared.label.vin' })}
          value={formik.values.vin}
          touched={formik.touched.vin}
          error={!isLoading && formik.errors.vin}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
          loading={isLoading}
          checkmark={isVinValid}
        />
        {isVinValid && <div className={classes.inputDesc}>{formik.values.vinYMM}</div>}
      </div>
      {hasYMM && (
        <>
          <div className={classes.separator}>
            <span>{intl.formatMessage({ id: 'shared.label.or' })}</span>
          </div>
          <div className={classes.gridGroup}>
            <SelectPlane
              id="year"
              name="year"
              placeholder={intl.formatMessage({ id: 'shared.label.selectYear' })}
              value={!hasVin ? formik.values.year : ''}
              options={preparedYearOptions}
              error={formik.errors.year}
              touched={formik.touched.year}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isSearchable
              isNativeLabelDisabled={false}
              disabled={hasVin}
            />
            <SelectPlane
              id="make"
              name="make"
              placeholder={intl.formatMessage({ id: 'shared.label.selectMake' })}
              value={!hasVin ? formik.values.make : ''}
              options={preparedMakeOptions}
              error={formik.errors.make}
              touched={formik.touched.make}
              onChange={(name, value) => {
                formik.setFieldValue('model', '');
                onChangeMake(value);
                formik.setFieldValue(name, value);
              }}
              onBlur={formik.setFieldTouched}
              isSearchable
              isNativeLabelDisabled={false}
              disabled={Boolean(formik.values.vin)}
            />
            <SelectPlane
              id="model"
              name="model"
              placeholder={intl.formatMessage({ id: 'shared.label.selectModel' })}
              value={!hasVin ? formik.values.model : ''}
              options={preparedModelOptions}
              error={formik.errors.model}
              touched={formik.touched.model}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isSearchable
              isNativeLabelDisabled={false}
              disabled={Boolean(formik.values.vin)}
            />
          </div>
        </>
      )}
    </form>
  );
}

VinForm.propTypes = {
  formik: PropTypes.object.isRequired,
  yearOptions: PropTypes.array,
  makeOptions: PropTypes.array,
  modelOptions: PropTypes.array,
  onChangeMake: PropTypes.func,
  hasYMM: PropTypes.bool,
};

VinForm.defaultProps = {
  onChangeMake: () => {},
  yearOptions: [],
  makeOptions: [],
  modelOptions: [],
  hasYMM: false,
};

export default VinForm;
