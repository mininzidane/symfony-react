import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import Input from 'backend/js/components/Form/Input';
import SubmitButton from 'backend/js/components/SubmitButton';
import TitlesService from 'backend/js/api/TitlesService';
import { Formik } from 'formik';
import get from 'lodash/get';
import { useSnackbar } from 'notistack';

function Notes({ id, notes: notesProps }) {
  const [notes, setNotes] = useState(notesProps);
  const { enqueueSnackbar } = useSnackbar();
  const titlesService = new TitlesService();

  function prepareNote(note) {
    return note.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  async function onFormSubmit(values, { setSubmitting, resetForm }) {
    setSubmitting(true);
    try {
      const response = await titlesService.addTitleReceiveReportNote(id, { message: values.message });
      resetForm();
      setNotes(response.notes);
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
      <div style={{ maxHeight: '110px', overflow: 'hidden', overflowY: 'auto' }}>
        {notes.map((note) => (
          <div key={note.id}>
            <small className="text-muted">
              <i>
                *
                {note.author ? (
                  <>
                    {note.author.firstName} {note.author.lastName}
                  </>
                ) : (
                  <>AUTO</>
                )}
                &nbsp; - {DateTimeService.formatFromISOString(note.createdAt, 'MM/dd/yyyy H:mmaaa').toLowerCase()}
              </i>
            </small>
            &nbsp;-&nbsp;
            <span dangerouslySetInnerHTML={{ __html: prepareNote(note.message) }} />
          </div>
        ))}
      </div>
      <Formik
        initialValues={{
          message: '',
        }}
        enableReinitialize
        onSubmit={onFormSubmit}
      >
        {({ values, touched, errors, setFieldValue, setFieldTouched, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Input
              id="message"
              name="message"
              inputWrapperClassName="col-lg-12"
              className="row"
              placeholder="Enter your notes here"
              value={values.message}
              error={errors.message}
              touched={touched.message}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            />
            {values.message && (
              <SubmitButton label="Add" className="btn-primary wide" isLoading={isSubmitting} disabled={isSubmitting} />
            )}
          </form>
        )}
      </Formik>
    </>
  );
}

Notes.propTypes = {
  id: PropTypes.number.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Notes;
