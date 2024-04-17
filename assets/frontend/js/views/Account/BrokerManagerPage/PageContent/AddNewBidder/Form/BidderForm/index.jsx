import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import { useFormik } from 'formik';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import useStates from 'frontend/js/hooks/useStates';
import useCountries from 'frontend/js/hooks/useCountries';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import NumberService from 'frontend/js/lib/utils/NumberService';
import CountryService from 'frontend/js/api/CountryService';
import useStyles from './useStyles';
import validationSchema from './validationSchema';

function BidderForm({ setForm, customer }) {
  const classes = useStyles();
  const intl = useIntl();
  const {
    brokerAllowToChooseSchedule,
    customTransactionFeeMin,
    brokerAllowToSetFixedBP,
    brokerAllowToChangeTransactionFee,
    brokerAllowToAddTowingMarkup,
  } = useCustomerHelper(customer);

  const formik = useFormik({
    initialValues: {
      // Account Information
      firstName: '',
      lastName: '',
      company: '',
      invoiceCompany: false,
      phoneNumber: '',
      optionalNumber: '',
      homeNumber: '',
      email: '',
      ...(brokerAllowToChooseSchedule && { schedule: 'scheduleA' }),
      // Physical Address
      address: '',
      city: '',
      state: '',
      zip: '',
      country: CountryService.COUNTRIES.usa.code,
      // Mailing Address
      mailingAddress: '',
      mailingApartment: '',
      mailingAsPhysical: true,
      mailingCity: '',
      mailingName: '',
      mailingPhone: '',
      mailingState: '',
      mailingZip: '',
      mailingCountry: CountryService.COUNTRIES.usa.code,
      ...(!brokerAllowToSetFixedBP && { bidderWoDeposit: false }),
      ...(brokerAllowToChangeTransactionFee && {
        customTransactionFeeMinByBroker: customTransactionFeeMin
          ? NumberService.formatCurrency(customTransactionFeeMin)
          : '',
      }),
      ...(brokerAllowToSetFixedBP && {
        blCount: (customer.blCount || 0).toString(),
        blAmount: customer.blAmount ? NumberService.formatCurrency(customer.blAmount) : '',
        blAmountFixed: '0',
      }),
      ...(brokerAllowToAddTowingMarkup && { towingMarkup: '' }),
    },
    onSubmit: () => {},
    validationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setForm(formik);
  }, [formik]);

  const countries = useCountries();
  const [states, isLoadingState] = useStates(formik.values.country);
  const [mailingStates, isLoadingMailingState] = useStates(formik.values.mailingCountry);

  function getCountryIdByCode(code) {
    const foundCountry = countries.find((v) => code === v.iso_2);
    return foundCountry && foundCountry.id;
  }

  function getStateIdByCode(code, _states) {
    const foundState = _states.find((v) => code === v.code);
    return foundState && foundState.id;
  }

  useEffect(() => {
    if (!isLoadingState && formik.values.stateCode) {
      const stateId = getStateIdByCode(formik.values.stateCode, states);
      formik.setFieldValue('state', stateId || '');
    }
  }, [isLoadingState, states.length && states[0].id, formik.values.stateCode]);

  useEffect(() => {
    if (!isLoadingMailingState && formik.values.mailingStateCode) {
      const stateId = getStateIdByCode(formik.values.mailingStateCode, mailingStates);
      formik.setFieldValue('mailingState', stateId || '');
    }
  }, [isLoadingMailingState, mailingStates.length && mailingStates[0].id, formik.values.mailingStateCode]);

  const { mailingAsPhysical: isMailingAsPhysical, invoiceCompany: isInvoiceCompany } = formik.values;

  const mailingAddressDisabled = isInvoiceCompany || isMailingAsPhysical;

  const translationSets = {
    firstName: intl.formatMessage({ id: 'shared.label.firstName' }),
    lastName: intl.formatMessage({ id: 'shared.label.lastName' }),
    company: intl.formatMessage({ id: 'shared.label.company' }),
    emailAddress: intl.formatMessage({ id: 'shared.label.emailAddress' }), // TODO Add translation for AR KA
    primaryPhoneNumber: intl.formatMessage({ id: 'shared.label.primaryPhoneNumber' }),
    homeNumber: intl.formatMessage({ id: 'shared.label.homeNumber' }),
    optionalNumber: intl.formatMessage({ id: 'shared.label.optionalNumber' }),
    address: intl.formatMessage({ id: 'shared.label.address' }),
    apartment: intl.formatMessage({ id: 'shared.label.apartment' }),
    city: intl.formatMessage({ id: 'shared.label.city' }),
    state: intl.formatMessage({ id: 'shared.label.state' }),
    zipCode: intl.formatMessage({ id: 'shared.label.zipCode' }),
    country: intl.formatMessage({ id: 'shared.label.country' }),
    name: intl.formatMessage({ id: 'shared.label.name' }),
    changeTransactionFee: intl.formatMessage({ id: 'shared.label.changeTransactionFee' }),
    towingMarkup: intl.formatMessage({ id: 'shared.label.towingMarkup' }),
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
              value={formik.values.company}
              error={formik.errors.company}
              touched={formik.touched.company}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
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

          {brokerAllowToChooseSchedule && (
            <div className={classes.radio}>
              <RadioButton
                label={intl.formatMessage({ id: 'shared.label.volumeBuyer' })}
                name="schedule"
                id="scheduleA"
                value="scheduleA"
                isChecked={formik.values.schedule === 'scheduleA'}
                onChange={formik.setFieldValue}
              />

              <RadioButton
                label={intl.formatMessage({ id: 'shared.label.oneTimeBuyer' })}
                name="schedule"
                id="scheduleA2C"
                value="scheduleA2C"
                isChecked={formik.values.schedule === 'scheduleA2C'}
                onChange={formik.setFieldValue}
              />
            </div>
          )}

          {brokerAllowToAddTowingMarkup && (
            <div className={classes.inputContainer}>
              <InputPlane
                id="towingMarkup"
                name="towingMarkup"
                placeholder="$"
                label={translationSets.towingMarkup}
                value={formik.values.towingMarkup}
                error={formik.errors.towingMarkup}
                touched={formik.touched.towingMarkup}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                mask="currency"
                isLabelOnTop
              />
            </div>
          )}

          {brokerAllowToChangeTransactionFee && (
            <div className={classes.inputContainer}>
              <InputPlane
                id="customTransactionFeeMinByBroker"
                name="customTransactionFeeMinByBroker"
                placeholder="$"
                label={translationSets.changeTransactionFee}
                value={formik.values.customTransactionFeeMinByBroker}
                error={formik.errors.customTransactionFeeMinByBroker}
                touched={formik.touched.customTransactionFeeMinByBroker}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                mask="currency"
                isLabelOnTop
              />
            </div>
          )}

          <div className={classnames(classes.inputContainer, 'is-email')}>
            <InputPlane
              id="email"
              name="email"
              placeholder={translationSets.emailAddress}
              value={formik.values.email}
              error={formik.errors.email}
              touched={formik.touched.email}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>

          {brokerAllowToSetFixedBP ? (
            <>
              <RadioButton
                label={intl.formatMessage({ id: 'brokerManagerPage.label.setCustomBuyerPower' })}
                name="blAmountFixed"
                id="blAmountFixed1"
                value="1"
                isChecked={parseInt(formik.values.blAmountFixed, 10)}
                onChange={formik.setFieldValue}
              />
              <RadioButton
                label={intl.formatMessage({ id: 'brokerManagerPage.label.withoutBuyerPower' })}
                name="blAmountFixed"
                id="blAmountFixed0"
                value="0"
                onChange={formik.setFieldValue}
                isChecked={!parseInt(formik.values.blAmountFixed, 10)}
              />
              {formik.values.blAmountFixed === '1' && (
                <div className="mt-5">
                  <InputPlane
                    className="mb-15"
                    id="blCount"
                    name="blCount"
                    label={intl.formatMessage({ id: 'shared.label.blCount' })}
                    value={formik.values.blCount}
                    touched={formik.touched.blCount}
                    error={formik.errors.blCount}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    onError={formik.setFieldError}
                    isLabelOnTop
                  />

                  <InputPlane
                    id="blAmount"
                    name="blAmount"
                    label={intl.formatMessage({ id: 'shared.label.blAmount' })}
                    value={formik.values.blAmount}
                    touched={formik.touched.blAmount}
                    error={formik.errors.blAmount}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    onError={formik.setFieldError}
                    mask="currency"
                    isLabelOnTop
                  />
                </div>
              )}
            </>
          ) : (
            <div className={classes.tickbox}>
              <Tickbox
                id="bidderWoDeposit"
                name="bidderWoDeposit"
                value={formik.values.bidderWoDeposit}
                error={formik.errors.bidderWoDeposit}
                touched={formik.touched.bidderWoDeposit}
                onChange={formik.setFieldValue}
              >
                <FormattedMessage id="brokerManagerPage.createBidderWoDeposit" />
              </Tickbox>
            </div>
          )}

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
          <div className={classes.inputContainer}>
            <PlacesInputPlane
              id="address"
              name="address"
              label=""
              placeholder={translationSets.address}
              value={formik.values.address}
              error={formik.errors.address}
              touched={formik.touched.address}
              onBlur={formik.setFieldTouched}
              disableBlurSelect
              restrictAddress
              country=""
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
                if (value && typeof value === 'object') {
                  const {
                    address: newAddress = '',
                    city: newCity = '',
                    state_code = '',
                    zip: newZip = '',
                    country_code = '',
                  } = value;
                  formik.setFieldValue('address', newAddress);
                  formik.setFieldValue('city', newCity);
                  formik.setFieldValue('stateCode', state_code);
                  formik.setFieldValue('zip', newZip);
                  const countryId = getCountryIdByCode(country_code);
                  formik.setFieldValue('country', countryId || '');
                }
              }}
              applyMask={(val) => {
                if (val && typeof val === 'object') {
                  return val.address || '';
                }
                return val;
              }}
              onError={formik.setFieldError}
              isShowGoogleMapIcon={false}
            />
          </div>
          <div className={classes.inputContainer}>
            <InputPlane
              id="city"
              name="city"
              placeholder={translationSets.city}
              value={formik.values.city}
              touched={formik.touched.city}
              error={formik.errors.city}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              onError={formik.setFieldError}
            />
          </div>
          <div className={classes.fieldGroup}>
            <div className={classes.inputContainer}>
              <SelectPlane
                id="state"
                name="state"
                placeholder={translationSets.state}
                value={formik.values.state}
                options={states}
                error={formik.errors.state}
                touched={formik.touched.state}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onChangeAttribute="id"
                formatOptionLabel={(option) => option.name}
                isSearchable
                convertMobileSelectValue={(value) => parseInt(value, 10)}
              />
            </div>
            <div className={classes.inputContainer}>
              <InputPlane
                id="zip"
                name="zip"
                placeholder={translationSets.zipCode}
                value={formik.values.zip}
                touched={formik.touched.zip}
                error={formik.errors.zip}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
              />
            </div>
          </div>
          <div className={classes.inputContainer}>
            <SelectPlane
              id="country"
              name="country"
              placeholder={translationSets.country}
              value={formik.values.country}
              options={countries}
              error={formik.errors.country}
              touched={formik.touched.country}
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
                formik.setFieldValue('state', '');
              }}
              onBlur={formik.setFieldTouched}
              onChangeAttribute="id"
              formatOptionLabel={(option) => option.name}
              convertMobileSelectValue={(value) => parseInt(value, 10)}
              isSearchable
            />
          </div>
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

          <div className={classes.inputContainer}>
            <PlacesInputPlane
              id="mailingAddress"
              name="mailingAddress"
              label=""
              placeholder={translationSets.address}
              value={isMailingAsPhysical ? formik.values.address || '' : formik.values.mailingAddress}
              error={formik.errors.mailingAddress}
              touched={formik.touched.mailingAddress}
              onBlur={formik.setFieldTouched}
              disableBlurSelect
              restrictAddress
              country=""
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
                if (value && typeof value === 'object') {
                  const {
                    address: newAddress = '',
                    city: newCity = '',
                    state_code = '',
                    zip: newZip = '',
                    country_code = '',
                  } = value;
                  formik.setFieldValue('mailingAddress', newAddress);
                  formik.setFieldValue('mailingCity', newCity);
                  formik.setFieldValue('mailingStateCode', state_code);
                  formik.setFieldValue('mailingZip', newZip);
                  const countryId = getCountryIdByCode(country_code);
                  formik.setFieldValue('mailingCountry', countryId || '');
                }
              }}
              applyMask={(val) => {
                if (val && typeof val === 'object') {
                  return val.address || '';
                }
                return val;
              }}
              onError={formik.setFieldError}
              disabled={mailingAddressDisabled}
              isShowGoogleMapIcon={false}
            />
          </div>
          <div className={classes.inputContainer}>
            <InputPlane
              id="mailingApartment"
              name="mailingApartment"
              placeholder={translationSets.apartment}
              value={formik.values.mailingApartment}
              touched={formik.touched.mailingApartment}
              error={formik.errors.mailingApartment}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              onError={formik.setFieldError}
              disabled={mailingAddressDisabled}
            />
          </div>
          <div className={classes.inputContainer}>
            <InputPlane
              id="mailingCity"
              name="mailingCity"
              placeholder={translationSets.city}
              value={isMailingAsPhysical ? formik.values.city : formik.values.mailingCity}
              touched={formik.touched.mailingCity}
              error={formik.errors.mailingCity}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              onError={formik.setFieldError}
              disabled={mailingAddressDisabled}
            />
          </div>
          <div className={classes.fieldGroup}>
            <div className={classes.inputContainer}>
              <SelectPlane
                id="mailingState"
                name="mailingState"
                placeholder={translationSets.state}
                value={isMailingAsPhysical ? formik.values.state : formik.values.mailingState}
                options={isMailingAsPhysical ? states : mailingStates}
                error={formik.errors.mailingState}
                touched={formik.touched.mailingState}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onChangeAttribute="id"
                formatOptionLabel={(option) => option.name}
                isSearchable
                disabled={mailingAddressDisabled}
                convertMobileSelectValue={(value) => parseInt(value, 10)}
              />
            </div>
            <div className={classes.inputContainer}>
              <InputPlane
                id="mailingZip"
                name="mailingZip"
                placeholder={translationSets.zipCode}
                value={isMailingAsPhysical ? formik.values.zip : formik.values.mailingZip}
                touched={formik.touched.mailingZip}
                error={formik.errors.mailingZip}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                disabled={mailingAddressDisabled}
              />
            </div>
          </div>
          <div className={classes.inputContainer}>
            <SelectPlane
              id="mailingCountry"
              name="mailingCountry"
              placeholder={translationSets.country}
              value={isMailingAsPhysical ? formik.values.country : formik.values.mailingCountry}
              options={countries}
              error={formik.errors.mailingCountry}
              touched={formik.touched.mailingCountry}
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
                formik.setFieldValue('mailingState', '');
              }}
              onBlur={formik.setFieldTouched}
              disabled={mailingAddressDisabled}
              onChangeAttribute="id"
              formatOptionLabel={(option) => option.name}
              convertMobileSelectValue={(value) => parseInt(value, 10)}
              isSearchable
            />
          </div>

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

BidderForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
};

export default BidderForm;
