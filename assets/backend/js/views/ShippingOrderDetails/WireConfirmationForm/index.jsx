import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import FormikDropzone from 'backend/js/components/Form/FormikDropzone';
import Input from 'backend/js/components/Form/Input';
import SubmitButton from 'backend/js/components/SubmitButton';
import WireConfirmationValidationSchema from './WireConfirmationValidationSchema';

function BolUploadForm({ loading, onSubmit }) {
  const submitFunc = async (values) => {
    const formData = new FormData();
    formData.append('amount', values.amount.replace(/[^0-9.]/g, ''));
    formData.append(`files`, values.documents[0]);

    onSubmit(formData);
  };

  return (
    <div className="form form--WireConfirmation-document-upload">
      <Formik
        initialValues={{
          documents: [],
          amount: '',
        }}
        validationSchema={WireConfirmationValidationSchema}
        onSubmit={submitFunc}
        render={({ values, errors, touched, handleSubmit, setFieldValue, setFieldTouched, setFieldError }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <div className="form-row col-md-1">
                <Input
                  onChange={setFieldValue}
                  error={errors.amount}
                  touched={touched.amount}
                  value={values.amount}
                  onBlur={() => {}}
                  name="amount"
                  id="wire-confirmation-amount"
                  mask="currency"
                  placeholder="Amount"
                />
              </div>
              <div className="form-row col-md-11">
                <SubmitButton isLoading={loading} label="Submit" />
              </div>
            </div>
            <div className="form-group clearfix">
              <div className="form-row">
                <FormikDropzone
                  id="wire-confirmation-documents"
                  name="documents"
                  fileValues={values.documents}
                  accept="image/*,.pdf"
                  multiple={false}
                  disabled={loading}
                  error={errors.documents}
                  touched={touched.documents}
                  onChange={setFieldValue}
                  onTouched={setFieldTouched}
                  onError={setFieldError}
                />
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
}

BolUploadForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default BolUploadForm;
