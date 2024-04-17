import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Formik } from 'formik';
import get from 'lodash/get';
import TextArea from 'backend/js/components/Form/TextArea';
import SubmitButton from 'backend/js/components/SubmitButton';
import CustomerParentService from 'backend/js/api/CustomerParentService';
import { useSnackbar } from 'notistack';

function Terms({ customerParent, allowToAdd }) {
  const [terms, setTerms] = useState(customerParent.terms || '');
  const [editTerms, setEditTerms] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const customerParentService = new CustomerParentService();

  function toggleEditTerms() {
    setEditTerms(!editTerms);
  }

  async function onFormSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      await customerParentService.partialUpdate(customerParent.id, { terms: values.terms });
      setTerms(values.terms);
      setEditTerms(false);
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

  function prepareTerms(text) {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  return (
    <>
      <h2>
        Terms &nbsp;&nbsp;
        {allowToAdd && (
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              toggleEditTerms();
            }}
          >
            <i className="glyphicon glyphicon-edit" />
          </button>
        )}
      </h2>
      {editTerms ? (
        <Formik
          initialValues={{
            terms,
          }}
          enableReinitialize
          onSubmit={onFormSubmit}
        >
          {({ values, touched, errors, setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextArea
                id="terms"
                name="terms"
                label=""
                className="form-group"
                value={values.terms}
                error={errors.terms}
                touched={touched.terms}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                rows="10"
              />
              <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
            </form>
          )}
        </Formik>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: prepareTerms(terms) }}
          style={{ maxHeight: '100px', overflow: 'hidden', overflowY: 'auto' }}
        />
      )}
    </>
  );
}

Terms.propTypes = {
  customerParent: PropTypes.object.isRequired,
  allowToAdd: PropTypes.bool,
};

Terms.defaultProps = {
  allowToAdd: false,
};

export default Terms;
