import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import BaseApiService from 'backend/js/api/BaseApiService';
import SubmitButton from 'backend/js/components/SubmitButton';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import Input from 'backend/js/components/Form/Input';
import TextArea from 'backend/js/components/Form/TextArea';
import schema from './schema';

function SendEmailForm({ lotId, location, setModalContent }) {
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const instantOfferService = new InstantOfferService();
      await instantOfferService.sendLocationEmail({
        to: values.to,
        subject: values.subject,
        message: values.message,
      });
      enqueueSnackbar('Email sent successful', { variant: 'success' });

      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }

    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={{
        to: `gmyard${location.id}@copart.com`,
        subject: `Documents: Lot#${lotId || ''}`,
        message: '',
      }}
      enableReinitialize
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="m-b">
            <Input
              label="To"
              id="to"
              name="to"
              value={values.to}
              error={errors.to}
              touched={touched.to}
              onChange={setFieldValue}
              onError={setFieldError}
              onBlur={setFieldTouched}
            />
          </div>
          <div className="m-b">
            <Input
              label="Subject"
              id="subject"
              name="subject"
              value={values.subject}
              error={errors.subject}
              touched={touched.subject}
              onChange={setFieldValue}
              onError={setFieldError}
              onBlur={setFieldTouched}
            />
          </div>
          <div className="m-b">
            <TextArea
              label="Message"
              id="message"
              name="message"
              value={values.message}
              error={errors.message}
              touched={touched.message}
              onChange={setFieldValue}
              onError={setFieldError}
              onBlur={setFieldTouched}
            />
          </div>

          <SubmitButton label="Send email" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );
}

SendEmailForm.propTypes = {
  lotId: PropTypes.number,
  location: PropTypes.object.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

SendEmailForm.defaultProps = {
  lotId: null,
};

export default SendEmailForm;
