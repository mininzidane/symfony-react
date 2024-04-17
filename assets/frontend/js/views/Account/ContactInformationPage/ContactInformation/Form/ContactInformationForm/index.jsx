import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import AddressFieldsFormik from 'frontend/js/views/Shared/AddressFieldsFormik';
import useStyles from './useStyles';
import validationSchema from './validationSchema';

function ContactInformationForm({ setForm }) {
  const classes = useStyles();
  const intl = useIntl();

  const {
    // Account Information
    firstName,
    lastName,
    company,
    invoiceCompany,
    phoneNumberRaw: phoneNumber,
    optionalNumber,
    homeNumber,
    // Physical Address
    address,
    city,
    stateId: state,
    zip,
    countryId: country,
    // Mailing Address
    mailingAddress,
    mailingApartment,
    mailingAsPhysical,
    mailingCity,
    mailingName,
    mailingPhone,
    mailingStateId: mailingState,
    mailingZip,
    mailingCountryId: mailingCountry,
  } = useCustomerHelper();

  const formik = useFormik({
    initialValues: {
      // Account Information
      firstName: firstName || '',
      lastName: lastName || '',
      company: company || '',
      invoiceCompany: Boolean(invoiceCompany),
      phoneNumber: phoneNumber || '',
      optionalNumber: optionalNumber || '',
      homeNumber: homeNumber || '',
      // Physical Address
      address: address || '',
      city: city || '',
      state: state || '',
      zip: zip || '',
      country: country || '',
      // Mailing Address
      mailingAddress: mailingAddress || '',
      mailingApartment: mailingApartment || '',
      mailingAsPhysical: Boolean(mailingAsPhysical),
      mailingCity: mailingCity || '',
      mailingName: mailingName || '',
      mailingPhone: mailingPhone || '',
      mailingState: mailingState || '',
      mailingZip: mailingZip || '',
      mailingCountry: mailingCountry || '',
    },
    onSubmit: () => {},
    validationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setForm(formik);
  }, [formik]);

  const { mailingAsPhysical: isMailingAsPhysical, invoiceCompany: isInvoiceCompany } = formik.values;

  const mailingAddressDisabled = isInvoiceCompany || isMailingAsPhysical;

  const translationSets = {
    firstName: intl.formatMessage({ id: 'shared.label.firstName' }),
    lastName: intl.formatMessage({ id: 'shared.label.lastName' }),
    company: intl.formatMessage({ id: 'shared.label.company' }),
    primaryPhoneNumber: intl.formatMessage({ id: 'shared.label.primaryPhoneNumber' }),
    homeNumber: intl.formatMessage({ id: 'shared.label.homeNumber' }),
    optionalNumber: intl.formatMessage({ id: 'shared.label.optionalNumber' }),
    name: intl.formatMessage({ id: 'shared.label.name' }),
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.form}>
        <div className={classes.column}>
          <div className={classes.title}>
            <FormattedMessage id="contactInformationPage.accountInformation" />
          </div>
          <div className={classes.inputContainer}>
            <InputPlane
              id="firstName"
              name="firstName"
              placeholder={translationSets.firstName}
              disabled={Boolean(firstName)}
              value={formik.values.firstName}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>
          <div className={classes.inputContainer}>
            <InputPlane
              id="lastName"
              name="lastName"
              placeholder={translationSets.lastName}
              disabled={Boolean(lastName)}
              value={formik.values.lastName}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>
          <div className={classes.inputContainer}>
            <InputPlane
              id="company"
              name="company"
              placeholder={translationSets.company}
              disabled={Boolean(company)}
              value={formik.values.company}
              error={formik.errors.company}
              touched={formik.touched.company}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isAutoFocus
            />
          </div>
          <div className={classes.tickbox}>
            <Tickbox
              id="invoiceCompany"
              name="invoiceCompany"
              value={formik.values.invoiceCompany}
              error={formik.errors.invoiceCompany}
              touched={formik.touched.invoiceCompany}
              onChange={formik.setFieldValue}
            >
              <FormattedMessage id="contactInformationPage.iConfirmAllMyInvoices" />
            </Tickbox>
          </div>

          <div className={classes.inputContainer}>
            <PhoneInputPlane
              id="phoneNumber"
              name="phoneNumber"
              label={translationSets.primaryPhoneNumber}
              value={formik.values.phoneNumber}
              error={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isLabelOnTop
            />
          </div>

          <div className={classes.inputContainer}>
            <PhoneInputPlane
              id="homeNumber"
              name="homeNumber"
              label={translationSets.homeNumber}
              value={formik.values.homeNumber}
              error={formik.errors.homeNumber}
              touched={formik.touched.homeNumber}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isLabelOnTop
            />
          </div>

          <div className={classes.inputContainer}>
            <PhoneInputPlane
              id="optionalNumber"
              name="optionalNumber"
              label={translationSets.optionalNumber}
              value={formik.values.optionalNumber}
              error={formik.errors.optionalNumber}
              touched={formik.touched.optionalNumber}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isLabelOnTop
            />
          </div>
        </div>

        <div className={classes.column}>
          <div className={classes.title}>
            <FormattedMessage id="contactInformationPage.physicalAddress" />
          </div>
          <AddressFieldsFormik formik={formik} hideApartment />
        </div>

        <div className={classes.column}>
          <div className={classes.title}>
            <FormattedMessage id="contactInformationPage.mailingAddress" />
          </div>

          <div className={classes.inputContainer}>
            <InputPlane
              id="mailingName"
              name="mailingName"
              placeholder={translationSets.name}
              value={formik.values.mailingName}
              error={formik.errors.mailingName}
              touched={formik.touched.mailingName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>

          <div className={classes.inputContainer}>
            <PhoneInputPlane
              id="mailingPhone"
              name="mailingPhone"
              value={formik.values.mailingPhone}
              error={formik.errors.mailingPhone}
              touched={formik.touched.mailingPhone}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>

          <AddressFieldsFormik
            formik={formik}
            config={{
              address: {
                name: 'mailingAddress',
                value: isMailingAsPhysical ? formik.values.address || '' : formik.values.mailingAddress,
                disabled: mailingAddressDisabled,
              },
              apartment: {
                name: 'mailingApartment',
                disabled: mailingAddressDisabled,
              },
              city: {
                name: 'mailingCity',
                value: isMailingAsPhysical ? formik.values.city : formik.values.mailingCity,
                disabled: mailingAddressDisabled,
              },
              state: {
                name: 'mailingState',
                value: isMailingAsPhysical ? formik.values.state : formik.values.mailingState,
                disabled: mailingAddressDisabled,
              },
              zip: {
                name: 'mailingZip',
                value: isMailingAsPhysical ? formik.values.zip : formik.values.mailingZip,
                disabled: mailingAddressDisabled,
              },
              country: {
                name: 'mailingCountry',
                value: isMailingAsPhysical ? formik.values.country : formik.values.mailingCountry,
                disabled: mailingAddressDisabled,
              },
            }}
          />
          <div className={classes.tickboxInline}>
            <Tickbox
              id="mailingAsPhysical"
              name="mailingAsPhysical"
              value={formik.values.mailingAsPhysical}
              error={formik.errors.mailingAsPhysical}
              touched={formik.touched.mailingAsPhysical}
              onChange={formik.setFieldValue}
            >
              <FormattedMessage id="contactInformationPage.useMyPhysicalAddress" />
            </Tickbox>
          </div>
        </div>
      </div>
    </form>
  );
}

ContactInformationForm.propTypes = {
  setForm: PropTypes.func.isRequired,
};

export default ContactInformationForm;
