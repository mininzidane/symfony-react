import React from 'react';
import classnames from 'classnames';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import Select from 'backend/js/components/Form/Select';
import Input from 'backend/js/components/Form/Input';
import Button from 'backend/js/components/Button';
import useStyles from './useStyles';
import useConsignmentContext from '../../_Context/useConsignmentContext';

const STATUS_OPTIONS = [
  { label: 'Any', id: '' },
  ...Object.values(ConsignmentService.LOT_STATUSES).map((value) => ({ label: value, id: value })),
];

const SALE_TYPE_OPTIONS = [
  { label: 'Any', id: '' },
  { label: 'SYC', id: 'SYC' },
  { label: 'ABM', id: 'ABM' },
];

function FilterBar() {
  const { formikFilter: formik, resetFilter } = useConsignmentContext();
  const classes = useStyles();

  return (
    <form onSubmit={formik.handleSubmit} className={classes.root}>
      <div className={classes.filters}>
        <Select
          id="status"
          name="status"
          placeholder=""
          className={classnames(classes.select, 'mr-10', 'mb-10')}
          value={formik.values.status}
          touched={formik.touched.status}
          error={formik.errors.status}
          onBlur={formik.setFieldTouched}
          onChange={formik.setFieldValue}
          options={STATUS_OPTIONS}
          onChangeAttribute="id"
          formatOptionLabel={(option) => option.label}
        />
        <Input
          id="lot_or_vin"
          name="lot_or_vin"
          placeholder="Lot# or VIN"
          value={formik.values.lot_or_vin}
          touched={formik.touched.lot_or_vin}
          error={formik.errors.lot_or_vin}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          className={classnames(classes.input, 'mr-10', 'mb-10')}
        />
        <Select
          id="sale_type"
          name="sale_type"
          placeholder=""
          className={classnames(classes.select, 'mr-10', 'mb-10')}
          value={formik.values.sale_type}
          touched={formik.touched.sale_type}
          error={formik.errors.sale_type}
          onBlur={formik.setFieldTouched}
          onChange={formik.setFieldValue}
          options={SALE_TYPE_OPTIONS}
          onChangeAttribute="id"
          formatOptionLabel={(option) => option.label}
        />
        <div className="mb-10">
          <Button
            className={classnames('btn btn-primary', 'mr-4')}
            label={
              <>
                <i className="fa fa-filter" /> Apply
              </>
            }
            onClick={formik.submitForm}
          />
          <Button
            isLoading={formik.isSubmitting}
            className="btn btn-default"
            label={
              <>
                <i className="fa fa-undo" /> Reset
              </>
            }
            onClick={resetFilter}
          />
        </div>
      </div>
    </form>
  );
}

export default FilterBar;
