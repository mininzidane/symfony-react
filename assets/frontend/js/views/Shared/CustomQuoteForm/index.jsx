import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import Button from 'frontend/js/components/Button';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import PlacesInput from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import useShippingCountries from 'frontend/js/hooks/useShippingCountries';
import useDestinations from 'frontend/js/hooks/useDestinations';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import TextAreaPlane from 'frontend/js/components/Form/PlaneTheme/TextAreaPlane';
import ValidationSchema from './ValidationSchema';

function CustomQuoteForm({ onSubmit }) {
  const intl = useIntl();
  const {
    shippingCountryId,
    shippingDestinationId,
    shippingAddress,
    shippingCity,
    shippingStateCode,
    shippingZip,
    shippingInstructions,
    shippingEmail,
    shippingPhoneNumber,
    shippingType,
  } = useContext(ShippingQuoteContext);

  const { values, touched, errors, setFieldTouched, setFieldValue, setFieldError, handleSubmit } = useFormik({
    initialValues: {
      address: shippingAddress || '',
      city: shippingCity || '',
      stateCode: shippingStateCode || '',
      zip: shippingZip || '',
      countryId: shippingCountryId,
      destinationId: shippingDestinationId,
      comment: shippingInstructions,
      phoneNumber: shippingPhoneNumber || '',
      email: shippingEmail || '',
      shippingType,
    },
    validationSchema: ValidationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const countries = useShippingCountries();
  const destinations = useDestinations(values.countryId);

  return (
    <form onSubmit={handleSubmit}>
      <SelectPlane
        id="countryId"
        name="countryId"
        label={intl.formatMessage({ id: 'shared.label.country' })}
        value={values.countryId}
        options={countries}
        error={errors.countryId}
        touched={touched.countryId}
        onChange={(name, value) => {
          setFieldValue(name, value);
          setFieldValue('destinationId', null);
          setFieldValue('shippingType', ShippingOrderService.getShippingTypeByCountryId(value));
        }}
        onBlur={setFieldTouched}
        onChangeAttribute="id"
        formatOptionLabel={(option) => option.name}
        convertMobileSelectValue={(value) => parseInt(value, 10)}
        isSearchable
      />

      {values.shippingType === ShippingOrderService.TypeDomestic ? (
        <>
          <PlacesInput
            id="address"
            name="address"
            label={intl.formatMessage({ id: 'shared.label.address' })}
            className="mt-10"
            value={values.address}
            error={errors.address}
            touched={touched.address}
            onBlur={setFieldTouched}
            restrictAddress
            onChange={(name, value) => {
              setFieldValue(name, value);
              if (value && typeof value === 'object') {
                const { address = '', city = '', state_code = '', zip = '' } = value;

                setFieldValue('address', address);
                setFieldValue('city', city);
                setFieldValue('stateCode', state_code);
                setFieldValue('zip', zip);
              } else {
                setFieldValue('city', '');
                setFieldValue('stateCode', '');
                setFieldValue('zip', '');
              }
            }}
            onError={setFieldError}
          />

          <InputPlane
            id="city"
            name="city"
            label={intl.formatMessage({ id: 'shared.label.city' })}
            className="mt-10"
            value={values.city}
            error={errors.city}
            touched={touched.city}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          />

          <div className="grid-x no-wrap mt-10">
            <SelectPlane
              id="stateCode"
              name="stateCode"
              label={intl.formatMessage({ id: 'shared.label.state' })}
              placeholder="State"
              onChangeAttribute="value"
              className="xl-5 mr-10"
              value={values.stateCode}
              options={ShippingOrderService.StateList}
              error={errors.stateCode}
              touched={touched.stateCode}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              isSearchable
            />

            <div className="xl-7">
              <InputPlane
                id="zip"
                name="zip"
                label={intl.formatMessage({ id: 'shared.label.zipCode' })}
                value={values.zip}
                error={errors.zip}
                touched={touched.zip}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                mask="numbers"
              />
            </div>
          </div>
        </>
      ) : (
        <SelectPlane
          id="destinationId"
          name="destinationId"
          label={intl.formatMessage({ id: 'shared.label.destination' })}
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
        />
      )}

      <TextAreaPlane
        id="instructions"
        name="instructions"
        label={intl.formatMessage({ id: 'shared.label.comments' })}
        className="mt-10"
        value={values.instructions}
        error={errors.instructions}
        maxLength="250"
        rows={4}
        touched={touched.instructions}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
      />

      <Button
        className="mt-20 js-track-event"
        type="submit"
        label={<FormattedMessage id="lotPage.shipping.customQuote.request" />}
        size="sm"
        isRegularCase
        isInline
        data-step="abm_shipping"
        data-substep="request_custom_quote_button_popup_click"
      />
    </form>
  );
}

CustomQuoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CustomQuoteForm;
