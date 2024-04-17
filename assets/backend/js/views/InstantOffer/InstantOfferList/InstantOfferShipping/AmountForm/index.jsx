import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import SubmitButton from 'backend/js/components/SubmitButton';
import Input from 'backend/js/components/Form/Input';

function AmountForm({ amount, onSubmit }) {
  return (
    <Formik
      initialValues={{
        amount,
      }}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="text-md mb-10">Amount:</div>
          <div className="m-b">
            <Input
              label=""
              id="amount"
              name="amount"
              placeholder="Edit Amount"
              value={values.amount}
              error={errors.amount}
              touched={touched.amount}
              onChange={setFieldValue}
              onError={setFieldError}
              onBlur={setFieldTouched}
              mask="currency"
            />
          </div>

          <SubmitButton label="Update" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );
}

AmountForm.propTypes = {
  amount: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AmountForm;
