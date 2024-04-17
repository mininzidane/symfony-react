import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import FormikDropzone from 'backend/js/components/Form/FormikDropzone';
import BosUploadValidationSchema from './BosUploadValidationSchema';

function BosUploadForm({ loading, onSubmit }) {
  const submitFunc = async (values) => {
    const formData = new FormData();
    for (let i = 0; i < values.documents.length; i++) {
      formData.append(`bos_document_${i}`, values.documents[i]);
    }

    onSubmit(formData);
  };

  return (
    <div className="form form--bos-document-upload">
      <Formik
        initialValues={{
          documents: [],
        }}
        validationSchema={BosUploadValidationSchema}
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
                  id="bos-documents"
                  name="documents"
                  fileValues={values.documents}
                  accept="image/*,.pdf"
                  multiple={false}
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
      />
    </div>
  );
}

BosUploadForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default BosUploadForm;
