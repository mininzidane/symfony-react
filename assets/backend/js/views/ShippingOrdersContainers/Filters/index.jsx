import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import SubmitButton from 'backend/js/components/SubmitButton';
import Input from 'backend/js/components/Form/Input';
import FormikDateSelector from 'backend/js/components/Form/FormikDateSelector';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import Select from 'backend/js/components/Form/Select';
import { useFiltersContext } from './Context';
import useStyles from './useStyles';

function Filters() {
  const [{ filters, setFilters }] = useFiltersContext();
  const classes = useStyles();
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    ShippingOrderService.getSearchChoices().then((response) => {
      setChoices(response);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      container: filters.container || '',
      destinationCountry: '',
      usPort: '',
      placedAtStart: null,
      placedAtEnd: null,
      etaStart: null,
      etaEnd: null,
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      values.placedAtStart = values.placedAtStart ? new Date(values.placedAtStart).toLocaleDateString('en-US') : '';
      values.placedAtEnd = values.placedAtEnd ? new Date(values.placedAtEnd).toLocaleDateString('en-US') : '';
      values.etaStart = values.etaStart ? new Date(values.etaStart).toLocaleDateString('en-US') : '';
      values.etaEnd = values.etaEnd ? new Date(values.etaEnd).toLocaleDateString('en-US') : '';

      setFilters(values);

      setSubmitting(false);
    },
  });

  return (
    <div className="row">
      <div className="col-md-2">
        <Input
          type="text"
          id="container"
          name="container"
          value={formik.values.container}
          onChange={formik.setFieldValue}
          placeholder="Search via Container #"
          className={classes.input}
          onBlur={() => {}}
        />
      </div>

      <div className="col-md-2">
        <Select
          type="text"
          id="destinationCountry"
          name="destinationCountry"
          value={formik.values.destinationCountry}
          options={choices?.destinationCountries || []}
          onChange={formik.setFieldValue}
          placeholder="Destination Country"
          className={classes.input}
          onBlur={() => {}}
          isSearchable
          isClearable
        />
      </div>

      <div className="col-md-2">
        <Select
          type="text"
          id="usPort"
          name="usPort"
          value={formik.values.usPort}
          options={choices?.usPorts || []}
          onChange={formik.setFieldValue}
          placeholder="Port of Loading"
          className={classes.input}
          onBlur={() => {}}
          isSearchable
          isClearable
        />
      </div>

      <div className="col-md-1">
        <FormikDateSelector
          id="placedAtStart"
          name="placedAtStart"
          selected={formik.values.placedAtStart}
          onChange={formik.setFieldValue}
          placeholder="Order Placed From"
          className={classes.input}
          onBlur={() => {}}
        />
      </div>

      <div className="col-md-1">
        <FormikDateSelector
          id="placedAtEnd"
          name="placedAtEnd"
          selected={formik.values.placedAtEnd}
          onChange={formik.setFieldValue}
          placeholder="Order Placed To"
          className={classes.input}
          onBlur={() => {}}
        />
      </div>

      <div className="col-md-1">
        <FormikDateSelector
          id="etaStart"
          name="etaStart"
          selected={formik.values.etaStart}
          onChange={formik.setFieldValue}
          placeholder="Arrival Date From"
          className={classes.input}
          onBlur={() => {}}
        />
      </div>

      <div className="col-md-1">
        <FormikDateSelector
          id="etaEnd"
          name="etaEnd"
          selected={formik.values.etaEnd}
          onChange={formik.setFieldValue}
          placeholder="Arrival Date To"
          className={classes.input}
          onBlur={() => {}}
        />
      </div>

      <div className="col-md-2">
        <SubmitButton onClick={formik.submitForm} label="Submit" className="btn-primary" />
      </div>
    </div>
  );
}

export default Filters;
