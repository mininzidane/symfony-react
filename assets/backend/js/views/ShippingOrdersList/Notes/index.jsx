import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import get from 'lodash/get';
import { useSnackbar } from 'notistack';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import Input from 'backend/js/components/Form/Input';
import SubmitButton from 'backend/js/components/SubmitButton';

function Notes({ id }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const response = await ShippingOrderService.getEhNotes(id);
        setNotes(response.notes);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  function prepareNote(note) {
    return note.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  async function onFormSubmit(values, { setSubmitting, resetForm }) {
    setSubmitting(true);
    try {
      const response = await ShippingOrderService.addNote(id, { message: values.message });
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
    <div className="ibox">
      <div className="ibox-content">
        <>
          {isLoading && (
            <div style={{ minHeight: 34 }}>
              <SpinnerWheel size={34} thickness={3} isCentered />
            </div>
          )}
        </>
        <div style={{ maxHeight: '110px', overflow: 'hidden', overflowY: 'auto' }}>
          {notes.map((note) => (
            <div key={note.id}>
              <small className="text-muted">
                <i>
                  *{note.authorDetails ? note.authorDetails : 'AUTO'}&nbsp; -{' '}
                  {DateTimeService.formatFromISOString(note.createdAt, 'MM/dd/yyyy H:mmaaa').toLowerCase()}
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
      </div>
    </div>
  );
}

Notes.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Notes;
