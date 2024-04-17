import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import useRadioOptions from '../useRadioOptions';
import useStyles from '../useStyles';

function Step3Form({ formik }) {
  const classes = useStyles();
  const intl = useIntl();
  const { options } = useRadioOptions();
  const hasOffice = formik.values.hasOffice === '1';

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.label}>
        {intl.formatMessage({ id: 'landings.loungeOperatorRecruitmentPage.leadForm.label2' })}
      </div>

      <RadioGroup
        className={classes.radio}
        name="hasOffice"
        onChange={(name, value) => formik.setFieldValue(name, value)}
        value={formik.values.hasOffice}
        options={options}
      />

      {hasOffice && (
        <>
          <InputPlane
            id="officeAddress"
            name="officeAddress"
            placeholder={intl.formatMessage({ id: 'shared.label.address' })}
            value={formik.values.officeAddress}
            touched={formik.touched.officeAddress}
            error={formik.errors.officeAddress}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            onError={formik.setFieldError}
          />

          <div className={classes.filesUpload}>
            <FilesUpload
              label="UPLOAD FILE(S)"
              id="officePhotos"
              name="officePhotos"
              fileValues={formik.values.officePhotos}
              accept="image/png,image/jpg,image/jpeg,.pdf"
              error={formik.errors.officePhotos}
              touched={formik.touched.officePhotos}
              onTouched={formik.setFieldTouched}
              onError={formik.setFieldError}
              isDropArea
              isLoading={false}
              isTriggerHidden={!!formik.values.officePhotos.length}
              dropAreaType="photoUpload"
              onChange={formik.setFieldValue}
              fileWrapClassName={classes.fileWrap}
              dropAreaClassName={classes.dropArea}
              multiple
            />
          </div>
        </>
      )}
    </form>
  );
}

Step3Form.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default Step3Form;
