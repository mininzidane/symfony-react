import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import UserLocationService from 'frontend/js/api/UserLocationService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useIntl from 'frontend/js/hooks/useIntl';

import GooglePlaceService from 'frontend/js/lib/utils/GooglePlaceService';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import useCountries from 'frontend/js/hooks/useCountries';
import CountryService from 'frontend/js/api/CountryService';
import useStyles from './useStyles';

const ChangeLocationPopup = ({ isOpened, onClose, onResponse }) => {
  const classes = useStyles();
  const intl = useIntl();
  const optionsCountries = useCountries();

  const onSubmit = async ({ zip, country }, { setFieldError }) => {
    let res;

    try {
      if (country === CountryService.COUNTRIES.usa.code) {
        const userLocationService = new UserLocationService();
        res = await userLocationService.getLocationByZipCode(zip);

        if (res.zip) {
          onResponse(res);
        } else {
          throw new Error();
        }
      } else {
        const googlePlaceService = new GooglePlaceService();
        res = await googlePlaceService.geocodeAddress({
          zip,
          countryIso2: optionsCountries.find((c) => c.id === country).iso_2,
        });
        if (res) {
          const location = res.results?.[0];

          onResponse({
            ...googlePlaceService.formatSelectedLocationForUserLocation(location),
            formattedAddress: location.formatted_address,
          });
        } else {
          throw new Error();
        }
      }
    } catch {
      setFieldError(
        'zip',
        intl.formatMessage({
          id: 'todayAuctions.noResults',
        }),
      );
    }
  };

  const validate = ({ zip }) => {
    const errors = {};

    if (!zip) {
      errors.zip = intl.formatMessage({ id: 'form.error.requiredField' });
    }

    return errors;
  };

  return (
    <ModalWindow isOpen={isOpened} onClose={onClose}>
      <ModalWindowHeader title="Change your location" onClose={onClose} />
      <ModalWindowBody>
        <Formik
          initialValues={{
            zip: '',
            country: CountryService.COUNTRIES.usa.code,
          }}
          onSubmit={onSubmit}
          validate={validate}
          enableReinitialize
        >
          {({ handleSubmit, values, touched, setFieldValue, errors, setFieldTouched, setFieldError }) => (
            <form onSubmit={handleSubmit} className={classes.formZip}>
              <SelectPlane
                id="country"
                name="country"
                value={values.country}
                touched={touched.country}
                error={errors.country}
                placeholder={intl.formatMessage({ id: 'shared.label.state' })}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                onError={setFieldError}
                onChangeAttribute="id"
                formatOptionLabel={(option) => option.name}
                options={optionsCountries}
                isSearchable
              />

              <InputPlane
                id="zip"
                name="zip"
                value={values.zip}
                touched={touched.zip}
                error={errors.zip}
                placeholder={[
                  intl.formatMessage({ id: 'shared.label.zipCode' }),
                  intl.formatMessage({ id: 'shared.label.postalCode' }),
                ].join(' / ')}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                onError={setFieldError}
              />
              <Button label={<FormattedMessage id="shared.label.apply" />} type="submit" />
            </form>
          )}
        </Formik>
      </ModalWindowBody>
    </ModalWindow>
  );
};

ChangeLocationPopup.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onResponse: PropTypes.func.isRequired,
};

export default ChangeLocationPopup;
