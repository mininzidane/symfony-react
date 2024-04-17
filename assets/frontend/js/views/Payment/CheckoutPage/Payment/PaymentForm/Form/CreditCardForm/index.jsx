/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useFormik } from 'formik';
import RouterService from 'frontend/js/api/RouterService';
import useIntl from 'frontend/js/hooks/useIntl';
import useStates from 'frontend/js/hooks/useStates';
import useCountries from 'frontend/js/hooks/useCountries';
import useCreditCardsCustomer from 'frontend/js/hooks/useCreditCardsCustomer';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import CvvTooltip from 'frontend/js/views/Shared/Tooltips/CvvTooltip';
import NumberService from 'frontend/js/lib/utils/NumberService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import SaveCardTooltip from './Tooltips/SaveCardTooltip';
import PhoneTooltip from './Tooltips/PhoneTooltip';
import useStyles from './useStyles';
import validationSchema from './validationSchema';

function CreditCardForm({ setForm, className }) {
  const classes = useStyles();
  const intl = useIntl();

  const {
    address: customerAddress,
    countryId: customerCountryId,
    stateId: customerStateId,
    city: customerCity,
    zip: customerZip,
    phoneNumber: customerPhoneNumber,
  } = useCustomerHelper();
  const customerBillingInfoIsAvailable = Boolean(customerAddress);
  const isPhoneSet = Boolean(customerPhoneNumber);

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cvv: '',
      expDate: '',
      selectedCard: 'new',
      selectedCardBin: '',
      saveCard: true,
      isBillingAsProfile: customerBillingInfoIsAvailable,
      countryId: customerCountryId || '',
      city: customerCity || '',
      zip: customerZip || '',
      state: customerStateId || '',
      address: customerAddress || '',
      phoneNumber: customerPhoneNumber || '',
      isPhoneSet,
    },
    onSubmit: () => {},
    validationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    setForm(formik);
  }, [formik]);

  const countries = useCountries();
  const [states, isLoadingState] = useStates(formik.values.countryId);
  const [creditCards, isLoadingCreditCards] = useCreditCardsCustomer(true);

  function getCountryIdByCode(code) {
    const country = countries.find((v) => code === v.iso_2);
    return country && country.id;
  }

  function getStateIdByCode(code) {
    const state = states.find((v) => code === v.code);
    return state && state.id;
  }

  function getCCBinById(id) {
    const cc = creditCards.find((v) => id === v.id);
    return cc ? cc.bin : '';
  }

  useEffect(() => {
    if (!isLoadingState && formik.values.stateCode) {
      const stateId = getStateIdByCode(formik.values.stateCode);
      formik.setFieldValue('state', stateId || undefined);
    }
  }, [isLoadingState]);

  useEffect(() => {
    if (creditCards.length > 0) {
      const preferredCard = creditCards.find((card) => card.preferred);

      if (preferredCard && !RouterService.getQueryParam('newCard')) {
        formik.setFieldValue('selectedCard', preferredCard.id);
        formik.setFieldValue('selectedCardBin', preferredCard.bin);
      }
    }
  }, [creditCards]);

  if (isLoadingCreditCards) {
    return (
      <div className={classes.loader}>
        <SpinnerWheel size={34} thickness={3} isCentered color="blue" />
      </div>
    );
  }

  const isNewCard = formik.values.selectedCard === 'new';
  const { isBillingAsProfile } = formik.values;
  const useAddressFromProfile = isBillingAsProfile && Boolean(customerAddress);
  const useCityFromProfile = isBillingAsProfile && Boolean(customerCity);
  const useStateFromProfile = isBillingAsProfile && Boolean(customerStateId);
  const useZipFromProfile = isBillingAsProfile && Boolean(customerZip);
  const useCountryFromProfile = isBillingAsProfile && Boolean(customerCountryId);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classnames(classes.form, className)}>
        <div className={classes.column}>
          <div className={classes.title}>
            <FormattedMessage id="billingInformationPage.cardDetails" />
          </div>

          {creditCards.length > 0 && (
            <SelectPlane
              id="selectedCard"
              name="selectedCard"
              label=""
              className={classes.select}
              value={formik.values.selectedCard}
              convertMobileSelectValue={NumberService.castToNumberSafe}
              options={[
                ...creditCards.map((card) => ({
                  label: `${card.type} ***** ${card.last4}`,
                  value: card.id,
                })),
                { label: intl.formatMessage({ id: 'shared.label.payWithNewCard' }), value: 'new' },
              ]}
              error={formik.errors.dateFilter}
              touched={formik.touched.dateFilter}
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
                formik.setFieldValue('selectedCardBin', getCCBinById(value));
              }}
              onBlur={formik.setFieldTouched}
            />
          )}

          {isNewCard && (
            <div className={classes.inputContainer}>
              <InputPlane
                id="cardNumber"
                name="cardNumber"
                mask="card"
                placeholder={intl.formatMessage({ id: 'shared.label.cardNumber' })}
                value={formik.values.cardNumber}
                error={formik.errors.cardNumber}
                touched={formik.touched.cardNumber}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                isAutoFocus
              />
            </div>
          )}

          {isNewCard && (
            <>
              <div className={classes.fieldGroup}>
                <div className={classes.inputContainer}>
                  <InputPlane
                    id="expDate"
                    name="expDate"
                    mask="expDate"
                    placeholder="Expiration Date"
                    value={formik.values.expDate}
                    error={formik.errors.expDate}
                    touched={formik.touched.expDate}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <InputPlane
                    label=""
                    id="cvv"
                    name="cvv"
                    mask="cvv"
                    value={formik.values.cvv}
                    error={formik.errors.cvv}
                    touched={formik.touched.cvv}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                  />

                  <CvvTooltip className={classes.inputTooltip} />
                </div>
              </div>
              <div className={classes.tickbox}>
                <Tickbox
                  id="saveCard"
                  name="saveCard"
                  value={formik.values.saveCard}
                  error={formik.errors.saveCard}
                  touched={formik.touched.saveCard}
                  onChange={formik.setFieldValue}
                >
                  <FormattedMessage id="billingInformationPage.saveThisCard" />
                  <SaveCardTooltip className={classes.saveCardTooltip} />
                </Tickbox>
              </div>
            </>
          )}
        </div>

        {isNewCard && (
          <div className={classes.column}>
            <div className={classes.title}>
              <FormattedMessage id="billingInformationPage.billingAddress" />
            </div>
            <div className={classes.inputContainer}>
              <PlacesInputPlane
                id="address"
                name="address"
                label=""
                placeholder={intl.formatMessage({ id: 'shared.label.address' })}
                value={useAddressFromProfile ? customerAddress || '' : formik.values.address}
                error={formik.errors.address}
                touched={formik.touched.address}
                onBlur={formik.setFieldTouched}
                disableBlurSelect
                restrictAddress
                rawLocation
                country=""
                onChange={(name, value) => {
                  formik.setFieldValue(name, value);
                  if (value && typeof value === 'object') {
                    const { address = '', city = '', state_code = '', zip = '', country_code = '' } = value;
                    formik.setFieldValue('address', address);
                    formik.setFieldValue('city', city);
                    formik.setFieldValue('stateCode', state_code);
                    formik.setFieldValue('zip', zip);
                    const countryId = getCountryIdByCode(country_code);
                    formik.setFieldValue('countryId', countryId || undefined);
                    const stateId = getStateIdByCode(state_code);
                    formik.setFieldValue('state', stateId || undefined);
                  }
                }}
                applyMask={(val) => {
                  if (val && typeof val === 'object') {
                    return val.address || '';
                  }
                  return val;
                }}
                onError={formik.setFieldError}
                disabled={useAddressFromProfile}
                isShowGoogleMapIcon={false}
              />
            </div>
            <div className={classes.inputContainer}>
              <InputPlane
                id="city"
                name="city"
                placeholder={intl.formatMessage({ id: 'shared.label.city' })}
                value={useCityFromProfile ? customerCity || '' : formik.values.city}
                touched={formik.touched.city}
                error={formik.errors.city}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                disabled={useCityFromProfile}
              />
            </div>
            <div className={classes.fieldGroup}>
              <div className={classes.inputContainer}>
                <SelectPlane
                  id="state"
                  name="state"
                  placeholder={intl.formatMessage({ id: 'shared.label.state' })}
                  value={useStateFromProfile ? customerStateId || undefined : formik.values.state}
                  options={states}
                  error={formik.errors.state}
                  touched={formik.touched.state}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  onChangeAttribute="id"
                  formatOptionLabel={(option) => option.name}
                  isSearchable
                  disabled={useStateFromProfile}
                  convertMobileSelectValue={(value) => parseInt(value, 10)}
                  isNativeLabelDisabled={false}
                />
              </div>
              <div className={classes.inputContainer}>
                <InputPlane
                  id="zip"
                  name="zip"
                  placeholder={intl.formatMessage({ id: 'shared.label.zipCode' })}
                  value={useZipFromProfile ? customerZip || '' : formik.values.zip}
                  touched={formik.touched.zip}
                  error={formik.errors.zip}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  onError={formik.setFieldError}
                  disabled={useZipFromProfile}
                />
              </div>
            </div>
            <div className={classes.inputContainer}>
              <SelectPlane
                id="countryId"
                name="countryId"
                placeholder={intl.formatMessage({ id: 'shared.label.country' })}
                value={useCountryFromProfile ? customerCountryId || undefined : formik.values.countryId}
                options={countries}
                error={formik.errors.countryId}
                touched={formik.touched.countryId}
                onChange={(name, value) => {
                  formik.setFieldValue(name, value);
                  formik.setFieldValue('state', undefined);
                }}
                onBlur={formik.setFieldTouched}
                disabled={useCountryFromProfile}
                onChangeAttribute="id"
                formatOptionLabel={(option) => option.name}
                convertMobileSelectValue={(value) => parseInt(value, 10)}
                isNativeLabelDisabled={false}
                isSearchable
              />
            </div>
            {customerBillingInfoIsAvailable && (
              <div className={classes.tickboxInline}>
                <Tickbox
                  id="isBillingAsProfile"
                  name="isBillingAsProfile"
                  value={formik.values.isBillingAsProfile}
                  error={formik.errors.isBillingAsProfile}
                  touched={formik.touched.isBillingAsProfile}
                  onChange={formik.setFieldValue}
                >
                  <FormattedMessage id="billingInformationPage.useBillingAddressFromMyProfile" />
                </Tickbox>
              </div>
            )}
            {!isPhoneSet && (
              <>
                <div>{intl.formatMessage({ id: 'shared.label.phoneNumber' })}</div>
                <div className={classes.inputContainer}>
                  <PhoneInputPlane
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    error={formik.errors.phoneNumber}
                    touched={formik.touched.phoneNumber}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                  />

                  <PhoneTooltip className={classes.inputTooltip} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

CreditCardForm.propTypes = {
  setForm: PropTypes.func.isRequired,
};

export default CreditCardForm;
