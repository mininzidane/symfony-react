import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import RouterService from 'backend/js/api/RouterService';
import SubmitButton from '../../components/SubmitButton';
import Input from '../../components/Form/Input';
import Button from '../../components/Button';
import Select from '../../components/Form/Select';
import DatePicker from '../../components/DatePicker';
import FormikTickbox from '../../components/Form/FormikTickbox';
import usePaginatedResults from '../../hooks/usePaginatedResults';
import useExternalFormValues from '../../hooks/useExternalFormValues';
import Pagination from '../../components/Pagination';
import FlashError from '../../components/Flash/FlashError';
import CustomerSearchService from '../../api/CustomerSearchService';
import ShippingOrderService from '../../api/ShippingOrderService';
import DateTimeService from '../../lib/utils/DateTimeService';
import ResultsTable from './ResultsTable';

const defaultFormValues = {
  firstName: '',
  lastName: '',
  address: '',
  countries: undefined,
  states: undefined,
  phoneNumber: '',
  membershipType: '',
  registrationStart: '',
  registrationEnd: '',
  lotPurchaseStart: '',
  lotPurchaseEnd: '',
  minimumPurchases: undefined,
  withLotPurchase: false,
  withShippingOrder: false,
  scheduleA: false,
  scheduleA2C: false,
};

const dateFields = ['registrationStart', 'registrationEnd', 'lotPurchaseStart', 'lotPurchaseEnd'];

const boolFields = ['withLotPurchase', 'withShippingOrder'];

function CustomerSearchPage({ countries, states, membershipTypes }) {
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const { formValues, setFormValue, setFormValues } = useExternalFormValues(defaultFormValues);
  const { results, setResults, resetResults } = usePaginatedResults();
  const customerSearchService = new CustomerSearchService();

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      minHeight: '28px',
      borderColor: '#e5e6e7',
      borderRadius: '1px',
      '&:hover, &:focus': {
        borderColor: '#1ab394',
      },
    }),
    menu: (styles) => ({ ...styles, zIndex: '100' }),
  };

  function handleReset() {
    setFormValues(defaultFormValues);
    resetResults();
    RouterService.replaceQueryParams({}, true);
  }

  function resetGeneralError() {
    setGeneralError('');
  }

  function isStateSelectDisabled(selectedCountries) {
    return Boolean(
      Array.isArray(selectedCountries) &&
        !selectedCountries.includes(ShippingOrderService.CountryIdUS) &&
        !selectedCountries.includes('us'),
    );
  }

  function buildSearchPayload(values = {}) {
    return Object.keys(values).reduce((acc, cur) => {
      const value = values[cur];
      if (value instanceof Date) {
        acc[cur] = DateTimeService.format(value);
      } else if (value) {
        acc[cur] = value;
      }

      return acc;
    }, {});
  }

  function handleValidate(values) {
    let error = '';
    const errors = {};
    const test = Boolean(
      values.firstName ||
        values.lastName ||
        values.address ||
        values.countries ||
        values.states ||
        values.phoneNumber ||
        values.membershipType ||
        values.registrationStart ||
        values.registrationEnd ||
        values.lotPurchaseStart ||
        values.lotPurchaseEnd ||
        values.minimumPurchases ||
        values.withLotPurchase ||
        values.withShippingOrder ||
        values.scheduleA ||
        values.scheduleA2C,
    );

    if (!test) {
      errors.general = 'disable';
      error = 'Please select at least one field.';
    }

    setGeneralError(error);

    return errors;
  }

  async function handleDownload() {
    setDownloading(true);
    resetGeneralError();

    try {
      const payload = buildSearchPayload(formValues);
      await customerSearchService.download(payload);
    } catch (e) {
      setGeneralError('An error occurred while processing download.');
    }

    setDownloading(false);
  }

  async function updateResults(params) {
    setLoading(true);
    resetGeneralError();

    try {
      RouterService.replaceQueryParams(params, true);

      const response = await customerSearchService.search(params);
      setResults(response);
    } catch (e) {
      setGeneralError('An error occurred while processing this request.');
      resetResults();
    }

    setLoading(false);
  }

  async function updatePage(page = 1) {
    const params = buildSearchPayload(formValues);
    params.page = page;

    window.scroll(0, 0);
    await updateResults(params);
  }

  async function submit(values) {
    delete values.general;
    const payload = buildSearchPayload(values);

    resetResults();
    await updateResults(payload, 1);
  }

  async function initFromQueryParams() {
    const queryParams = RouterService.getCurrentQueryParams();
    if (queryParams && Object.keys(queryParams).length) {
      Object.keys(queryParams).forEach((key) => {
        const value = queryParams[key];
        if (dateFields.includes(key)) {
          queryParams[key] = new Date(value);
        }

        if (boolFields.includes(key)) {
          queryParams[key] = true;
        }
      });

      const payload = buildSearchPayload(queryParams);
      updateResults(payload);

      delete queryParams.page;
      setFormValues(queryParams);
    }
  }

  useEffect(() => {
    (async () => {
      await initFromQueryParams();
    })();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>Customer Search Filters</h5>
            </div>
            <div className="ibox-content">
              <Formik
                initialValues={{
                  ...formValues,
                  general: '',
                }}
                validate={handleValidate}
                enableReinitialize
                onSubmit={submit}
              >
                {({ values, errors, touched, setFieldValue, setFieldTouched, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="row">{generalError && generalError && <FlashError message={generalError} />}</div>

                    <div className="row">
                      <div className="col-lg-2 col-md-2">
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          value={values.firstName}
                          error={errors.firstName}
                          touched={touched.firstName}
                          onBlur={setFieldTouched}
                          onChange={setFormValue}
                        />
                      </div>
                      <div className="col-lg-2 col-md-2">
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          value={values.lastName}
                          error={errors.lastName}
                          touched={touched.lastName}
                          onBlur={setFieldTouched}
                          onChange={setFormValue}
                        />
                      </div>

                      <div className="col-lg-2 col-md-2">
                        <Input
                          id="address"
                          name="address"
                          placeholder="Address"
                          value={values.address}
                          error={errors.address}
                          touched={touched.address}
                          onBlur={setFieldTouched}
                          onChange={setFormValue}
                        />
                      </div>

                      <div className="col-lg-2 col-md-2">
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Phone"
                          value={values.phoneNumber}
                          error={errors.phoneNumber}
                          touched={touched.phoneNumber}
                          onBlur={setFieldTouched}
                          onChange={setFormValue}
                        />
                      </div>

                      <div className="col-lg-3 col-md-3">
                        <Select
                          id="membershipType"
                          name="membershipType"
                          placeholder="Membership Type"
                          value={values.membershipType}
                          onChange={setFormValue}
                          onBlur={setFieldTouched}
                          options={membershipTypes}
                          styles={selectStyles}
                          isSearchable
                          isClearable
                          isMulti
                          className="react-select-hollow"
                          onChangeAttribute="id"
                          formatOptionLabel={(value) => value.name}
                        />
                      </div>
                    </div>

                    <div className="row m-t-md">
                      <div className="col-lg-3 col-md-3">
                        <Select
                          id="countries"
                          name="countries"
                          placeholder="Country"
                          value={values.countries}
                          onChange={setFormValue}
                          onBlur={setFieldTouched}
                          options={countries}
                          styles={selectStyles}
                          isSearchable
                          isClearable
                          isMulti
                          className="react-select-hollow"
                          onChangeAttribute="id"
                          formatOptionLabel={(value) => value.name}
                        />
                      </div>

                      <div className="col-lg-3 col-md-3">
                        <Select
                          id="states"
                          name="states"
                          placeholder="State"
                          value={values.states}
                          onChange={setFormValue}
                          onBlur={setFieldTouched}
                          options={states}
                          styles={selectStyles}
                          disabled={isStateSelectDisabled(values.countries)}
                          isSearchable
                          isClearable
                          isMulti
                          className="react-select-hollow"
                          onChangeAttribute="id"
                          formatOptionLabel={(value) => value.name}
                        />
                      </div>

                      <div className="col-lg-2 col-md-2">
                        <DatePicker
                          placeholder="Reg Start"
                          value={values.registrationStart}
                          onChange={(value) => {
                            setFormValue('registrationStart', value);
                            setFieldValue('registrationStart', value);
                          }}
                          onBlur={() => setFieldTouched('registrationStart', true)}
                        />
                      </div>

                      <div className="col-lg-2 col-md-2">
                        <DatePicker
                          placeholder="Reg End"
                          value={values.registrationEnd}
                          onChange={(value) => {
                            setFormValue('registrationEnd', value);
                            setFieldValue('registrationEnd', value);
                          }}
                          onBlur={() => setFieldTouched('registrationEnd', true)}
                        />
                      </div>
                    </div>

                    <div className="row m-t-md">
                      <div className="col-lg-2 col-md-2">
                        <DatePicker
                          placeholder="LP Start"
                          value={values.lotPurchaseStart}
                          onChange={(value) => {
                            setFormValue('lotPurchaseStart', value);
                            setFieldValue('lotPurchaseStart', value);
                          }}
                          onBlur={() => setFieldTouched('lotPurchaseStart', true)}
                        />
                      </div>

                      <div className="col-lg-2 col-md-2">
                        <DatePicker
                          placeholder="LP End"
                          value={values.lotPurchaseEnd}
                          onChange={(value) => {
                            setFormValue('lotPurchaseEnd', value);
                            setFieldValue('lotPurchaseEnd', value);
                          }}
                          onBlur={() => setFieldTouched('lotPurchaseEnd', true)}
                        />
                      </div>

                      <div className="col-lg-2 col-md-2">
                        <FormikTickbox
                          id="withLotPurchase"
                          name="withLotPurchase"
                          onChange={setFormValue}
                          value={values.withLotPurchase}
                        >
                          With Vehicle Purchase
                        </FormikTickbox>
                      </div>

                      <div className="col-lg-2 col-md-2">
                        <FormikTickbox
                          id="withShippingOrder"
                          name="withShippingOrder"
                          onChange={setFormValue}
                          value={values.withShippingOrder}
                        >
                          With Shipping Purchase
                        </FormikTickbox>
                      </div>

                      <div className="col-lg-2 col-md-2">
                        <Input
                          id="minimumPurchases"
                          name="minimumPurchases"
                          type="number"
                          placeholder="More than ... Purchases"
                          value={values.minimumPurchases}
                          error={errors.minimumPurchases}
                          touched={touched.minimumPurchases}
                          onBlur={setFieldTouched}
                          onChange={setFormValue}
                        />
                      </div>
                    </div>

                    <div className="row m-t-md">
                      <div className="col-md-4">
                        <div>
                          <SubmitButton
                            label="Update"
                            className="btn btn-primary m-r-sm"
                            disabled={loading || downloading}
                          />
                          <Button
                            label="Download"
                            className="btn btn-primary m-r-sm"
                            onClick={handleDownload}
                            disabled={loading || downloading}
                          />
                          <Button
                            label="Reset"
                            className="btn btn-primary"
                            onClick={handleReset}
                            disabled={loading || downloading}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <FormikTickbox id="scheduleA" name="scheduleA" onChange={setFormValue} value={values.scheduleA}>
                          Schedule A
                        </FormikTickbox>
                      </div>
                      <div className="col-md-2">
                        <FormikTickbox
                          id="scheduleA2C"
                          name="scheduleA2C"
                          onChange={setFormValue}
                          value={values.scheduleA2C}
                        >
                          Schedule A to C
                        </FormikTickbox>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="ibox float-e-margins">
          <div className="ibox-content table-responsive">
            {results.data.length && !loading ? (
              <>
                <div>
                  <h2>Total Results: {results.total}</h2>
                </div>
                <div>
                  <ResultsTable results={results} />
                </div>
                <div>
                  <Pagination
                    onPageUpdate={updatePage}
                    pageSize={results.size}
                    numResults={results.total}
                    currentPage={results.currentPage}
                  />
                </div>
              </>
            ) : (
              <>{loading ? 'loading...' : 'No Results'}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

CustomerSearchPage.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  ),
  states: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  membershipTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
};

CustomerSearchPage.defaultProps = {
  countries: [],
  states: [],
  membershipTypes: [],
};

const $el = document.getElementById('customer-search-page');
const countries = JSON.parse($el.getAttribute('data-countries') || '');
const states = JSON.parse($el.getAttribute('data-states') || '');
const membershipTypes = JSON.parse($el.getAttribute('data-membership-types') || '');
ReactDOM.render(<CustomerSearchPage countries={countries} states={states} membershipTypes={membershipTypes} />, $el);
