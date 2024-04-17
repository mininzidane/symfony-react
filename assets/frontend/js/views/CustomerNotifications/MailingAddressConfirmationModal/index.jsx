/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import CustomerService from 'frontend/js/api/CustomerService';
import CountryService from 'frontend/js/api/CountryService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import useCountries from 'frontend/js/hooks/useCountries';
import useStates from 'frontend/js/hooks/useStates';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import Button from 'frontend/js/components/Button';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import InfoCircleBlueSvg from 'frontend/images/shared/various/info-circle-blue.svg';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function MailingAddressConfirmationModal({ onClose, isOpen }) {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const countries = useCountries();

  const {
    company,
    mailingAddress,
    mailingApartment,
    mailingCity,
    mailingName,
    mailingPhone,
    mailingStateId: mailingState,
    mailingZip,
    mailingCountryId: mailingCountry,
    setCustomer,
  } = useCustomerHelper();

  const [isPerson, setIsPerson] = useState(!company);
  const isCustomerUS = mailingCountry === ShippingOrderService.CountryIdUS;

  const formik = useFormik({
    initialValues: {
      company: company || '',
      mailingAddress: (isCustomerUS && mailingAddress) || '',
      mailingApartment: (isCustomerUS && mailingApartment) || '',
      mailingCity: (isCustomerUS && mailingCity) || '',
      mailingName: mailingName || '',
      mailingPhone: mailingPhone || '',
      mailingState: (isCustomerUS && mailingState) || '',
      mailingZip: (isCustomerUS && mailingZip) || '',
      mailingCountry: ShippingOrderService.CountryIdUS,
    },
    onSubmit: async (values, { setSubmitting }) => {
      let hasFormChanged = false;

      if (
        values.company !== company ||
        values.mailingAddress !== mailingAddress ||
        values.mailingApartment !== mailingApartment ||
        values.mailingCity !== mailingCity ||
        values.mailingName !== mailingName ||
        values.mailingPhone !== mailingPhone ||
        values.mailingState !== mailingState ||
        values.mailingZip !== mailingZip ||
        values.mailingCountry !== mailingCountry
      ) {
        hasFormChanged = true;
      }

      try {
        setSubmitting(true);
        const payload = {
          ...values,
          confirmMailingAddress: true,
          ...(hasFormChanged && { mailingAsPhysical: false }),
        };
        delete payload.stateCode;
        delete payload.mailingStateCode;

        if (isPerson) {
          delete payload.company;
        } else {
          delete payload.mailingName;
        }

        const response = await CustomerService.updateCustomer(payload);
        setCustomer(response.customer);
        enqueueSnackbar(intl.formatMessage({ id: 'form.message.informationSaved' }), { variant: 'success' });
      } catch (error) {
        const errors = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
        enqueueSnackbar(errors, { variant: 'error' });
      }

      setSubmitting(false);
      onClose();
    },
    validationSchema,
    enableReinitialize: true,
  });

  const translationSets = {
    company: intl.formatMessage({ id: 'shared.label.company' }),
    address: intl.formatMessage({ id: 'shared.label.address' }),
    apartment: intl.formatMessage({ id: 'shared.label.apartment' }),
    city: intl.formatMessage({ id: 'shared.label.city' }),
    state: intl.formatMessage({ id: 'shared.label.state' }),
    zipCode: intl.formatMessage({ id: 'shared.label.zipCode' }),
    country: intl.formatMessage({ id: 'shared.label.country' }),
    mailingName: intl.formatMessage({ id: 'shared.label.name' }),
  };

  const [mailingStates, isLoadingMailingState] = useStates(formik.values.mailingCountry);
  const [states, isLoadingState] = useStates(formik.values.country);

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
  }, [isLoadingState]);

  useEffect(() => {
    if (!isLoadingMailingState && formik.values.mailingStateCode) {
      const stateId = getStateIdByCode(formik.values.mailingStateCode, mailingStates);
      formik.setFieldValue('mailingState', stateId || '');
    }
  }, [isLoadingMailingState]);

  return (
    <ModalWindow onClose={() => {}} isOpen={isOpen} size="sm">
      <ModalWindowHeader title={<FormattedMessage id="contactInformationConfirmationModal.title" />} />
      <ModalWindowBody className={classes.body}>
        <FormattedMessage
          id={
            CountryService.isCustomerProfileCountry()
              ? 'contactInformationConfirmationModal.desc.domestic'
              : 'contactInformationConfirmationModal.desc.intl'
          }
          className={classes.desc}
        />

        <div className={classes.tabs}>
          <RadioButton
            label="Person"
            name="shippingType"
            id="contact-information-confirmation-modal-person-tab"
            value="person"
            isChecked={isPerson}
            onChange={() => {
              setIsPerson(true);
            }}
          />

          <RadioButton
            label="Company"
            name="shippingType"
            id="contact-information-confirmation-modal-company-tab"
            value="company"
            isChecked={!isPerson}
            onChange={() => {
              setIsPerson(false);
            }}
          />
        </div>

        <form onSubmit={formik.handleSubmit}>
          {isPerson ? (
            <div className={classes.inputContainer}>
              <InputPlane
                id="mailingName"
                name="mailingName"
                placeholder={translationSets.mailingName}
                value={formik.values.mailingName}
                error={formik.errors.mailingName}
                touched={formik.touched.mailingName}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
              />
            </div>
          ) : (
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
                isAutoFocus
              />
            </div>
          )}

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
              value={formik.values.mailingAddress}
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
                  const countryId = getCountryIdByCode(country_code);
                  if (countryId === ShippingOrderService.CountryIdUS) {
                    formik.setFieldValue('mailingAddress', newAddress);
                    formik.setFieldValue('mailingCity', newCity);
                    formik.setFieldValue('mailingStateCode', state_code);
                    formik.setFieldValue('mailingZip', newZip);
                    formik.setFieldValue('mailingCountry', countryId || '');
                    const stateId = getStateIdByCode(state_code, mailingStates);
                    formik.setFieldValue('mailingState', stateId || '');
                  }
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
              id="mailingApartment"
              name="mailingApartment"
              placeholder={translationSets.apartment}
              value={formik.values.mailingApartment}
              touched={formik.touched.mailingApartment}
              error={formik.errors.mailingApartment}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              onError={formik.setFieldError}
            />
          </div>

          <div className={classes.inputContainer}>
            <InputPlane
              id="mailingCity"
              name="mailingCity"
              placeholder={translationSets.city}
              value={formik.values.mailingCity}
              touched={formik.touched.mailingCity}
              error={formik.errors.mailingCity}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              onError={formik.setFieldError}
            />
          </div>

          <div className={classes.inputsGroup}>
            <SelectPlane
              id="mailingState"
              name="mailingState"
              placeholder={translationSets.state}
              value={formik.values.mailingState}
              options={mailingStates}
              error={formik.errors.mailingState}
              touched={formik.touched.mailingState}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              onChangeAttribute="id"
              formatOptionLabel={(option) => option.name}
              isSearchable
              convertMobileSelectValue={(value) => parseInt(value, 10)}
            />
            <InputPlane
              id="mailingZip"
              name="mailingZip"
              placeholder={translationSets.zipCode}
              value={formik.values.mailingZip}
              touched={formik.touched.mailingZip}
              error={formik.errors.mailingZip}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              onError={formik.setFieldError}
            />
          </div>

          <div className={classes.inputContainer}>
            <SelectPlane
              id="mailingCountry"
              name="mailingCountry"
              placeholder={translationSets.country}
              value={formik.values.mailingCountry}
              options={countries}
              error={formik.errors.mailingCountry}
              touched={formik.touched.mailingCountry}
              onChange={() => {}}
              onBlur={formik.setFieldTouched}
              onChangeAttribute="id"
              formatOptionLabel={(option) => option.name}
              convertMobileSelectValue={(value) => parseInt(value, 10)}
              isSearchable
              disabled
            />
          </div>

          <div className={classes.note}>
            <img width={14} height={14} src={InfoCircleBlueSvg} alt="info" />
            <FormattedMessage id="contactInformationConfirmationModal.note" className="note-message" />
          </div>

          <Button
            type="submit"
            label={<FormattedMessage id="contactInformationConfirmationModal.cta" />}
            className={classes.cta}
            isLoading={formik.isSubmitting}
            size="md"
          />
        </form>
      </ModalWindowBody>
    </ModalWindow>
  );
}

MailingAddressConfirmationModal.propTypes = {};

export default MailingAddressConfirmationModal;
