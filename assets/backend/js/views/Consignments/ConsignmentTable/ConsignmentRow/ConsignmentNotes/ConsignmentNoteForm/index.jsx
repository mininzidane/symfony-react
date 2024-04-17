import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import SubmitButton from 'backend/js/components/SubmitButton';
import TextArea from 'backend/js/components/Form/TextArea';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function ConsignmentNoteForm({ consignment, onSubmit, onSubmitSuccess }) {
  if (!consignment) {
    return null;
  }

  const classes = useStyles();
  const initialState = {
    consignment: consignment.id,
    message: '',
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      setSubmitting(true);
      if (onSubmit) {
        onSubmit(values);
      }

      try {
        const { note } = await ConsignmentService.addNote(values.consignment, { message: values.message });
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
        id={`consignment-${consignment.id}-add-note`}
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

ConsignmentNoteForm.propTypes = {
  consignment: PropTypes.object.isRequired,
  onSubmitSuccess: PropTypes.func,
  onSubmit: PropTypes.func,
};

ConsignmentNoteForm.defaultProps = {
  onSubmitSuccess: () => null,
  onSubmit: () => null,
};

export default ConsignmentNoteForm;
