import React, { useState, useEffect } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';
import LocationService from 'frontend/js/api/LocationService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';

function CheckForm({ formik }) {
  const [states, setStates] = useState([]);
  const intl = useIntl();
  const { customer } = window;
  const countryId = customer && customer.country && customer.country.id;

  const translationSets = {
    address: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.address' }),
    city: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.city' }),
    state: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.state' }),
    zipCode: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.zipCode' }),
    name: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.name' }),
  };

  function getStatesList() {
    LocationService.getStatesByCountry(countryId)
      .then((response) => {
        const statesArray = response.states.map((state) => ({ value: state.id, label: state.name }));
        setStates(statesArray);
      })
      .catch(null);
  }

  useEffect(() => {
    getStatesList();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="pt-2">
      <InputPlane
        className="mt-10 pt-2"
        id="name"
        name="name"
        label={translationSets.name}
        value={formik.values.name}
        touched={formik.touched.name}
        error={formik.errors.name}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
      />

      <InputPlane
        className="mt-10 pt-2"
        id="address"
        name="address"
        label={translationSets.address}
        value={formik.values.address}
        touched={formik.touched.address}
        error={formik.errors.address}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
      />

      <InputPlane
        className="mt-10 pt-2"
        id="city"
        name="city"
        label={translationSets.city}
        value={formik.values.city}
        touched={formik.touched.city}
        error={formik.errors.city}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
      />

      <SelectPlane
        id="state"
        name="state"
        label={translationSets.state}
        onChangeAttribute="value"
        className="mt-10 pt-2"
        value={formik.values.state}
        options={states}
        error={formik.errors.state}
        touched={formik.touched.state}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        isSearchable
      />

      <InputPlane
        className="mt-10 pt-2"
        id="zip_code"
        name="zip_code"
        label={translationSets.zipCode}
        value={formik.values.zip_code}
        touched={formik.touched.zip_code}
        error={formik.errors.zip_code}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
      />
    </form>
  );
}

CheckForm.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default CheckForm;
