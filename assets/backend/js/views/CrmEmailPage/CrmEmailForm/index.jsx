import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import get from 'lodash/get';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/Select';
import CrmEmailFormValidationSchema from './CrmEmailFormValidationSchema';
import SubmitButton from '../../../components/SubmitButton';
import Button from '../../../components/Button';
import SeoContentShape from '../../../lib/propshapes/SeoContentShape';
import TextArea from '../../../components/Form/TextArea';

function CrmEmailForm({ crmEmail, supportedLocales, onSubmit, onSubmitSuccess, onSubmitError }) {
  const isEditMode = crmEmail && crmEmail.id > 0;
  let contentReplacementPatterns = [];
  if (isEditMode && crmEmail.data && crmEmail.data.replacementPatterns) {
    contentReplacementPatterns = crmEmail.data.replacementPatterns || [];
  }

  const [errorMessage, setErrorMessage] = useState('');
  const [replacementPatterns, setReplacementPatterns] = useState(contentReplacementPatterns);
  const replacementPatternRef = useRef();
  const replacementPatternValueRef = useRef();

  async function onFormSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    setErrorMessage('');
    try {
      const payload = { ...values, replacementPatterns };
      const { crmEmail: crmEmailResponse } = await onSubmit(payload);
      onSubmitSuccess(crmEmailResponse);
    } catch (serverError) {
      let messages = 'An error occurred while processing this request.';
      if (serverError) {
        const errors = get(serverError, 'response.data.errors.errors', {});
        messages = Object.values(errors).join(' ');
      }

      onSubmitError(messages);
    }
    setSubmitting(false);
  }

  function removeReplacementPattern(pattern, noSave = false) {
    const updatedPatterns = replacementPatterns.slice();
    const existing = updatedPatterns.findIndex((val) => val.pattern === pattern);
    if (existing !== -1) {
      updatedPatterns.splice(existing, 1);
    }

    if (!noSave) {
      setReplacementPatterns(updatedPatterns);
    }

    return updatedPatterns;
  }

  function addReplacementPattern(pattern, value) {
    const updatedPatterns = removeReplacementPattern(pattern, true);
    updatedPatterns.push({ pattern, value });

    setReplacementPatterns(updatedPatterns);
  }

  function getLocaleValueFromContent(locale, field) {
    if (!crmEmail || !crmEmail.translations || !crmEmail.translations[locale]) {
      return '';
    }

    return crmEmail.translations[locale][field] || '';
  }

  function getValueFromContent(field) {
    if (!crmEmail) {
      return '';
    }

    return get(crmEmail, field, '');
  }

  const localeOptions = supportedLocales.reduce((acc, cur) => {
    acc.push({ label: cur, value: cur });
    return acc;
  }, []);

  const localeFields = {};
  supportedLocales.forEach((locale) => {
    localeFields[locale] = {
      subject: getLocaleValueFromContent(locale, 'subject'),
      content: getLocaleValueFromContent(locale, 'content'),
    };
  });

  function insertReplacementPattern() {
    let error = '';
    const { current: currentPattern } = replacementPatternRef;
    const { current: currentValue } = replacementPatternValueRef;

    let { value: pattern } = currentPattern;
    const { value } = currentValue;
    if (!pattern && !value) {
      error = 'Please provide both a pattern and a value for a new replacement pattern';
    } else {
      pattern = `${pattern.trim().replace('%', '')}`;
      addReplacementPattern(pattern, value);
      currentPattern.value = '';
      currentValue.value = '';
    }

    setErrorMessage(error);
  }

  function getLocaleFieldValue(obj, locale, field) {
    try {
      return obj.localeFields[locale][field];
    } catch (error) {
      /** Ignore */
    }

    return undefined;
  }

  return (
    <>
      <div className="m-b-lg">
        <div className="row m-b-lg">
          {errorMessage && <div className="col-lg-12 text-danger mb-b-sm">{errorMessage}</div>}
        </div>
      </div>

      <Formik
        initialValues={{
          locale: supportedLocales[0],
          name: getValueFromContent('name'),
          localeFields,
        }}
        enableReinitialize
        validationSchema={CrmEmailFormValidationSchema}
        onSubmit={onFormSubmit}
      >
        {({ values, touched, errors, setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="row m-b-lg">
              <div className="col-lg-6">
                <Select
                  id="locale"
                  label="Locale"
                  name="locale"
                  className="required"
                  value={values.locale}
                  error={errors.locale}
                  touched={touched.locale}
                  options={localeOptions}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  id="name"
                  label="Name"
                  name="name"
                  className="required"
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
            </div>

            <hr />
            <div className="row m-b-lg">
              <div className="col-lg-6">
                <h4>Replacement Patterns</h4>
                <br />
                <strong>Added: </strong>
                {replacementPatterns.map(({ pattern, value }) => (
                  <div className="row m-b-sm" key={pattern}>
                    <div className="col-lg-12">
                      <span className="m-r-sm">
                        {pattern} : {value}
                      </span>
                      <Button
                        label={<i className="fa fa-trash" />}
                        className="btn btn-sm btn-danger"
                        onClick={() => removeReplacementPattern(pattern)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      ref={replacementPatternRef}
                      placeholder="Replacement Pattern"
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control m-b-sm"
                      ref={replacementPatternValueRef}
                      placeholder="Replacement Value"
                    />
                    <Button label="Add" className="btn btn-sm btn-primary" onClick={() => insertReplacementPattern()} />
                  </div>
                </div>
              </div>
            </div>
            <hr />

            {supportedLocales.map((supportedLocale) => (
              <div key={supportedLocale}>
                {values.locale === supportedLocale && (
                  <div className="m-b-lg">
                    <Input
                      id={`localeFields[${supportedLocale}].subject`}
                      name={`localeFields[${supportedLocale}].subject`}
                      label="Subject"
                      value={getLocaleFieldValue(values, supportedLocale, 'subject')}
                      error={getLocaleFieldValue(errors, supportedLocale, 'subject')}
                      touched={getLocaleFieldValue(touched, supportedLocale, 'subject')}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    <TextArea
                      id={`localeFields[${supportedLocale}].content`}
                      name={`localeFields[${supportedLocale}].content`}
                      label="Content"
                      rows={20}
                      value={getLocaleFieldValue(values, supportedLocale, 'content')}
                      error={getLocaleFieldValue(errors, supportedLocale, 'content')}
                      touched={getLocaleFieldValue(touched, supportedLocale, 'content')}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  </div>
                )}
              </div>
            ))}

            <div className="row m-b-lg">
              <div className="col-lg-12">
                <SubmitButton
                  label="Submit"
                  className="btn-primary pull-right"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

CrmEmailForm.propTypes = {
  crmEmail: SeoContentShape,
  supportedLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
};

CrmEmailForm.defaultProps = {
  crmEmail: undefined,
};

export default CrmEmailForm;
