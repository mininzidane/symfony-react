import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import TextAreaPlane from 'frontend/js/components/Form/PlaneTheme/TextAreaPlane';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import FilesList from './FilesList';
import useStyles from './useStyles';

function Form({ formik, files, onRemoveFile, getInputProps, isDragActive, openFileDialog }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.message}>
        <TextAreaPlane
          id="message"
          name="message"
          label={intl.formatMessage({ id: 'shared.label.typeNewMessage' })}
          rows={1}
          value={formik.values.message}
          error={formik.errors.message}
          touched={formik.touched.message}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          isAutoGrow
          className={classnames(classes.textarea, isDragActive && 'is-drag-active')}
          optionalComponent={<FilesList filesList={files} onRemoveFile={onRemoveFile} />}
        />
      </div>
      <div className={classes.actions}>
        <ButtonOutlined
          type="submit"
          label={
            <div className={classes.ctaLabel}>
              <svg width="10" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 4.5v8.625a3 3 0 1 1-6 0V3.75a1.876 1.876 0 0 1 3.75 0v7.875c0 .412-.338.75-.75.75a.752.752 0 0 1-.75-.75V4.5H3.125v7.125a1.876 1.876 0 0 0 3.75 0V3.75a3 3 0 1 0-6 0v9.375A4.123 4.123 0 0 0 5 17.25a4.123 4.123 0 0 0 4.125-4.125V4.5H8Z"
                  fill="currentColor"
                />
              </svg>
              {intl.formatMessage({ id: 'shared.cta.uploadFile' })}
            </div>
          }
          size="sm"
          isLoading={false}
          isBackgroundWhite
          isInline
          onClick={openFileDialog}
          className={classes.cta}
        />
        <input {...getInputProps()} />

        <Button
          label={
            <div className={classes.ctaLabel}>
              <svg
                width="18"
                height="14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={classes.ctaSendIcon}
              >
                <path
                  d="M15.8995 6.8995 1.8587 1.1413l-.539.539 2.3044 5.2192-2.3099 5.2137.539.539 14.0463-5.7527ZM11.5 7h-8"
                  stroke="currentColor"
                />
              </svg>
              {intl.formatMessage({ id: 'shared.cta.send' })}
            </div>
          }
          size="sm"
          className={classes.cta}
          onClick={formik.submitForm}
          isNowrap
          isInline
        />
      </div>
    </div>
  );
}

Form.propTypes = {
  formik: PropTypes.object.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
  isDragActive: PropTypes.bool.isRequired,
  openFileDialog: PropTypes.func.isRequired,
  files: PropTypes.array,
};

Form.defaultProps = {
  files: null,
};

export default Form;
