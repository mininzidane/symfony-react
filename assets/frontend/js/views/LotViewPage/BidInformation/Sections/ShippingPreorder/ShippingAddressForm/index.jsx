import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import Button from 'frontend/js/components/Button';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import PlacesInput from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import TextAreaPlane from 'frontend/js/components/Form/PlaneTheme/TextAreaPlane';
import CountryShape from 'frontend/js/lib/propshapes/CountryShape';
import DestinationShape from 'frontend/js/lib/propshapes/DestinationShape';
import ShippingAddressFormSchema from './ShippingAddressFormSchema';

function ShippingAddressForm({ onSubmit, onClose, destination, countries, destinations, onCountryUpdate }) {
  const intl = useIntl();

  const FORM_TYPE_DOMESTIC = 'D';
  const FORM_TYPE_INTERNATIONAL = 'I';
  const FORM_TYPE_BORDER_CROSSING = 'B';
  const {
    countryId,
    destinationId,
    address = '',
    city = '',
    stateCode = '',
    zip = '',
    firstName,
    lastName,
    phoneNumber,
    email,
    consignee,
    comment,
  } = destination;

  const translationSets = {
    shippingSubcaption: intl.formatMessage({
      id: 'shipping.form.subcaption',
      defaultMessage: 'Please enter vehicle delivery address and contact information',
    }),
    altClose: intl.formatMessage({
      id: 'shared.label.close',
      defaultMessage: 'Close',
    }),
    countryLabel: intl.formatMessage({
      id: 'shared.label.country',
      defaultMessage: 'Country',
    }),
    destinationLabel: intl.formatMessage({
      id: 'shared.label.destination',
      defaultMessage: 'Destination',
    }),
    addressLabel: intl.formatMessage({
      id: 'shared.label.address',
      defaultMessage: 'Address',
    }),
    firstNameLabel: intl.formatMessage({
      id: 'shared.label.firstName',
      defaultMessage: 'First Name',
    }),
    lastNameLabel: intl.formatMessage({
      id: 'shared.label.lastName',
      defaultMessage: 'Last Name',
    }),
    phoneNumberLabel: intl.formatMessage({
      id: 'shared.label.phoneNumber',
      defaultMessage: 'Phone number',
    }),
    emailLabel: intl.formatMessage({
      id: 'shared.label.email',
      defaultMessage: 'Email',
    }),
    consigneeLabel: intl.formatMessage({
      id: 'shared.label.consignee',
      defaultMessage: 'Consignee',
    }),
    yourCommentLabel: intl.formatMessage({
      id: 'shipping.form.yourCommentOptional',
      defaultMessage: 'Your Comment (optional)',
    }),
    ctaUpdateInformation: intl.formatMessage({
      id: 'shared.label.updateInformation',
      defaultMessage: 'Update Information',
    }),
  };

  function getShippingTypeByCountryId(id) {
    if (id === ShippingOrderService.CountryIdUS) {
      return FORM_TYPE_DOMESTIC;
    }

    if (ShippingOrderService.BorderCrossingCountries.includes(id)) {
      return FORM_TYPE_BORDER_CROSSING;
    }

    return FORM_TYPE_INTERNATIONAL;
  }

  function onFormSubmit(values) {
    onSubmit(values);
    onClose();
  }

  return (
    <div>
      <div className="bid-information__shipping-address-form-subcaption">{translationSets.shippingSubcaption}</div>

      <div className="bid-information__shipping-address-form-fields">
        <Formik
          initialValues={{
            shippingType: getShippingTypeByCountryId(countryId),
            countryId,
            destinationId,
            address: address || '',
            city: city || '',
            stateCode: stateCode || '',
            zip: zip || '',
            firstName: firstName || '',
            lastName: lastName || '',
            phoneNumber: phoneNumber || '',
            email: email || '',
            consignee: consignee || '',
            comment: comment || '',
          }}
          validationSchema={ShippingAddressFormSchema}
          enableReinitialize
          validateOnBlur
          onSubmit={onFormSubmit}
        >
          {({ values, touched, errors, setFieldValue, setFieldError, setFieldTouched, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <input type="hidden" value={values.shippingType} name="shippingType" />

              <SelectPlane
                id="countryId"
                name="countryId"
                label={translationSets.countryLabel}
                value={values.countryId}
                options={countries}
                error={errors.countryId}
                touched={touched.countryId}
                onChange={async (name, value) => {
                  setFieldValue(name, value);

                  await onCountryUpdate(value);

                  const shippingType = getShippingTypeByCountryId(value);
                  setFieldValue('shippingType', shippingType);
                  setFieldValue('destinationId', null);
                }}
                onBlur={setFieldTouched}
                onChangeAttribute="id"
                formatOptionLabel={(option) => option.name}
                convertMobileSelectValue={(value) => parseInt(value, 10)}
                isSearchable
                isBold
              />

              {values.shippingType === FORM_TYPE_DOMESTIC && (
                <>
                  <input name="city" type="hidden" value={values.city} />
                  <input name="stateCode" type="hidden" value={values.stateCode} />
                  <input name="zip" type="hidden" value={values.zip} />

                  <PlacesInput
                    label={translationSets.addressLabel}
                    id="address"
                    name="address"
                    className="mt-10"
                    restrictAddress
                    value={values.address}
                    touched={touched.address}
                    error={errors.address}
                    applyMask={(val) => {
                      if (typeof val !== 'object' || val === null) {
                        return val;
                      }

                      const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = val;
                      return [gAddress, gCity, gState, gZip].filter((frag) => !!frag).join(', ');
                    }}
                    onChange={(name, value) => {
                      setFieldValue(name, value);
                      if (typeof value === 'object') {
                        const { city: gCity = '', state_code: gStateCode = '', zip: gZip = '' } = value;

                        setFieldValue('city', gCity);
                        setFieldValue('stateCode', gStateCode);
                        setFieldValue('zip', gZip);
                      } else {
                        setFieldValue('city', '');
                        setFieldValue('stateCode', '');
                        setFieldValue('zip', '');
                      }
                    }}
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                  />
                </>
              )}

              {values.shippingType === FORM_TYPE_BORDER_CROSSING && (
                <SelectPlane
                  id="destinationId"
                  name="destinationId"
                  label={translationSets.destinationLabel}
                  className="mt-10"
                  value={values.destinationId}
                  options={destinations}
                  error={errors.destinationId}
                  touched={touched.destinationId}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  onChangeAttribute="id"
                  formatOptionLabel={(option) => option.name}
                  convertMobileSelectValue={(value) => parseInt(value, 10)}
                  isSearchable
                  isBold
                />
              )}

              {values.shippingType !== FORM_TYPE_INTERNATIONAL && (
                <>
                  <InputPlane
                    label={translationSets.firstNameLabel}
                    id="firstName"
                    name="firstName"
                    className="mt-10"
                    maxLength="100"
                    value={values.firstName}
                    touched={touched.firstName}
                    error={errors.firstName}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                    isBold
                  />

                  <InputPlane
                    label={translationSets.lastNameLabel}
                    id="lastName"
                    name="lastName"
                    className="mt-10"
                    maxLength="100"
                    value={values.lastName}
                    touched={touched.lastName}
                    error={errors.lastName}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                    isBold
                  />

                  <InputPlane
                    label={translationSets.phoneNumberLabel}
                    className="mt-10"
                    id="phoneNumber"
                    name="phoneNumber"
                    maxLength="100"
                    value={values.phoneNumber}
                    touched={touched.phoneNumber}
                    error={errors.phoneNumber}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                    isBold
                  />

                  <InputPlane
                    label={translationSets.emailLabel}
                    id="email"
                    name="email"
                    className="mt-10"
                    maxLength="100"
                    value={values.email}
                    touched={touched.email}
                    error={errors.email}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                    isBold
                  />
                </>
              )}

              {values.shippingType === FORM_TYPE_INTERNATIONAL && (
                <TextAreaPlane
                  id="consignee"
                  name="consignee"
                  className="mt-10"
                  label={translationSets.consigneeLabel}
                  value={values.consignee}
                  touched={touched.consignee}
                  error={errors.consignee}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              )}

              <InputPlane
                placeholder={translationSets.yourCommentLabel}
                id="comment"
                name="comment"
                className="mt-10"
                value={values.comment}
                touched={touched.comment}
                error={errors.comment}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                onError={setFieldError}
                isBold
              />

              <Button
                type="submit"
                className="btn-primary"
                label={translationSets.ctaUpdateInformation}
                style={{ marginTop: 15 }}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

ShippingAddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(CountryShape),
  destinations: PropTypes.arrayOf(DestinationShape),
  destination: PropTypes.shape({
    countryId: PropTypes.number,
    destinationId: PropTypes.number,
    city: PropTypes.string,
    stateCode: PropTypes.string,
    zip: PropTypes.string,
    address: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    consignee: PropTypes.string,
    comment: PropTypes.string,
  }),
  onCountryUpdate: PropTypes.func.isRequired,
};

ShippingAddressForm.defaultProps = {
  countries: [],
  destinations: [],
  destination: PropTypes.shape({
    countryId: null,
    destinationId: null,
    address: '',
    city: '',
    stateCode: '',
    zip: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    consignee: '',
    comment: '',
  }),
};

export default ShippingAddressForm;
