import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import FormikDropzone from '../Form/FormikDropzone';
import UploadImageValidationSchema from './UploadImageValidationSchema';

function ImageUploadForm({ loading, multipleUpload, submitOnUpload, resetOnSuccess, onSubmit }) {
  const submitFunc = async (values, { resetForm }) => {
    const formData = new FormData();
    for (let i = 0; i < values.images.length; i++) {
      formData.append(`image_${i}`, values.images[i]);
    }

    try {
      await onSubmit(formData);
      if (resetOnSuccess) {
        resetForm({});
      }
    } catch (e) {
      resetForm({});
    }
  };

  return (
    <div className="form form--upload-image">
      <Formik
        initialValues={{ images: [] }}
        validationSchema={UploadImageValidationSchema}
        onSubmit={submitFunc}
        render={({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          setFieldError,
          submitForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-row">
                <FormikDropzone
                  id="image-upload"
                  name="images"
                  fileValues={values.images}
                  accept="image/*,.pdf"
                  multiple={multipleUpload}
                  submitOnUpload={submitOnUpload}
                  disabled={loading}
                  error={errors.images}
                  touched={touched.images}
                  onChange={setFieldValue}
                  onTouched={setFieldTouched}
                  onError={setFieldError}
                  submitTrigger={submitForm}
                />
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
}

ImageUploadForm.defaultProps = {
  multipleUpload: false,
  submitOnUpload: false,
  resetOnSuccess: false,
};

ImageUploadForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  multipleUpload: PropTypes.bool,
  submitOnUpload: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  resetOnSuccess: PropTypes.bool,
};

export default ImageUploadForm;
