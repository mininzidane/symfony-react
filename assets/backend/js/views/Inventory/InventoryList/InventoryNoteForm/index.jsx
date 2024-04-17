import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import SubmitButton from 'backend/js/components/SubmitButton';
import TextArea from 'backend/js/components/Form/TextArea';
import InventoryService from 'backend/js/api/InventoryService';
import useStyles from 'backend/js/views/_Shared/Micro/CustomerNoteForm/useStyles';
import InventoryNoteValidationSchema from './InventoryNoteValidationSchema';

function InventoryNoteForm({ stockNumber, onSubmitSuccess }) {
  const classes = useStyles();
  const initialState = {
    message: '',
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: InventoryNoteValidationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      setSubmitting(true);

      try {
        const { note } = await InventoryService.addNote(stockNumber, values);
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
        id={`customer-${stockNumber}-add-note`}
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
        disabled={Object.keys(formik.errors).length > 0 || formik.isSubmitting}
      />
    </form>
  );
}

InventoryNoteForm.propTypes = {
  stockNumber: PropTypes.number.isRequired,
  onSubmitSuccess: PropTypes.func,
};

InventoryNoteForm.defaultProps = {
  onSubmitSuccess: () => null,
};

export default InventoryNoteForm;
