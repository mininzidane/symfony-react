import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import SubmitButton from 'backend/js/components/SubmitButton';
import TextArea from 'backend/js/components/Form/TextArea';
import CustomerService from 'backend/js/api/CustomerService';
import CustomerNoteValidationSchema from 'backend/js/views/_Shared/Micro/CustomerNoteForm/CustomerNoteValidationSchema';
import useStyles from './useStyles';

function CustomerNoteForm({ customer, lot, category, onSubmit, onSubmitSuccess }) {
  if (!customer) {
    return null;
  }

  const customerService = new CustomerService();
  const classes = useStyles();
  const initialState = {
    customerId: customer.id,
    lotId: lot && lot.id,
    category: category || '',
    message: '',
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: CustomerNoteValidationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      setSubmitting(true);
      if (onSubmit) {
        onSubmit(values);
      }

      try {
        const { note } = await customerService.addNote(values.customerId, values);
        onSubmitSuccess(note);
        resetForm(initialState);
      } catch (e) {
        setFieldError('message', 'An error occurred on submit');
      }

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextArea
        name="message"
        id={`customer-${customer.id}-add-note`}
        className={classes.textArea}
        label="Enter your notes here"
        value={formik.values.message}
        error={formik.errors.message}
        touched={formik.touched.message}
        onBlur={formik.setFieldTouched}
        onChange={formik.setFieldValue}
        rows={2}
      />

      <SubmitButton
        className="btn btn-primary m-t-sm full-width"
        label="Add"
        isLoading={formik.isSubmitting}
        disabled={Object.keys(formik.errors).length || formik.isSubmitting}
      />
    </form>
  );
}

CustomerNoteForm.propTypes = {
  customer: PropTypes.object.isRequired,
  lot: PropTypes.object,
  category: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
  onSubmit: PropTypes.func,
};

CustomerNoteForm.defaultProps = {
  lot: undefined,
  category: undefined,
  onSubmitSuccess: () => null,
  onSubmit: () => null,
};

export default CustomerNoteForm;
