import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import validationSchema from './validationSchema';

function UploadDocumentForm({ setForm, setIsValid }) {
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      documents: [],
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    const isValid = formik.isValid && formik.dirty;
    setIsValid(isValid);
  }, [formik.isValid, formik.dirty]);

  useEffect(() => {
    setForm(formik);
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
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
        onChange={formik.setFieldValue}
      />
    </form>
  );
}

UploadDocumentForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  setIsValid: PropTypes.func.isRequired,
};

export default UploadDocumentForm;
