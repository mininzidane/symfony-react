import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik } from 'formik';
import RouterService from 'backend/js/api/RouterService';
import Input from 'backend/js/components/Form/Input';
import useLocations from 'backend/js/hooks/useLocations';
import QueryClientProvider from 'backend/js/providers/ReactQueryProvider';
import useDamages from 'backend/js/hooks/useDamages';
import PriceHistoryService from '../../api/PriceHistoryService';
import LotService from '../../api/LotService';
import Select from '../../components/Form/Select';
import SubmitButton from '../../components/SubmitButton';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import FlashError from '../../components/Flash/FlashError';
import DateTimeService from '../../lib/utils/DateTimeService';
import usePaginatedResults from '../../hooks/usePaginatedResults';
import NumberService from '../../lib/utils/NumberService';
import DatePicker from '../../components/DatePicker';
import useExternalFormValues from '../../hooks/useExternalFormValues';
import ResultsTable from './ResultsTable';
import PriceHistoryFormSchema from './PriceHistoryFormSchema';

const defaultFormValues = {
  make: '',
  model: '',
  yearFrom: '',
  yearTo: '',
  titleCategory: '',
  fromSaleDate: '',
  toSaleDate: '',
  sort: 'saleDate',
  order: 'desc',
  locations: '',
  damages: '',
  mileageFrom: '',
  mileageTo: '',
};

const dateFields = ['fromSaleDate', 'toSaleDate'];

function PriceHistoryPage() {
  const [isLoading, setLoading] = useState(false);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [yearsFrom, setYearsFrom] = useState([]);
  const [yearsTo, setYearsTo] = useState([]);
  const { formValues, setFormValues } = useExternalFormValues(defaultFormValues);
  const { results, setResults, resetResults } = usePaginatedResults();
  const [error, setError] = useState(null);
  const [bidAvg, setBidAvg] = useState(0);
  const { formatCurrency } = NumberService;
  const [locations, locationsLoading] = useLocations();
  const [damages, damagesLoading] = useDamages();

  const titleCategories = Object.keys(LotService.titleCategories).reduce((acc, cur) => {
    const option = { value: cur, label: LotService.titleCategories[cur] };

    acc.push(option);
    return acc;
  }, []);

  const priceHistoryService = new PriceHistoryService();

  function updateFieldValue(name, value) {
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
  }

  function updateFieldValues(updatedFields = {}) {
    const updatedValues = { ...formValues, ...updatedFields };
    setFormValues(updatedValues);
  }

  async function getMakes() {
    try {
      const { makes: makeFilters } = await priceHistoryService.getSoldMakes();
      setMakes(makeFilters);
    } catch (e) {
      setError('An Error occurred while loading makes.');
    }
  }

  async function getModelsByMake() {
    try {
      const { make } = formValues;
      const { models: modelFilters } = await priceHistoryService.getSoldModelsByMake(make);
      setModels(modelFilters);
    } catch (e) {
      setError('An Error occurred while loading models.');
    }
  }

  async function getYears() {
    try {
      const { make, model } = formValues;
      const { years: yearFilters } = await priceHistoryService.getSoldYears(make, model);
      setYears(yearFilters);
      setYearsFrom(yearFilters);
      setYearsTo(yearFilters);
    } catch (e) {
      /** Ignore */
    }
  }

  async function updateResults(values = {}, page = 1) {
    setError('');
    setLoading(true);

    const payload = { ...values, page };
    try {
      const response = await priceHistoryService.getPriceHistory(payload);
      setResults(response);
    } catch (e) {
      setError('An Error occurred while retrieving the results.');
    }

    setLoading(false);
  }

  function buildSearchPayload(values = {}) {
    return Object.keys(values).reduce((acc, cur) => {
      const value = values[cur];
      if (value instanceof Date) {
        acc[cur] = DateTimeService.format(value, 'Y-MM-dd');
      } else if (value) {
        acc[cur] = value;
      }

      return acc;
    }, {});
  }

  function reset() {
    RouterService.replaceQueryParams({}, true);
    resetResults();
    setFormValues(defaultFormValues);
    setBidAvg(undefined);
  }

  async function calculateBidAvg(values) {
    setBidAvg(null);

    try {
      const { bidAverage } = await priceHistoryService.getBidAvg(values);

      setBidAvg(bidAverage);
    } catch (e) {
      /** Ignore */
    }
  }

  async function submit(values) {
    const payload = buildSearchPayload(values);

    resetResults();
    RouterService.replaceQueryParams(payload, true);
    await updateResults(payload);
    await calculateBidAvg(payload);
  }

  async function download() {
    setError('');
    setLoading(true);

    try {
      const payload = buildSearchPayload(formValues);
      await priceHistoryService.downloadPriceHistory(payload);
    } catch (e) {
      setError('Unable to process download request.');
    }

    setLoading(false);
  }

  async function updatePage(updatedPage = 1) {
    window.scroll(0, 0);

    const payload = buildSearchPayload(formValues);
    await updateResults(payload, updatedPage);
  }

  async function initFromQueryParams() {
    const queryParams = RouterService.getCurrentQueryParams();
    if (queryParams && Object.keys(queryParams).length) {
      Object.keys(queryParams).forEach((key) => {
        const value = queryParams[key];
        if (dateFields.includes(key)) {
          queryParams[key] = new Date(value);
        }
      });

      updateResults(queryParams);
      calculateBidAvg(queryParams);

      delete queryParams.page;
      setFormValues(queryParams);
    }
  }

  async function handleSort(updatedSort, updatedOrder) {
    const updatedFormValues = { ...formValues, sort: updatedSort, order: updatedOrder };
    setFormValues(updatedFormValues);

    const payload = buildSearchPayload(updatedFormValues);
    RouterService.replaceQueryParams(payload, true);
    await updateResults(payload);
  }

  useEffect(() => {
    (async () => {
      await getMakes();
      await initFromQueryParams();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      updateFieldValues({
        model: '',
        yearFrom: '',
        yearTo: '',
      });

      if (formValues.make) {
        await getModelsByMake();
      }
    })();
  }, [formValues.make]);

  useEffect(() => {
    (async () => {
      updateFieldValues({
        yearFrom: '',
        yearTo: '',
      });

      if (formValues.model) {
        await getYears();
      }
    })();
  }, [formValues.model]);

  useEffect(() => {
    const { yearFrom, yearTo } = formValues;
    if (yearFrom) {
      const filteredYears = years.filter((year) => parseInt(year.key, 10) >= parseInt(yearFrom, 10)) || [];
      setYearsTo(filteredYears);

      if (yearTo && yearFrom > yearTo) {
        updateFieldValue('yearTo', '');
      }
    }
  }, [formValues.yearFrom]);

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      paddingLeft: '80px',
      minHeight: '40px',
      borderColor: '#B7B5B3',
      borderRadius: 0,
    }),
    menu: (styles) => ({ ...styles, zIndex: '100' }),
  };

  return (
    <div className="price-history-page">
      {error && <FlashError message={error} />}
      <Formik initialValues={formValues} enableReinitialize onSubmit={submit} validationSchema={PriceHistoryFormSchema}>
        {({ values, touched, errors, setFieldTouched, handleSubmit }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div className="section">
                <div className="d-flex jc-sb f-wrap-sm">
                  <Select
                    id="make"
                    name="make"
                    label="Make"
                    value={values.make}
                    touched={touched.make}
                    error={errors.make}
                    className="react-select-hollow required m-b-sm m-r-sm"
                    onBlur={setFieldTouched}
                    onChange={updateFieldValue}
                    onChangeAttribute="key"
                    options={makes}
                    disabled={!makes.length}
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />

                  <Select
                    id="model"
                    name="model"
                    label="Model"
                    value={values.model}
                    touched={touched.model}
                    error={errors.model}
                    className="react-select-hollow required m-b-sm m-r-sm"
                    onBlur={setFieldTouched}
                    onChange={updateFieldValue}
                    onChangeAttribute="key"
                    options={models}
                    disabled={!models.length}
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                </div>
              </div>
              <div className="section">
                <div className="d-flex jc-sb f-wrap-sm">
                  <Select
                    id="yearFrom"
                    name="yearFrom"
                    label="Year From"
                    value={values.yearFrom}
                    touched={touched.yearFrom}
                    error={errors.yearFrom}
                    className="react-select-hollow m-b-sm m-r-sm"
                    onBlur={setFieldTouched}
                    onChange={updateFieldValue}
                    onChangeAttribute="key"
                    options={yearsFrom}
                    disabled={!yearsFrom.length}
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />

                  <Select
                    id="yearTo"
                    name="yearTo"
                    label="Year To"
                    value={values.yearTo}
                    touched={touched.yearTo}
                    error={errors.yearTo}
                    className="react-select-hollow m-b-sm m-r-sm"
                    onChangeAttribute="key"
                    onBlur={setFieldTouched}
                    onChange={updateFieldValue}
                    options={yearsTo}
                    disabled={!yearsTo.length}
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />

                  <Select
                    id="titleCategory"
                    name="titleCategory"
                    label="Title Type"
                    value={values.titleCategory}
                    touched={touched.titleCategory}
                    error={errors.titleCategory}
                    className="react-select-hollow m-b-sm m-r-sm"
                    onBlur={setFieldTouched}
                    onChange={updateFieldValue}
                    options={titleCategories}
                    disabled={!titleCategories.length}
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                </div>
              </div>

              <div className="section">
                <div className="d-flex jc-sb f-wrap-sm">
                  <Select
                    id="locations"
                    name="locations"
                    label="locations"
                    value={values.locations}
                    touched={touched.locations}
                    error={errors.locations}
                    className="react-select-hollow m-b-sm m-r-sm"
                    onBlur={setFieldTouched}
                    onChange={updateFieldValue}
                    onChangeAttribute="key"
                    options={locations.map((location) => ({ key: location.id, label: location.name }))}
                    disabled={locationsLoading || !locations.length}
                    isSearchable
                    isClearable
                    styles={selectStyles}
                    isMulti
                  />

                  <Select
                    id="damages"
                    name="damages"
                    label="Damages"
                    value={values.damages}
                    touched={touched.damages}
                    error={errors.damages}
                    className="react-select-hollow m-b-sm m-r-sm"
                    onBlur={setFieldTouched}
                    onChange={updateFieldValue}
                    onChangeAttribute="key"
                    options={damages.map((damage) => ({ key: damage, label: damage }))}
                    disabled={damagesLoading || !damages.length}
                    isSearchable
                    isClearable
                    styles={selectStyles}
                    isMulti
                  />
                </div>
              </div>

              <div className="section">
                <div className="d-flex ai-ct jc-sb f-wrap-sm">
                  <div className="d-flex">
                    <div className="m-r-sm">
                      <DatePicker
                        placeholder="Sale Start"
                        value={values.fromSaleDate}
                        onChange={(value) => {
                          updateFieldValue('fromSaleDate', value);
                        }}
                        onBlur={() => setFieldTouched('fromSaleDate', true)}
                      />
                    </div>
                    <div className="m-r-sm">
                      <DatePicker
                        placeholder="Sale End"
                        value={values.toSaleDate}
                        onChange={(value) => {
                          updateFieldValue('toSaleDate', value);
                        }}
                        onBlur={() => setFieldTouched('toSaleDate')}
                      />
                    </div>
                    <div className="m-r-sm">
                      <Input
                        id="mileageFrom"
                        name="mileageFrom"
                        placeholder="Mileage From"
                        value={values.mileageFrom}
                        error={errors.mileageFrom}
                        touched={touched.mileageFrom}
                        onBlur={setFieldTouched}
                        onChange={updateFieldValue}
                      />
                    </div>
                    <div>
                      <Input
                        id="mileageTo"
                        name="mileageTo"
                        placeholder="Mileage To"
                        value={values.mileageTo}
                        error={errors.mileageTo}
                        touched={touched.mileageTo}
                        onBlur={setFieldTouched}
                        onChange={updateFieldValue}
                      />
                    </div>
                  </div>
                  <div className="d-flex">
                    <SubmitButton label="Update" className="btn btn-primary m-r-sm" disabled={isLoading} />
                    <Button label="Reset" className="m-r-sm" disabled={isLoading} onClick={reset} />
                    <Button label="Download" disabled={isLoading || !results.data.length} onClick={download} />
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </Formik>
      <hr />

      {results && results.data.length > 0 ? (
        <>
          <div>
            <h2>Total Results: {results.total}</h2>
          </div>
          <div>
            <h3>Bid Average: {bidAvg > 0 ? formatCurrency(bidAvg) : '-'}</h3>
          </div>
          <div>
            <ResultsTable results={results} sort={formValues.sort} order={formValues.order} onSort={handleSort} />
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
        <>{isLoading ? 'Loading...' : 'No Results'}</>
      )}
    </div>
  );
}

const $el = document.getElementById('price-history-page');
ReactDOM.render(
  <QueryClientProvider>
    <PriceHistoryPage />
  </QueryClientProvider>,
  $el,
);
