import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import BaseApiService from '../../../../api/BaseApiService';
import SubmitButton from '../../../../components/SubmitButton';
import InstantOfferService from '../../../../api/InstantOfferService';
import TextArea from '../../../../components/Form/TextArea';
import CustomerNote from '../../../_Shared/Micro/CustomerNotes/CustomerNote';
import useStyles from './useStyles';

function InstantOfferNotes({ instantOffer, setFlash, instantOfferChangeLogs, setInstantOfferChangeLogs }) {
  const instantOfferService = new InstantOfferService();
  const classes = useStyles();

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    setFlash({ message: '', type: 'error' });

    try {
      const response = await instantOfferService.addNote(values.ref, {
        note: values.notes,
      });
      setFlash({ message: 'Note saving successful', type: 'success' });
      setInstantOfferChangeLogs(response.notes);
      values.notes = '';
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    setSubmitting(false);
  }

  function getId(ref) {
    return `notes-${ref}`;
  }

  return (
    <Formik
      initialValues={{
        ref: instantOffer.ref,
        notes: '',
      }}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit} style={{ width: 250 }}>
          <div className={classes.notes}>
            {instantOfferChangeLogs.map((instantOfferChangeLog) => {
              const note = {
                author: instantOfferChangeLog.createdBy,
                createdAt: instantOfferChangeLog.createdAt,
                message: instantOfferChangeLog.notes,
                source: instantOfferChangeLog.source,
              };
              return <CustomerNote key={instantOfferChangeLog.id} note={note} />;
            })}
          </div>

          <TextArea
            id={getId(instantOffer.ref)}
            name="notes"
            label="Notes"
            placeholder="Notes"
            value={values.notes}
            error={errors.notes}
            touched={touched.notes}
            className="textarea-hollow m-b-sm"
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
            rows={3}
          />
          <SubmitButton
            label="Save"
            className="btn-primary"
            isLoading={isSubmitting}
            disabled={!values.notes || isSubmitting}
          />
        </form>
      )}
    </Formik>
  );
}

InstantOfferNotes.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setFlash: PropTypes.func.isRequired,
  instantOfferChangeLogs: PropTypes.arrayOf(PropTypes.object),
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
};

InstantOfferNotes.defaultProps = {
  instantOfferChangeLogs: [],
};

export default InstantOfferNotes;
