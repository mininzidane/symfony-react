import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useFormik } from 'formik';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import useStyles from './useStyles';
import validationSchema from './validationSchema';

function DocumentsUpload({ setForm }) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      documents: [],
    },
    onSubmit: () => {},
    validationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setForm(formik, 'doc');
  }, [formik]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage id="brokerManagerPage.uploadedDocument" />
      </div>
      <FilesUpload
        id="documents"
        name="documents"
        fileValues={formik.values.documents}
        accept="image/png,image/jpg,image/jpeg,.pdf"
        error={formik.errors.documents}
        touched={formik.touched.documents}
        onTouched={formik.setFieldTouched}
        onError={formik.setFieldError}
        isTriggerHidden={!!formik.values.documents.length}
        isDropArea
        dropAreaType="identityDocument"
        onChange={(name, value) => {
          formik.setFieldValue(name, value);
        }}
      />
    </div>
  );
}

DocumentsUpload.propTypes = {
  setForm: PropTypes.func.isRequired,
};

export default DocumentsUpload;
