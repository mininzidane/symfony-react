import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'backend/js/components/Form/Input';
import { Formik } from 'formik';
import get from 'lodash/get';
import CustomerParentService from 'backend/js/api/CustomerParentService';
import SubmitButton from 'backend/js/components/SubmitButton';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import { useSnackbar } from 'notistack';

function Notes({ customerParent, allowToAdd }) {
  const [notes, setNotes] = useState(customerParent.notes);
  const scrollBlock = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const customerParentService = new CustomerParentService();

  async function onFormSubmit(values, { setSubmitting, resetForm }) {
    setSubmitting(true);
    try {
      const response = await customerParentService.addNote(customerParent.id, { message: values.message });
      resetForm();
      setNotes(response.customerParent.notes);
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

  useEffect(() => {
    if (scrollBlock) {
      scrollBlock.current.scrollTo(0, 0);
    }
  }, [scrollBlock, notes]);

  function prepareNote(note) {
    return note.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  return (
    <>
      <div style={{ maxHeight: '360px', overflow: 'hidden', overflowY: 'auto' }} ref={scrollBlock}>
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
      {allowToAdd && (
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
                <SubmitButton
                  label="Add"
                  className="btn-primary wide"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                />
              )}
            </form>
          )}
        </Formik>
      )}
    </>
  );
}

Notes.propTypes = {
  customerParent: PropTypes.object.isRequired,
  allowToAdd: PropTypes.bool,
};

Notes.defaultProps = {
  allowToAdd: false,
};

export default Notes;
