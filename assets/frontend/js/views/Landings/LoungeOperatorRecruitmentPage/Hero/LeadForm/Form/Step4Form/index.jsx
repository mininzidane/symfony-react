import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import TextAreaPlane from 'frontend/js/components/Form/PlaneTheme/TextAreaPlane';
import useRadioOptions from '../useRadioOptions';
import useStyles from '../useStyles';

function Step4Form({ formik }) {
  const classes = useStyles();
  const intl = useIntl();
  const { options } = useRadioOptions();
  const hasStaffing = formik.values.hasStaffing === '1';

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.label}>
        {intl.formatMessage({ id: 'landings.loungeOperatorRecruitmentPage.leadForm.label3' })}
      </div>

      <RadioGroup
        className={classes.radio}
        name="hasStaffing"
        onChange={(name, value) => formik.setFieldValue(name, value)}
        value={formik.values.hasStaffing}
        options={options}
      />

      {hasStaffing && (
        <>
          <InputPlane
            id="staffMembersInfo"
            name="staffMembersInfo"
            placeholder={intl.formatMessage({
              id: 'landings.loungeOperatorRecruitmentPage.leadForm.staffMembersInfo',
            })}
            value={hasStaffing ? formik.values.staffMembersInfo : ''}
            touched={formik.touched.staffMembersInfo}
            error={formik.errors.staffMembersInfo}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            onError={formik.setFieldError}
          />

          <TextAreaPlane
            id="additionalInfo"
            name="additionalInfo"
            label={intl.formatMessage({ id: 'shared.label.additionalInformationOptional' })}
            value={formik.values.additionalInfo}
            touched={formik.touched.additionalInfo}
            error={formik.errors.additionalInfo}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            className={classes.textarea}
            rows={3}
          />
        </>
      )}
    </form>
  );
}

Step4Form.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default Step4Form;
