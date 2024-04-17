import React, { useEffect } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import validationSchema from './validationSchema';

function WireConfirmationForm({ setForm, setIsValid }) {
  const intl = useIntl();
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      amount: '',
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
      <InputPlane
        id="amount"
        name="amount"
        label={intl.formatMessage({ id: 'shared.label.amount' })}
        value={formik.values.amount}
        error={formik.errors.amount}
        touched={formik.touched.amount}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
      />
      <div className="mt-20">
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
      </div>
    </form>
  );
}

WireConfirmationForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  setIsValid: PropTypes.func.isRequired,
};

export default WireConfirmationForm;
