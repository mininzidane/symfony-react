import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import get from 'lodash/get';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/Select';
import SeoContentFormValidationSchema from './SeoContentFormValidationSchema';
import SubmitButton from '../../../components/SubmitButton';
import TextArea from '../../../components/Form/TextArea';
import Button from '../../../components/Button';
import FormikTickbox from '../../../components/Form/FormikTickbox';
import SeoContentShape from '../../../lib/propshapes/SeoContentShape';
import DomainService from '../../../api/DomainService';

const seoContentTopBlock = `
<div class="seo__block">
    <h1>Title</h1>
    <p>Body Content</p>
</div>`;

const seoContentSecondaryBlock = `
<div class="seo__block">
    <h2>Title</h2>
    <p>Body Content</p>
</div>`;

const seoContentSecondaryBlockList = `
<div class="seo__block">
    <h2>Title</h2>
    <p>Body Content</p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
</div>`;

function SeoContentForm({
  seoContent,
  supportedLocales,
  supportedPageTypes,
  availableParents,
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
}) {
  const isEditMode = seoContent && seoContent.id > 0;
  let contentReplacementPatterns = [];
  if (isEditMode && seoContent.data && seoContent.data.replacementPatterns) {
    contentReplacementPatterns = seoContent.data.replacementPatterns || [];
  }

  const [errorMessage, setErrorMessage] = useState('');
  const [replacementPatterns, setReplacementPatterns] = useState(contentReplacementPatterns);
  const [showContentHints, setShowContentHints] = useState(false);
  const replacementPatternRef = useRef();
  const replacementPatternValueRef = useRef();

  async function onFormSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    setErrorMessage('');
    try {
      const payload = { ...values, replacementPatterns };
      const { seoContent: seoContentResponse } = await onSubmit(payload);
      onSubmitSuccess(seoContentResponse);
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
    if (!seoContent || !seoContent.translations || !seoContent.translations[locale]) {
      return '';
    }

    return seoContent.translations[locale][field] || '';
  }

  function getValueFromContent(field) {
    if (!seoContent) {
      return '';
    }

    return get(seoContent, field, '');
  }

  const localeOptions = supportedLocales.reduce((acc, cur) => {
    acc.push({ label: cur, value: cur });
    return acc;
  }, []);

  const pageTypeOptions = supportedPageTypes.reduce((acc, cur) => {
    acc.push({ label: cur, value: cur });
    return acc;
  }, []);

  const localeFields = {};
  supportedLocales.forEach((locale) => {
    localeFields[locale] = {
      title: getLocaleValueFromContent(locale, 'title'),
      pageTitle: getLocaleValueFromContent(locale, 'pageTitle'),
      description: getLocaleValueFromContent(locale, 'description'),
      keywords: getLocaleValueFromContent(locale, 'keywords'),
      pageContent: getLocaleValueFromContent(locale, 'pageContent'),
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
      pattern = `%${pattern.trim().replace('%', '')}%`;
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
          urlPattern: getValueFromContent('urlPattern'),
          pageType: getValueFromContent('pageType'),
          canonicalUrl: getValueFromContent('canonicalUrl'),
          domain: getValueFromContent('domain') || DomainService.defaultDomain,
          noIndex: getValueFromContent('noIndex') || false,
          follow: getValueFromContent('follow') || false,
          pageTag: getValueFromContent('pageTag'),
          locale: supportedLocales[0],
          parent: getValueFromContent('parent.id'),
          localeFields,
        }}
        enableReinitialize
        validationSchema={SeoContentFormValidationSchema}
        onSubmit={onFormSubmit}
      >
        {({ values, touched, errors, setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="row m-b-lg">
              <div className="col-lg-6">
                <Input
                  id="urlPattern"
                  name="urlPattern"
                  label="Url Pattern"
                  disabled={isEditMode}
                  value={values.urlPattern}
                  error={errors.urlPattern}
                  touched={touched.urlPattern}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>

              <div className="col-lg-6">
                <Input
                  id="canonicalUrl"
                  name="canonicalUrl"
                  label="Canonical Url"
                  value={values.canonicalUrl}
                  error={errors.canonicalUrl}
                  touched={touched.canonicalUrl}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
            </div>

            <div className="row m-b-lg">
              <div className="col-lg-6">
                <Select
                  id="domain"
                  label="Domain"
                  name="domain"
                  className="required"
                  value={values.domain}
                  error={errors.domain}
                  touched={touched.domain}
                  options={DomainService.formattedDomainOptions}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
              <div className="col-lg-6">
                <div style={{ marginTop: '24px' }}>
                  <FormikTickbox id="noIndex" name="noIndex" value={values.noIndex} onChange={setFieldValue}>
                    No Index
                  </FormikTickbox>
                  <FormikTickbox id="follow" name="follow" value={values.follow} onChange={setFieldValue}>
                    Follow (w/no index)
                  </FormikTickbox>
                </div>
              </div>
            </div>

            <div className="row m-b-lg">
              <div className="col-lg-3">
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
              <div className="col-lg-3">
                <Input
                  id="pageTag"
                  name="pageTag"
                  label="Page Tag (*unique)"
                  value={values.pageTag}
                  error={errors.pageTag}
                  touched={touched.pageTag}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
              <div className="col-lg-6">
                <Select
                  id="pageType"
                  label="Page Type"
                  name="pageType"
                  disabled={isEditMode}
                  value={values.pageType}
                  error={errors.pageType}
                  touched={touched.pageType}
                  options={pageTypeOptions}
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

            <div className="row m-b-lg">
              <div className="col-lg-6">
                <Select
                  id="parent"
                  label="Parent Pattern"
                  name="parent"
                  disabled={!availableParents.length}
                  value={values.parent}
                  error={errors.parent}
                  touched={touched.parent}
                  options={availableParents}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  onChangeAttribute="id"
                  formatOptionValue={(val) => val.id}
                  formatOptionLabel={(val) => val.urlPattern}
                  isSearchable
                />
              </div>

              <div className="col-lg-6">
                <p>
                  Setting a parent url will default the translation fields listed below to inherit off of their parent.
                  This should generally only be used on parents that contain pattern replacements to avoid duplication
                  of content. Parents should also be set to inherit only from the same type of seo content type to avoid
                  possible errors.
                </p>
              </div>
            </div>

            {supportedLocales.map((supportedLocale) => (
              <div key={supportedLocale}>
                {values.locale === supportedLocale && (
                  <>
                    <div className="row m-b-lg">
                      <div className="col-lg-6">
                        <Input
                          id={`localeFields[${supportedLocale}].title`}
                          name={`localeFields[${supportedLocale}].title`}
                          label="Title"
                          value={getLocaleFieldValue(values, supportedLocale, 'title')}
                          error={getLocaleFieldValue(errors, supportedLocale, 'title')}
                          touched={getLocaleFieldValue(touched, supportedLocale, 'title')}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                      </div>
                      <div className="col-lg-6">
                        <Input
                          id={`localeFields[${supportedLocale}].pageTitle`}
                          name={`localeFields[${supportedLocale}].pageTitle`}
                          label="Page Title"
                          value={getLocaleFieldValue(values, supportedLocale, 'pageTitle')}
                          error={getLocaleFieldValue(errors, supportedLocale, 'pageTitle')}
                          touched={getLocaleFieldValue(touched, supportedLocale, 'pageTitle')}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                      </div>
                    </div>
                    <div className="row m-b-lg">
                      <div className="col-lg-6">
                        <Input
                          id={`localeFields[${supportedLocale}].description`}
                          name={`localeFields[${supportedLocale}].description`}
                          label="Description"
                          value={getLocaleFieldValue(values, supportedLocale, 'description')}
                          error={getLocaleFieldValue(errors, supportedLocale, 'description')}
                          touched={getLocaleFieldValue(touched, supportedLocale, 'description')}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                      </div>
                      <div className="col-lg-3">
                        <Input
                          id={`localeFields[${supportedLocale}].keywords`}
                          name={`localeFields[${supportedLocale}].keywords`}
                          label="Keywords"
                          value={getLocaleFieldValue(values, supportedLocale, 'keywords')}
                          error={getLocaleFieldValue(errors, supportedLocale, 'keywords')}
                          touched={getLocaleFieldValue(touched, supportedLocale, 'keywords')}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                      </div>
                    </div>
                    <div className="row m-b-lg">
                      <div className="col-lg-12 m-b-lg">
                        <strong>Page Content</strong>
                        <TextArea
                          id={`localeFields[${supportedLocale}].pageContent`}
                          name={`localeFields[${supportedLocale}].pageContent`}
                          label="Page Content"
                          className="form-group"
                          value={getLocaleFieldValue(values, supportedLocale, 'pageContent')}
                          error={getLocaleFieldValue(errors, supportedLocale, 'pageContent')}
                          touched={getLocaleFieldValue(touched, supportedLocale, 'pageContent')}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                      </div>
                      <div className="col-lg-12">
                        <strong className="m-r-xs">Template Examples</strong>
                        <Button
                          label={showContentHints ? 'Hide' : 'Show'}
                          className="btn-link"
                          onClick={() => setShowContentHints(!showContentHints)}
                        />
                        {showContentHints && (
                          <pre>
                            <strong>Top Block</strong>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{seoContentTopBlock}</div>
                            <hr />
                            <strong>Block With Title/Content</strong>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{seoContentSecondaryBlock}</div>
                            <hr />
                            <strong>Block With Title/Content/List</strong>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{seoContentSecondaryBlockList}</div>
                          </pre>
                        )}
                      </div>
                    </div>
                  </>
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

SeoContentForm.propTypes = {
  seoContent: SeoContentShape,
  supportedLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  supportedPageTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableParents: PropTypes.arrayOf(SeoContentShape),
  onSubmit: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
};

SeoContentForm.defaultProps = {
  seoContent: undefined,
  availableParents: [],
};

export default SeoContentForm;
