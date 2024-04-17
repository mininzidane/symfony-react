import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Input from '../../../components/Form/Input';
import TinyMCE from '../../../components/TinyMCE';
import SubmitButton from '../../../components/SubmitButton';

function SiteMessageForm({ locale, title, message, onFieldUpdate, onSubmit }) {
  async function submit(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      await onSubmit();
    } catch (e) {
      /** Ignore */
    }

    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={{
        title,
        message,
      }}
      onSubmit={submit}
      enableReinitialize
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Input
            id="title"
            name="title"
            label="Title"
            value={values.title}
            error={errors.title}
            touched={touched.title}
            onBlur={setFieldTouched}
            onChange={(name, value) => {
              onFieldUpdate(locale, name, value);
              setFieldValue(name, value);
            }}
          />

          <div className="form-group">
            <TinyMCE
              value={values.message}
              placeholder="Enter message"
              onChange={(val) => {
                setFieldValue('message', val);
                onFieldUpdate(locale, 'message', val);
              }}
            />
          </div>

          <SubmitButton label="Submit Update" className="btn-primary" disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );
}

SiteMessageForm.defaultProps = {
  title: '',
  message: '',
  onFieldUpdate: () => null,
};

SiteMessageForm.propTypes = {
  locale: PropTypes.string.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  onFieldUpdate: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default SiteMessageForm;
