import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import useStates from 'frontend/js/hooks/useStates';
import useCountries from 'frontend/js/hooks/useCountries';
import StringService from 'frontend/js/lib/utils/StringService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import CvvTooltip from 'frontend/js/views/Shared/Tooltips/CvvTooltip';
import Card from 'frontend/js/components/Card';
import useBillingInformationContext from '../../_Context/useBillingInformationContext';
import useStyles from './useStyles';
import validationSchema from './validationSchema';

function CreditCardForm() {
  const classes = useStyles();
  const intl = useIntl();

  const {
    address: customerAddress,
    countryId: customerCountryId,
    stateId: customerStateId,
    city: customerCity,
    zip: customerZip,
  } = useCustomerHelper();
  const customerBillingInfoIsAvailable = Boolean(customerAddress);

  const { form } = useBillingInformationContext();
  const { cardToken, creditCard = {}, isLoading } = form;

  function getExpDate() {
    const { exp_month, exp_year } = creditCard;
    return exp_month && exp_year && `${StringService.formatMonth(exp_month)} / ${StringService.formatYear(exp_year)}`;
  }

  const formik = useFormik({
    initialValues: {
      cardNumber: cardToken ? `**** **** **** ${creditCard.last4}` : '',
      cvv: cardToken ? '***' : '',
      expDate: cardToken ? getExpDate() : '',
      isBillingAsProfile: cardToken ? Boolean(creditCard.billingAsProfile) : customerBillingInfoIsAvailable,
      countryId: cardToken ? creditCard.country && creditCard.country.id : customerCountryId || '',
      city: cardToken ? creditCard.city : customerCity || '',
      zip: cardToken ? creditCard.zip : customerZip || '',
      state: cardToken ? creditCard.state && creditCard.state.id : customerStateId || '',
      address: cardToken ? creditCard.address || '' : customerAddress || '',
    },
    onSubmit: () => {},
    validationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    form.set(formik);
  }, [formik]);

  const { isBillingAsProfile } = formik.values;

  const countries = useCountries();
  const [states, isLoadingState] = useStates(isBillingAsProfile ? customerCountryId : formik.values.countryId);

  function getCountryIdByCode(code) {
    const country = countries.find((v) => code === v.iso_2);
    return country && country.id;
  }

  function getStateIdByCode(code) {
    const state = states.find((v) => code === v.code);
    return state && state.id;
  }

  useEffect(() => {
    if (!isLoadingState && formik.values.stateCode) {
      const stateId = getStateIdByCode(formik.values.stateCode);
      formik.setFieldValue('state', stateId || undefined);
    }
  }, [states, isLoadingState]);

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <SpinnerWheel size={34} thickness={3} isCentered color="blue" />
      </div>
    );
  }

  const useAddressFromProfile = isBillingAsProfile && Boolean(customerAddress);
  const useCityFromProfile = isBillingAsProfile && Boolean(customerCity);
  const useStateFromProfile = isBillingAsProfile && Boolean(customerStateId);
  const useZipFromProfile = isBillingAsProfile && Boolean(customerZip);
  const useCountryFromProfile = isBillingAsProfile && Boolean(customerCountryId);

  return (
    <Card elevation={2} className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.form}>
          <div className={classes.column}>
            <div className={classes.title}>{intl.formatMessage({ id: 'billingInformationPage.cardDetails' })}</div>
            <div className={classes.inputContainer}>
              <InputPlane
                id="cardNumber"
                name="cardNumber"
                mask={cardToken ? '' : 'card'}
                placeholder="Card Number"
                value={formik.values.cardNumber}
                error={formik.errors.cardNumber}
                touched={formik.touched.cardNumber}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                disabled={Boolean(cardToken)}
              />
            </div>

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
                  mask={cardToken ? '' : 'cvv'}
                  value={formik.values.cvv}
                  error={formik.errors.cvv}
                  touched={formik.touched.cvv}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  disabled={Boolean(cardToken)}
                />

                <CvvTooltip className={classes.inputTooltip} />
              </div>
            </div>
          </div>

          <div className={classes.column}>
            <div className={classes.title}>{intl.formatMessage({ id: 'billingInformationPage.billingAddress' })}</div>
            <div className={classes.inputContainer}>
              <PlacesInputPlane
                id="address"
                name="address"
                label=""
                placeholder="Address"
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
                placeholder="City"
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
                />
              </div>
              <div className={classes.inputContainer}>
                <InputPlane
                  id="zip"
                  name="zip"
                  placeholder="Zip code"
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
                  {intl.formatMessage({ id: 'billingInformationPage.useBillingAddressFromMyProfile' })}
                </Tickbox>
              </div>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
}

export default CreditCardForm;
