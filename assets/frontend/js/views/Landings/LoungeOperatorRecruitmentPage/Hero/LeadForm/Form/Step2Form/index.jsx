import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import useRadioOptions from '../useRadioOptions';
import useStyles from '../useStyles';

function Step2Form({ formik }) {
  const classes = useStyles();
  const intl = useIntl();
  const { options } = useRadioOptions();
  const isCarsImporter = formik.values.isCarsImporter === '1';

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.gridGroup}>
        <InputPlane
          id="businessName"
          name="businessName"
          placeholder={intl.formatMessage({ id: 'shared.label.businessName' })}
          value={formik.values.businessName}
          touched={formik.touched.businessName}
          error={formik.errors.businessName}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
        />

        <InputPlane
          id="website"
          name="website"
          placeholder={intl.formatMessage({ id: 'shared.label.website' })}
          value={formik.values.website}
          touched={formik.touched.website}
          error={formik.errors.website}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
        />
      </div>

      <div className={classes.label} style={{ paddingTop: 16 }}>
        {intl.formatMessage({ id: 'landings.loungeOperatorRecruitmentPage.leadForm.label1' })}
      </div>

      <RadioGroup
        className={classes.radio}
        name="isCarsImporter"
        onChange={(name, value) => formik.setFieldValue(name, value)}
        value={formik.values.isCarsImporter}
        options={options}
      />

      {isCarsImporter && (
        <InputPlane
          id="annualVolume"
          name="annualVolume"
          placeholder={intl.formatMessage({ id: 'shared.label.annualVolume' })}
          value={isCarsImporter ? formik.values.annualVolume : ''}
          touched={formik.touched.annualVolume}
          error={formik.errors.annualVolume}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
        />
      )}
    </form>
  );
}

Step2Form.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default Step2Form;
