import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LocationService from 'backend/js/api/LocationService';
import Input from 'backend/js/components/Form/Input';
import Select from 'backend/js/components/Form/Select';

function CheckForm({ formik }) {
  const [states, setStates] = useState([]);
  const locationService = new LocationService();

  function getStatesList() {
    locationService
      .getStatesByCountry(formik.values.country)
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
      <h3 className="mt-20">Address:</h3>
      <Input
        className="mt-20"
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        touched={formik.touched.name}
        error={formik.errors.name}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
        disabled
      />

      <Input
        className="mt-20"
        id="address"
        name="address"
        label="Address"
        value={formik.values.address}
        touched={formik.touched.address}
        error={formik.errors.address}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
      />

      <Input
        className="mt-20"
        id="city"
        name="city"
        label="City"
        value={formik.values.city}
        touched={formik.touched.city}
        error={formik.errors.city}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
      />

      <Select
        id="state"
        name="state"
        label="State"
        onChangeAttribute="value"
        className="mt-20"
        value={formik.values.state}
        options={states}
        error={formik.errors.state}
        touched={formik.touched.state}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        isSearchable
      />

      <Input
        className="mt-20"
        id="zip_code"
        name="zip_code"
        label="Zip Code"
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
