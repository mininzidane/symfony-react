import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import LocationService from 'frontend/js/api/LocationService';
import Button from 'frontend/js/components/Button';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import PlacesInput from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import useShippingCountries from 'frontend/js/hooks/useShippingCountries';
import useDestinations from 'frontend/js/hooks/useDestinations';
import ValidationSchema from './ValidationSchema';

function ShippingAddressForm({ onSubmit }) {
  const intl = useIntl();
  const { shippingCountryId, shippingDestinationId, shippingCity, shippingStateCode, shippingZip } =
    useContext(ShippingQuoteContext);
  const { values, touched, errors, setFieldTouched, setFieldValue, setFieldError, handleSubmit } = useFormik({
    initialValues: {
      countryId: shippingCountryId,
      destinationId: shippingDestinationId,
      place: shippingZip ? { zip: shippingZip } : '',
      shippingType: ShippingOrderService.getShippingTypeByCountryId(shippingCountryId),
      city: shippingCity,
      stateCode: shippingStateCode,
      zip: shippingZip,
    },
    validationSchema: ValidationSchema,
    onSubmit,
    enableReinitialize: true,
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
        onChange={async (name, value) => {
          setFieldValue(name, value);
          setFieldValue('destinationId', null);
          setFieldValue('shippingType', ShippingOrderService.getShippingTypeByCountryId(value));
          setFieldValue('city', '');
          setFieldValue('stateCode', '');
          setFieldValue('zip', '');
        }}
        onBlur={setFieldTouched}
        onChangeAttribute="id"
        formatOptionLabel={(option) => option.name}
        convertMobileSelectValue={(value) => parseInt(value, 10)}
        isSearchable
      />

      {values.shippingType === ShippingOrderService.TypeDomestic && (
        <PlacesInput
          label={intl.formatMessage({ id: 'shared.label.zipCode' })}
          id="place"
          name="place"
          className="mt-10"
          restrictZip
          value={values.place}
          touched={touched.place}
          error={errors.place}
          applyMask={(val) => {
            if (!val || typeof val !== 'object') {
              return val;
            }

            const { city, state_code, zip } = val;
            return LocationService.formatCityStateZip(city, state_code, zip);
          }}
          onChange={(name, value) => {
            setFieldValue(name, value, false);
            if (value && typeof value === 'object') {
              const { city = '', state_code = '', zip = '' } = value;

              setFieldValue('city', city);
              setFieldValue('stateCode', state_code);
              setFieldValue('zip', zip);
            } else {
              setFieldValue('city', '');
              setFieldValue('stateCode', '');
              setFieldValue('zip', '');
            }
          }}
          onBlur={setFieldTouched}
          onError={setFieldError}
        />
      )}

      {values.shippingType === ShippingOrderService.TypeBorderCrossing && (
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

      <Button
        className="mt-20 js-track-event"
        type="submit"
        label={<FormattedMessage id="shipping.getQuote" />}
        size="sm"
        isRegularCase
        isInline
        data-step="abm_shipping"
        data-substep="get_quote_button_click"
      />
    </form>
  );
}

ShippingAddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ShippingAddressForm;
