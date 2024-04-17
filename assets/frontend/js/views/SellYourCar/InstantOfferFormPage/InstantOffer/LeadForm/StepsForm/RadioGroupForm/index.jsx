import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import TextAreaPlane from 'frontend/js/components/Form/PlaneTheme/TextAreaPlane';
import useStyles from '../useStyles';

function RadioGroupForm({ formik, name, options, isDisabled, hasDamagesDescription }) {
  const classes = useStyles();
  const intl = useIntl();
  const timeout = useRef();

  return (
    <form onSubmit={formik.handleSubmit} className={classes.grid}>
      <div className={classes.radioGroup}>
        {options.map((option, index) => (
          <Fragment key={[name, index]}>
            <RadioButton
              className={classes.radioButton}
              label={option.label || option.value}
              value={option.value}
              name={name}
              id={`${name}-${index}`}
              isChecked={formik.values[name] === option.value}
              onChange={(fieldName, value) => {
                clearTimeout(timeout.current);
                formik.setFieldValue(fieldName, value);
                if (hasDamagesDescription) {
                  const newDamagesDescription = { ...formik.values.damagesDescription };
                  delete newDamagesDescription[name];
                  formik.setFieldValue('damagesDescription', newDamagesDescription);
                }
                if (!option?.hasDamagesDescription) {
                  timeout.current = setTimeout(() => {
                    formik.handleSubmit();
                  }, 100);
                }
              }}
              isDisabled={isDisabled}
              viewType="roundCheckmark"
              size="lg"
            />
            {option.hasDamagesDescription && formik.values[name] === option.value && (
              <TextAreaPlane
                id={`damagesDescription-${name}-${index}`}
                name="damagesDescription"
                label={intl.formatMessage({ id: 'sellYourCarPage.input.damagesDescription.placeholder' })}
                value={formik.values.damagesDescription[name] || formik.values.damagesDescriptionTmp?.[name] || ''}
                touched={formik.touched.damagesDescription}
                error={formik.errors.damagesDescription}
                onChange={(_, value) => {
                  const newValue = { ...formik.values.damagesDescription, [name]: value };
                  formik.setFieldValue('damagesDescription', newValue);
                  formik.setFieldValue('damagesDescriptionTmp', newValue);
                }}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                isAutoGrow
                rows={1}
                className={classes.moreDetail}
              />
            )}
          </Fragment>
        ))}
      </div>
    </form>
  );
}

RadioGroupForm.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
  hasDamagesDescription: PropTypes.bool,
};

RadioGroupForm.defaultProps = {
  isDisabled: false,
  hasDamagesDescription: false,
};

export default RadioGroupForm;
