/* eslint-disable react/prop-types */
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import classNames from 'classnames';
import FilterOptionShape from 'frontend/js/lib/propshapes/FilterOptionShape';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import RouterService from 'frontend/js/api/RouterService';
import PaginationContext from 'frontend/js/context/PaginationContext';
import Button from 'frontend/js/components/Button';
import TextInputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import DecoratorService from 'frontend/js/lib/utils/DecoratorService';
import FiltersContext from '../../_Context/Filters';
import useStyles from './useStyles';

function Form({ dateRanges, bidders, submitOnChange, hasSearchByLotVin }) {
  const { filters, setFilters } = useContext(FiltersContext);
  const { setCurrentPage } = useContext(PaginationContext);
  const classes = useStyles();
  const intl = useIntl();

  function handleRefresh(values) {
    const nextFilters = {};

    Object.keys(values).forEach((key) => {
      nextFilters[key] = values[key];
    });
    setFilters(nextFilters);

    RouterService.addQueryParams(nextFilters, { pushToHistory: true });
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bidderCustomerId: filters.bidderCustomerId,
      dateFilter: filters.dateFilter,
      lotOrVin: filters.lotOrVin,
    },
    onSubmit: (values) => {
      setCurrentPage(1);
      handleRefresh(values);
    },
  });

  function triggerOnChange() {
    if (submitOnChange) {
      formik.submitForm();
    }
  }

  const throttledTriggerOnChange = useCallback(DecoratorService.throttle(triggerOnChange, 300), []);

  return (
    <div className={classes.root}>
      {bidders.length > 0 && (
        <div className={classes.filterWrapper}>
          <SelectPlane
            id="bidderCustomerId"
            name="bidderCustomerId"
            label=""
            value={String(formik.values.bidderCustomerId)}
            options={bidders.map((bidder) => ({ ...bidder, value: `${bidder.value}` }))}
            error={formik.errors.bidderCustomerId}
            touched={formik.touched.bidderCustomerId}
            className={classes.select}
            onChange={(name, value) => {
              formik.setFieldValue(name, value);
              triggerOnChange();
              setCurrentPage(1);
            }}
            onBlur={formik.setFieldTouched}
            convertMobileSelectValue={(value) => {
              const parsedValue = parseInt(value, 10);
              return Number.isNaN(parsedValue) ? '' : parsedValue;
            }}
            isSearchable
          />
        </div>
      )}

      <div className={classes.filterWrapper}>
        <SelectPlane
          id="dateFilter"
          name="dateFilter"
          label=""
          className={classes.select}
          value={formik.values.dateFilter}
          options={dateRanges}
          error={formik.errors.dateFilter}
          touched={formik.touched.dateFilter}
          onChange={(name, value) => {
            formik.setFieldValue(name, value);
            triggerOnChange();
          }}
          onBlur={formik.setFieldTouched}
        />
      </div>

      {hasSearchByLotVin && (
        <div className={classes.filterWrapper}>
          <TextInputPlane
            id="lotOrVin"
            name="lotOrVin"
            placeholder={intl.formatMessage({ id: 'shared.label.searchByLotVinOrContainer' })}
            value={formik.values.lotOrVin}
            error={formik.errors.lotOrVin}
            touched={formik.touched.lotOrVin}
            onChange={(name, value) => {
              formik.setFieldValue(name, value.trim());
              throttledTriggerOnChange();
            }}
            onBlur={formik.setFieldTouched}
            className={classes.lotVinInput}
          />
        </div>
      )}

      {!submitOnChange && (
        <Button
          type="submit"
          label={intl.formatMessage({ id: 'shared.label.apply' })}
          onClick={formik.submitForm}
          className={classNames(classes.submitBtn, 'w-100')}
        />
      )}
    </div>
  );
}

Form.defaultProps = {
  dateRanges: [],
  bidders: [],
  submitOnChange: false,
};

Form.propTypes = {
  dateRanges: PropTypes.arrayOf(FilterOptionShape),
  bidders: PropTypes.arrayOf(FilterOptionShape),
  submitOnChange: PropTypes.bool,
};

export default Form;
