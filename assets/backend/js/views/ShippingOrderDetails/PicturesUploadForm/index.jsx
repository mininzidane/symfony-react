import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import FormikDropzone from 'backend/js/components/Form/FormikDropzone';
import PicturesUploadValidationSchema from './PicturesUploadValidationSchema';

function PicturesUploadForm({ loading, onSubmit, type }) {
  const submitFunc = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('type', type);
    for (let i = 0; i < values.documents.length; i++) {
      formData.append(`picture_${i}`, values.documents[i]);
    }

    onSubmit(formData, resetForm);
  };

  return (
    <div className="form form--document-upload" style={{ width: '100%' }}>
      <Formik
        initialValues={{
          documents: [],
        }}
        validationSchema={PicturesUploadValidationSchema}
        onSubmit={submitFunc}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue, setFieldTouched, setFieldError, submitForm }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-row">
                <FormikDropzone
                  id="pictures"
                  name="documents"
                  fileValues={values.documents}
                  accept="image/*,video/*"
                  multiple
                  submitOnUpload
                  disabled={loading}
                  error={errors.documents}
                  touched={touched.documents}
                  onChange={setFieldValue}
                  onTouched={setFieldTouched}
                  onError={setFieldError}
                  submitTrigger={submitForm}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

PicturesUploadForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
};

export default PicturesUploadForm;
