import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import NumberService from 'frontend/js/lib/utils/NumberService';
import StringService from 'frontend/js/lib/utils/StringService';
import useStyles from '../useStyles';

function MileageForm({ formik }) {
  const classes = useStyles();
  const intl = useIntl();
  const isChecked = formik.values.unableToVerifyMileage === '1';

  function handleToggle() {
    formik.setFieldValue('unableToVerifyMileage', !isChecked ? '1' : '');
    if (!isChecked) {
      setTimeout(() => {
        formik.setFieldValue('mileage', '');
        formik.handleSubmit();
      }, 100);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className={classes.grid}>
      <InputPlane
        id="mileage"
        name="mileage"
        placeholder={intl.formatMessage({ id: 'sellYourCarPage.input.mileage.placeholder' })}
        value={formik.values.mileage ? NumberService.formatNumber(formik.values.mileage) : ''}
        touched={formik.touched.mileage}
        error={formik.errors.mileage}
        onChange={(name, value) => {
          const val = StringService.removeNonDigits(value);
          formik.setFieldValue(name, val || '');
          if (formik.values.unableToVerifyMileage === '1') {
            formik.setFieldValue('unableToVerifyMileage', '');
          }
        }}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
        mask="numbers"
      />
      <div
        className={classnames(classes.radioGroup, classes.radioToggle)}
        onClick={handleToggle}
        onKeyPress={handleToggle}
        tabIndex={0}
        role="button"
      >
        <RadioButton
          label={intl.formatMessage({ id: 'sellYourCarPage.label.unableToVerify' })}
          value="1"
          name="unableToVerifyMileage"
          id="unableToVerifyMileage"
          isChecked={formik.values.unableToVerifyMileage === '1'}
          viewType="roundCheckmark"
          size="lg"
        />
      </div>
    </form>
  );
}

MileageForm.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default MileageForm;
