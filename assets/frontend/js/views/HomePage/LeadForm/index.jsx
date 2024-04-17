import React, { useState } from 'react';
import { Formik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import LeadService from 'frontend/js/api/LeadService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CountryService from 'frontend/js/api/CountryService';
import ImageMultiRes from 'frontend/js/components/Image/ImageMultiRes';
import Container from 'frontend/js/components/Container';
import TextInputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Button from 'frontend/js/components/Button';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import CarsPng from './img/cars.png';
import Cars2xPng from './img/cars@2x.png';
import LeadFromSchema from './LeadFromSchema';
import useStyles from './useStyles';

function LeadForm() {
  const userCountryIso2 = CountryService.getUserCountryIso2();
  const classes = useStyles();
  const intl = useIntl();
  const [isSent, setIsSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const { fullName, phoneNumberRaw } = useCustomerHelper();
  const { isAboveSm } = useBreakpoint();
  const leadService = new LeadService();

  const translationSets = {
    cta: intl.formatMessage({ id: 'shared.cta.request' }),
    yourName: intl.formatMessage({ id: 'shared.label.yourName' }),
  };

  function onSubmit(values, { setSubmitting }) {
    const payload = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      country: userCountryIso2,
      source: LeadService.SOURCE_SHIPPING_CALCULATOR_HOMEPAGE,
    };

    leadService
      .createLead(payload)
      .then((response) => {
        if (response && response.lead && response.lead.createdAt) {
          setSenderName(values.name);
          setIsSent(true);
        }
      })
      .catch(() => null)
      .finally(() => setSubmitting(false));
  }

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <div>
            <SectionTitle text={<FormattedMessage id="homePage.intl.leadForm.title" />} className={classes.title} />
            <p className={classes.subtitle}>
              <FormattedMessage id="homePage.intl.leadForm.subtitle" />
            </p>

            {isSent ? (
              <div className={classes.successMessage}>
                <FormattedMessage id="lotPage.contact.contactReceived" values={{ senderFirstName: senderName }} />
              </div>
            ) : (
              <Formik
                initialValues={{
                  name: fullName,
                  phoneNumber: phoneNumberRaw,
                }}
                onSubmit={onSubmit}
                validationSchema={LeadFromSchema}
                enableReinitialize
              >
                {({ values, errors, touched, setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextInputPlane
                      id="name"
                      name="name"
                      placeholder={translationSets.yourName}
                      value={values.name}
                      error={errors.name}
                      touched={touched.name}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      className={classes.formControl}
                    />

                    <PhoneInputPlane
                      id="phoneNumber"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      error={errors.phoneNumber}
                      touched={touched.phoneNumber}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      className={classes.formControl}
                    />

                    <Button
                      type="submit"
                      label={translationSets.cta}
                      isLoading={isSubmitting}
                      className={classes.formControl}
                    />
                  </form>
                )}
              </Formik>
            )}
          </div>

          {isAboveSm && (
            <div className={classes.imageContainer}>
              <ImageMultiRes className={classes.image} x1={CarsPng} x2={Cars2xPng} alt="Banner" ratio={52} lazy />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default LeadForm;
