import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LocationService from 'frontend/js/api/LocationService';
import UserLocationService from 'frontend/js/api/UserLocationService';
import useIntl from 'frontend/js/hooks/useIntl';
import { useSnackbar } from 'notistack';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import CountryService from 'frontend/js/api/CountryService';
import useStyles from '../useStyles';

function ZipForm({ formik }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { zip: customerZip, countryId: customerCountryId } = useCustomerHelper();
  const isUSA = customerCountryId === CountryService.COUNTRIES.usa.code;

  const [zip, setZip] = useState(formik.values.zip);
  const [isLoading, setIsLoading] = useState(false);
  const isGeolocationAvailable = Boolean(navigator.geolocation);

  function getLocationZip() {
    setZip('');
    if (isGeolocationAvailable) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords || {};
          LocationService.getLocationInformationByLatAndLong(latitude, longitude)
            .then((location) => {
              if (location.zip) {
                formik.setFieldValue('zipValid', true);
                formik.setFieldValue('zip', location.zip);
                formik.setFieldValue('pickupCity', location.city);
                formik.setFieldValue('pickupStateCode', location.state_code);
              } else {
                enqueueSnackbar('Zip code not found', { variant: 'error' });
              }
            })
            .catch(() => {
              formik.setFieldValue('zipValid', false);
              formik.setFieldTouched('zip', true);
              enqueueSnackbar(intl.formatMessage({ id: 'form.error.general' }), { variant: 'error' });
            })
            .finally(() => {
              setIsLoading(false);
            });
        },
        (error) => {
          setIsLoading(false);
          enqueueSnackbar(error.message, { variant: 'error' });
        },
        { timeout: 5000, enableHighAccuracy: true },
      );
    }
  }

  async function getLocationByZipCode() {
    setIsLoading(true);
    const userLocationService = new UserLocationService();
    try {
      const response = await userLocationService.getLocationByZipCode(zip);
      if (response.city) {
        formik.setFieldValue('zipValid', true);
        formik.setFieldValue('zip', response.zip);
        formik.setFieldValue('pickupCity', response.city);
        formik.setFieldValue('pickupStateCode', response.state_code);
        setIsLoading(false);
        return;
      }
    } catch {
      /** ignore */
    }
    formik.setFieldValue('zipValid', false);
    setIsLoading(false);
  }

  useEffect(() => {
    if (ValidationService.validateZip(zip) && !formik.values.zipValid) {
      getLocationByZipCode();
    }
  }, [zip]);

  useEffect(() => {
    if (!formik.values.zip && !formik.touched.zip) {
      if (isUSA && customerZip) {
        setZip(customerZip);
        formik.setFieldValue('zip', customerZip);
      }
    }
  }, []);

  const location = [formik.values.pickupCity, formik.values.pickupStateCode].filter(Boolean).join(', ');

  return (
    <form onSubmit={formik.handleSubmit} className={classes.grid}>
      <div>
        <div className="pos-r">
          <InputPlane
            id="zip"
            name="zip"
            placeholder={intl.formatMessage({ id: 'shared.label.zipCode' })}
            value={formik.values.zip}
            touched={formik.touched.zip}
            error={formik.errors.zip}
            onChange={(name, value) => {
              formik.setFieldValue(name, value);
              formik.setFieldValue('zipValid', false);
              formik.setFieldValue('pickupCity', null);
              formik.setFieldValue('pickupStateCode', null);
              setZip(value);
            }}
            onBlur={formik.setFieldTouched}
            onError={formik.setFieldError}
            mask="numbers"
            loading={isLoading}
            checkmark={formik.values.zipValid}
          />
          {isGeolocationAvailable && !formik.values.zipValid && !isLoading && (
            <ButtonLink
              onClick={getLocationZip}
              label={
                <>
                  <svg
                    fill="none"
                    width={11}
                    height={14}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 11 14"
                    style={{ marginRight: 3 }}
                  >
                    <path
                      d="M10.5 5.25c0 .85-.306 1.797-.804 2.762-.495.96-1.16 1.905-1.835 2.743A27.364 27.364 0 0 1 5.5 13.317a27.364 27.364 0 0 1-2.36-2.562c-.676-.838-1.341-1.782-1.836-2.743C.806 7.047.5 6.1.5 5.25.5 2.648 2.716.5 5.5.5s5 2.148 5 4.75Z"
                      stroke="#2158F5"
                    />
                    <circle cx="5.5" cy="5.5" r="2" stroke="#2158F5" />
                  </svg>
                  {intl.formatMessage({ id: 'shared.cta.useMyLocation' })}
                </>
              }
              className={classes.btnMyLocation}
            />
          )}
        </div>
        {location && <div className={classes.inputDesc}>{location}</div>}
      </div>
    </form>
  );
}

ZipForm.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default ZipForm;
