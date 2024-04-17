import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import get from 'lodash/get';
import Input from '../../../components/Form/Input';
import SubmitButton from '../../../components/SubmitButton';
import FormikTickbox from '../../../components/Form/FormikTickbox';
import DynamicPageShape from '../../../lib/propshapes/DynamicPageShape';
import Select from '../../../components/Form/Select';
import TinyMCE from '../../../components/TinyMCE';
import DynamicPageService from '../../../api/DynamicPageService';
import DomainService from '../../../api/DomainService';
import DynamicPageFormValidationSchema from './DynamicPageFormValidationSchema';

function DynamicPageForm({ dynamicPage, supportedLocales, onSubmit, onSubmitSuccess, onSubmitError, contentCss }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [addedImages, setAddedImages] = useState([]);
  const isEditMode = dynamicPage && dynamicPage.id > 0;

  const localeOptions = supportedLocales.reduce((acc, cur) => {
    acc.push({ label: cur, value: cur });
    return acc;
  }, []);

  function getLocaleValueFromEntity(locale, field) {
    if (!dynamicPage || !dynamicPage.translations || !dynamicPage.translations[locale]) {
      return '';
    }

    return dynamicPage.translations[locale][field] || '';
  }

  function getLocaleSeoValueFromEntity(locale, field) {
    if (!dynamicPage || !dynamicPage.seo || !dynamicPage.seo.translations[locale]) {
      return '';
    }

    return dynamicPage.seo.translations[locale][field] || '';
  }

  const localeFields = {};
  const localeSeoFields = {};
  supportedLocales.forEach((locale) => {
    localeFields[locale] = {
      content: getLocaleValueFromEntity(locale, 'content'),
    };

    localeSeoFields[locale] = {
      title: getLocaleSeoValueFromEntity(locale, 'title'),
      description: getLocaleSeoValueFromEntity(locale, 'description'),
      keywords: getLocaleSeoValueFromEntity(locale, 'keywords'),
    };
  });

  function getLocaleFieldValue(obj, locale, field) {
    try {
      return obj.localeFields[locale][field];
    } catch (error) {
      /** Ignore */
    }

    return undefined;
  }

  function getLocaleSeoFieldValue(obj, locale, field) {
    try {
      return obj.localeSeoFields[locale][field];
    } catch (error) {
      /** Ignore */
    }

    return undefined;
  }

  function getValueFromEntity(field) {
    if (!dynamicPage) {
      return '';
    }

    return get(dynamicPage, field, '');
  }

  async function onFormSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    setErrorMessage('');

    try {
      const payload = { ...values, addedImages };
      const { dynamicPage: dynamicPageResponse } = await onSubmit(payload);
      onSubmitSuccess(dynamicPageResponse);
    } catch (serverError) {
      let messages = 'An error occurred while processing this request.';
      if (serverError) {
        const {
          response: {
            data: { errors },
          },
        } = serverError;

        messages = Object.values(errors.errors).join(' ');
      }

      onSubmitError(messages);
    }

    setSubmitting(false);
  }

  function handleImageUploadSuccess({ dynamicPageImageId }) {
    const newlyAddedImages = addedImages.slice();
    newlyAddedImages.push(dynamicPageImageId);

    setAddedImages(newlyAddedImages);
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
          url: getValueFromEntity('url'),
          domain: getValueFromEntity('domain') || DomainService.defaultDomain,
          locale: supportedLocales[0],
          active: getValueFromEntity('active') || true,
          localeFields,
          localeSeoFields,
          priority: getValueFromEntity('priority'),
        }}
        enableReinitialize
        validationSchema={DynamicPageFormValidationSchema}
        onSubmit={onFormSubmit}
      >
        {({ values, touched, errors, setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="row m-b-lg">
              <div className="col-lg-6">
                <Input
                  id="url"
                  name="url"
                  label="Url"
                  className="required"
                  disabled={isEditMode}
                  value={values.url}
                  error={errors.url}
                  touched={touched.url}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>

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
            </div>

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
                  id="priority"
                  name="priority"
                  label="Priority"
                  className="required"
                  value={values.priority}
                  error={errors.priority}
                  touched={touched.priority}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
            </div>

            <div className="row m-b-lg">
              <div className="col-lg-12">
                <div style={{ marginTop: '30px' }}>
                  <FormikTickbox id="active" name="active" value={values.active} onChange={setFieldValue}>
                    Active
                  </FormikTickbox>
                </div>
              </div>
            </div>

            <hr />

            {supportedLocales.map((supportedLocale) => (
              <div key={supportedLocale}>
                {values.locale === supportedLocale && (
                  <>
                    <div className="row">
                      <h3>Seo Section </h3>
                    </div>

                    <div className="row">
                      <div className="col-lg-4">
                        <Input
                          id={`localeSeoFields[${supportedLocale}].title`}
                          name={`localeSeoFields[${supportedLocale}].title`}
                          label="Title"
                          value={getLocaleSeoFieldValue(values, supportedLocale, 'title')}
                          error={getLocaleSeoFieldValue(errors, supportedLocale, 'title')}
                          touched={getLocaleSeoFieldValue(touched, supportedLocale, 'title')}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                      </div>

                      <div className="col-lg-4">
                        <Input
                          id={`localeSeoFields[${supportedLocale}].description`}
                          name={`localeSeoFields[${supportedLocale}].description`}
                          label="Description"
                          value={getLocaleSeoFieldValue(values, supportedLocale, 'description')}
                          error={getLocaleSeoFieldValue(errors, supportedLocale, 'description')}
                          touched={getLocaleSeoFieldValue(touched, supportedLocale, 'description')}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                      </div>

                      <div className="col-lg-4">
                        <Input
                          id={`localeSeoFields[${supportedLocale}].keywords`}
                          name={`localeSeoFields[${supportedLocale}].keywords`}
                          label="Keywords"
                          value={getLocaleSeoFieldValue(values, supportedLocale, 'keywords')}
                          error={getLocaleSeoFieldValue(errors, supportedLocale, 'keywords')}
                          touched={getLocaleSeoFieldValue(touched, supportedLocale, 'keywords')}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                      </div>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-lg-12">
                        <TinyMCE
                          value={getLocaleFieldValue(values, supportedLocale, 'content')}
                          onChange={(val) => {
                            setFieldValue(`localeFields[${supportedLocale}].content`, val);
                          }}
                          config={{
                            toolbar:
                              'undo redo | image link | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code registrationShortcode reviewSliderShortcode',
                          }}
                          externalPlugins={['registrationShortcode', 'reviewSliderShortcode']}
                          imageUploadUrl={DynamicPageService.imageUploadUrl}
                          onImageUploadSuccess={handleImageUploadSuccess}
                          contentCss={contentCss}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}

            <div className="row m-t-sm m-b-lg">
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

DynamicPageForm.propTypes = {
  dynamicPage: DynamicPageShape,
  contentCss: PropTypes.string,
  supportedLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
};

DynamicPageForm.defaultProps = {
  dynamicPage: undefined,
  contentCss: '',
};

export default DynamicPageForm;
