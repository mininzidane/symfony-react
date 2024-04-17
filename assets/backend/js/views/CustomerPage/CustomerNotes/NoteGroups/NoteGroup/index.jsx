import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import get from 'lodash/get';
import { useSnackbar } from 'notistack';
import NoteItem from 'backend/js/views/CustomerPage/CustomerNotes/NoteGroups/NoteGroup/NoteItem';
import CustomerService from 'backend/js/api/CustomerService';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import TextArea from 'backend/js/components/Form/TextArea';
import SubmitButton from 'backend/js/components/SubmitButton';
import CustomerNoteCreateValidationSchema from './CustomerNoteCreateValidationSchema';

function NoteGroup({ category, noteList, customerId, isAdmin, notesCount }) {
  const [notes, setNotes] = useState(noteList);
  const [isLoading, setIsLoading] = useState(false);
  const [allNotesLoaded, setAllNotesLoaded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const customerService = new CustomerService();

  async function loadAllNotes() {
    setIsLoading(true);
    try {
      const { notes: allNotes } = await customerService.getNotesByGroup(customerId, category.key, { limit: null });
      setNotes(allNotes);
      setAllNotesLoaded(true);
    } catch (serverError) {
      // nothing
    }

    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <div className="ibox-content">
        <SpinnerWheel isCentered size={40} thickness={3} />
      </div>
    );
  }

  if (notes.length === 0) {
    return null;
  }

  async function onFormSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      const { notes: allNotes } = await customerService.createGroupNote(customerId, category.key, {
        message: values.message,
        limit: allNotesLoaded ? null : notesCount,
      });
      values.message = '';
      setNotes(allNotes);
      enqueueSnackbar('Customer note saved successfully', { variant: 'success' });
    } catch (serverError) {
      let messages = 'An error occurred while processing this request.';
      if (serverError) {
        const errors = get(serverError, 'response.data.errors.errors', {});
        messages = Object.values(errors).join(' ');
      }

      enqueueSnackbar(messages, { variant: 'error' });
    }
    setSubmitting(false);
  }

  return (
    <>
      <div className="ibox-title">
        <h5 className="text-uppercase">
          {category.link && <a href={category.link}>{category.name}</a>}
          {!category.link && category.name}
        </h5>
      </div>
      <div className="ibox-content">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} isAdmin={isAdmin} customerId={customerId} />
        ))}

        {notes.length === notesCount && allNotesLoaded === false && (
          <button type="button" className="btn btn-link m-t-md" onClick={loadAllNotes}>
            View All Notes
          </button>
        )}

        <Formik
          initialValues={{
            message: '',
          }}
          validationSchema={CustomerNoteCreateValidationSchema}
          enableReinitialize
          onSubmit={onFormSubmit}
        >
          {({ values, touched, errors, setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="row m-t">
                <div className="col-sm-4">
                  <TextArea
                    id="message"
                    name="message"
                    value={values.message}
                    error={errors.message}
                    touched={touched.message}
                    onBlur={setFieldTouched}
                    onChange={setFieldValue}
                    label="Note message"
                    rows={2}
                  />
                </div>
                <div className="col-sm-2">
                  <SubmitButton label="Save" className="btn btn-primary" isLoading={isSubmitting} />
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

NoteGroup.propTypes = {
  category: PropTypes.shape({
    key: PropTypes.string,
    link: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  noteList: PropTypes.array,
  customerId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  notesCount: PropTypes.number.isRequired,
};

NoteGroup.defaultProps = {
  noteList: [],
  isAdmin: false,
};

export default NoteGroup;
