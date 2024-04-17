import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useFormik } from 'formik';
import { useShippingContext } from 'backend/js/context/ShippingContext';
import SubmitButton from 'backend/js/components/SubmitButton';
import Select from 'backend/js/components/Form/Select';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import PlacesInput from 'backend/js/components/Form/PlacesInputPlane';
import useStyles from './useStyles';

function ShippingLocationForm({ onLocationUpdate }) {
  const { shippingType, destination, getCountries, getDestinations, getStatesByCountry, getPorts, updateDestination } =
    useShippingContext();

  const { country, state, countryDestination, usPort, address, city, zip } = destination;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [usPorts, setUsPorts] = useState([]);
  const classes = useStyles();

  function getFormattedShippingAddress(values) {
    return {
      address: values.address,
      city: values.city,
      state: get(values.state, 'name'),
      state_code: get(values.state, 'code'),
      country: get(values.country, 'name'),
      country_code: get(values.country, 'iso_2'),
      zip: values.zip,
    };
  }

  const formik = useFormik({
    initialValues: {
      shippingType,
      country,
      state,
      countryDestination,
      usPort,
      address,
      city,
      zip,
      domesticAddress: getFormattedShippingAddress(destination),
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = { country: values.country };
      if (values.shippingType === ShippingOrderService.TypeDomestic) {
        Object.assign(payload, {
          state: values.state,
          address: values.address,
          city: values.city,
          zip: values.zip,
        });
      } else {
        Object.assign(payload, { countryDestination: values.countryDestination });
        if (values.shippingType === ShippingOrderService.TypeInternational) {
          Object.assign(payload, { usPort: values.usPort });
        }
      }

      updateDestination(payload);
      setTimeout(() => {
        onLocationUpdate();
      }, 150);
    },
  });

  async function loadCountries() {
    try {
      const countryList = await getCountries();
      setCountries(countryList);
    } catch (e) {
      /** Ignore */
    }
  }

  async function loadStates(countryId) {
    try {
      const { states: responseStates } = await getStatesByCountry(countryId);

      setStates(responseStates);
    } catch (e) {
      setStates([]);
    }
  }

  async function loadDestinations(countryId) {
    try {
      const response = await getDestinations(countryId);
      setDestinations(response);
    } catch (e) {
      setDestinations([]);
    }
  }

  async function loadUsPorts(destinationId) {
    try {
      const response = await getPorts(destinationId);
      setUsPorts(response);
    } catch (e) {
      setUsPorts([]);
    }
  }

  useEffect(() => {
    loadCountries();
    // loadStates(ShippingOrderService.CountryIdUS);
  }, []);

  useEffect(() => {
    if (!formik.values.country || !formik.values.country.id) {
      return;
    }

    const { id } = formik.values.country;
    if (id !== ShippingOrderService.CountryIdUS) {
      loadDestinations(id);
    } else if (!states.length) {
      loadStates(id);
    }
  }, [formik.values.country]);

  useEffect(() => {
    if (!formik.values.countryDestination || !formik.values.countryDestination.id) {
      return;
    }

    if (formik.values.shippingType === ShippingOrderService.TypeInternational) {
      loadUsPorts(formik.values.countryDestination.id);
    }
  }, [formik.values.countryDestination]);

  function findStateByCode(stateCode) {
    return states.find((st) => st.code === stateCode);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.row}>
        <Select
          options={countries}
          id="shipping-country"
          name="country"
          label="Country"
          value={formik.values.country}
          error={formik.errors.country}
          touched={formik.touched.country}
          onBlur={formik.setFieldTouched}
          onChange={(name, value) => {
            const { iso_2 } = value;

            let { type } = value;
            if (!type) {
              type = ShippingOrderService.getShippingTypeByCountryCode(iso_2);
            }

            formik.setFieldValue(name, value);
            formik.setFieldValue('shippingType', type);
            formik.setFieldValue('state', {});
            formik.setFieldValue('countryDestination', {});
            formik.setFieldValue('usPort', {});
          }}
          formatOptionLabel={(option) => option.name}
          onChangeAttribute="id"
          isSearchable
        />
      </div>

      {formik.values.shippingType === ShippingOrderService.TypeDomestic && (
        <div className={classes.row}>
          <PlacesInput
            id="shipping-address"
            name="domesticAddress"
            label="Address"
            value={formik.values.domesticAddress}
            applyMask={(val) => {
              if (typeof val !== 'object' || val === null) {
                return val;
              }

              const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = val;
              return [gAddress, gCity, gState, gZip].filter((frag) => !!frag).join(', ');
            }}
            onChange={(name, value) => {
              formik.setFieldValue(name, value);
              if (typeof value === 'object') {
                const { address: gAddress = '', city: gCity = '', state_code: gStateCode = '', zip: gZip = '' } = value;

                formik.setFieldValue('address', gAddress);
                formik.setFieldValue('city', gCity);
                const newState = findStateByCode(gStateCode);
                formik.setFieldValue('state', newState);
                formik.setFieldValue('zip', gZip);
              } else {
                formik.setFieldValue('address', '');
                formik.setFieldValue('city', '');
                formik.setFieldValue('state', {});
                formik.setFieldValue('zip', '');
              }
            }}
            onError={formik.setFieldError}
            onBlur={formik.setFieldTouched}
          />
        </div>
      )}
      {formik.values.shippingType !== ShippingOrderService.TypeDomestic && (
        <>
          <div className={classes.row}>
            <Select
              options={destinations}
              id="shipping-destination"
              name="countryDestination"
              label="Destination"
              value={formik.values.countryDestination}
              error={formik.errors.countryDestination}
              touched={formik.touched.countryDestination}
              onBlur={formik.setFieldTouched}
              onChange={formik.setFieldValue}
              formatOptionLabel={(option) => option.name}
              onChangeAttribute="id"
              isSearchable
            />
          </div>

          {formik.values.shippingType === ShippingOrderService.TypeInternational && (
            <div className={classes.row}>
              <Select
                options={usPorts}
                id="shipping-port"
                name="usPort"
                label="Port"
                value={formik.values.usPort}
                error={formik.errors.usPort}
                touched={formik.touched.usPort}
                onBlur={formik.setFieldTouched}
                onChange={formik.setFieldValue}
                formatOptionLabel={(option) => option.name}
                onChangeAttribute="id"
              />
            </div>
          )}
        </>
      )}

      <SubmitButton
        label="Update Information"
        className="btn-primary full-width"
        disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
      />
    </form>
  );
}

ShippingLocationForm.propTypes = {
  onLocationUpdate: PropTypes.func,
};

ShippingLocationForm.defaultProps = {
  onLocationUpdate: () => null,
};

export default ShippingLocationForm;
