import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import Input from 'backend/js/components/Form/Input';
import Button from 'backend/js/components/Button';
import SubmitButton from 'backend/js/components/SubmitButton';
import PhoneInputPlane from 'backend/js/components/Form/PhoneInputPlane';
import Select from 'backend/js/components/Form/Select';
import FormikDropzone from 'backend/js/components/Form/FormikDropzone';
import BootstrapService from 'backend/js/api/BootstrapService';
import CountryService from 'backend/js/api/CountryService';
import CustomerParentService from 'backend/js/api/CustomerParentService';
import CustomerSearchService from 'backend/js/api/CustomerSearchService';
import CustomerService from 'backend/js/api/CustomerService';
import RouterService from 'backend/js/api/RouterService';
import CustomerParentShape from 'backend/js/lib/propshapes/CustomerParentShape';
import BidderForm from 'frontend/js/views/Account/BrokerManagerPage/PageContent/AddNewBidder/Form/BidderForm';
import useBidderFormContext from 'frontend/js/views/Account/BrokerManagerPage/_Context/useBidderFormContext';
import DocumentsUpload from 'frontend/js/views/Account/BrokerManagerPage/PageContent/AddNewBidder/Summary/DocumentsUpload';
import { SortProvider } from 'frontend/js/context/SortContext';
import Submit from 'backend/js/views/CustomerParentPage/BidderForm/Submit';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import PaginationContext from 'frontend/js/context/PaginationContext';
import CustomerParentFormValidationSchema from './CustomerParentFormValidationSchema';
import Terms from './Terms';
import Notes from './Notes';
import BrokerSettings from './BrokerSettings';
import Files from './Files';
import BrokerName from './BrokerName';
import BiddersTable from './BiddersTable';
import Stats from './Stats';
import sortOptions from './BiddersTable/sortOptions';
import CustomerSearch from '../../_Shared/Forms/CustomerSearch';

function prepareCustomers(customersList) {
  if (RouterService.getCurrentQueryParams()?.sort || customersList.length === 0) {
    return customersList;
  }
  const result = [];
  let admin = null;
  customersList.forEach((customer) => {
    if (customer.isParentAdmin) {
      admin = customer;
    } else {
      result.push(customer);
    }
  });

  if (!admin) {
    return result;
  }

  return [admin, ...result];
}

function CustomerParentForm({ customerParent, onSubmitSuccess, onSubmitError, isAdmin }) {
  const { setCurrentPage, setTotal, setItemsPerPage } = useContext(PaginationContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [autocompleteCustomers, setAutocompleteCustomers] = useState([]);
  const [selectedAutocompleteCustomer, setSelectedAutocompleteCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [addedCustomers, setAddedCustomers] = useState([]);
  const [deletedCustomers, setDeletedCustomers] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [disableAdminFields, setDisableAdminFields] = useState(false);
  const [brokerName, setBrokerName] = useState(customerParent?.name);
  const [brokerSettings, setBrokerSettings] = useState({
    showAllAssignedBidders: get(customerParent, 'showAllAssignedBidders', false),
    useBrokerAdminForInvoices: get(customerParent, 'useBrokerAdminForInvoices', false),
    ccBrokerAdminOnPurchaseEmails: get(customerParent, 'ccBrokerAdminOnPurchaseEmails', false),
    displayOnlyLotPurchase: get(customerParent, 'displayOnlyLotPurchase', false),
    preferredCountry: customerParent?.preferredCountry || null,
    preferredDestination: customerParent?.preferredDestination || null,
    billTransactionFeeToBrokerAdmin: get(customerParent, 'billTransactionFeeToBrokerAdmin', false),
    allowToChooseSchedule: get(customerParent, 'allowToChooseSchedule', false),
    displayIaaInventory: get(customerParent, 'displayIaaInventory', false),
    allowToSetFixedBP: customerParent?.allowToSetFixedBP || false,
    allowToChangeTransactionFee: customerParent?.allowToChangeTransactionFee || false,
    allowToAddTowingMarkup: get(customerParent, 'allowToAddTowingMarkup', false),
    disableStorageEmails: get(customerParent, 'disableStorageEmails', false),
    autoApplyEnabled: get(customerParent, 'autoApplyEnabled', true),
    iaaInventoryStats: get(customerParent, 'iaaInventoryStats', ''),
    mandatoryInsurance: customerParent?.mandatoryInsurance,
    shippingLatePaymentFee: get(customerParent, 'shippingLatePaymentFee', ''),
    shippingLatePaymentFeeStats: get(customerParent, 'shippingLatePaymentFeeStats', ''),
    shippingPeakSeasonFee: get(customerParent, 'shippingPeakSeasonFee', true),
  });
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  const currentQueryParams = RouterService.getCurrentQueryParams();
  const supportedLocales = BootstrapService.getAppValue('locales', []);
  const customerService = new CustomerService();
  const customerParentService = new CustomerParentService();
  const customerSearchService = new CustomerSearchService();
  const countryService = new CountryService();
  const edit = Boolean(customerParent);
  const { form, content } = useBidderFormContext();

  const locales = supportedLocales.reduce((acc, curr) => {
    acc.push({ label: curr, value: curr });
    return acc;
  }, []);

  async function handleBrokerSubmit(payload) {
    if (edit) {
      const { id } = customerParent;
      return customerParentService.updateCustomerParent(id, payload);
    }

    return customerParentService.createCustomerParent(payload);
  }

  async function handleIdDocumentUpload(customerId, documents) {
    try {
      const formData = new FormData();
      for (let i = 0; i < documents.length; i++) {
        formData.append(`image_${i}`, documents[i]);
      }

      await customerService.uploadId(customerId, formData);
    } catch (e) {
      /** Ignore */
    }
  }

  async function onFormSubmit(values, { setSubmitting, setFieldError, resetForm }) {
    if (!brokerName || brokerName.length > 50) {
      setErrorMessage('Broker name is too long (max 50 characters) or empty');
      return;
    }
    setSubmitting(true);
    setErrorMessage('');

    let preparedValues = values;
    preparedValues.addedCustomers = addedCustomers;
    preparedValues.deletedCustomers = deletedCustomers;
    preparedValues.name = brokerName;
    preparedValues = { ...values, ...brokerSettings };
    delete preparedValues.customers;

    try {
      const { customerParent: customerParentResponse, newAdminId } = await handleBrokerSubmit(preparedValues);
      if (newAdminId && preparedValues.adminImages.length) {
        await handleIdDocumentUpload(newAdminId, preparedValues.adminImages);
      }

      if (!edit) {
        window.location.href = RouterService.getRoute('backendBrokerEdit', null, { id: customerParentResponse.id });
        return;
      }

      resetForm({
        values: {
          adminEmail: '',
          adminFirstName: '',
          adminLastName: '',
          adminCountry: '',
          adminState: '',
          adminAddress: '',
          adminCity: '',
          adminZip: '',
          adminPhone: '',
          adminLocale: '',
          adminCompany: '',
          adminImages: [],
          emailOnRegistration: true,
          displayIaaInventory: false,
        },
      });
      onSubmitSuccess(customerParentResponse);
    } catch (serverError) {
      let messages = 'An error occurred while processing this request.';
      if (serverError) {
        const errors = get(serverError, 'response.data.errors', {});
        let mapped = false;
        if (errors) {
          Object.keys(errors).forEach((key) => {
            if (key !== 'error') {
              setFieldError(key, errors[key]);
              mapped = true;
            }
          });
        }

        if (!mapped) {
          messages = Object.values(errors).join(' ');
        }
      }

      onSubmitError(messages);
    }

    setSubmitting(false);
  }

  async function fetchCustomerByEmail(email) {
    try {
      const { customer } = await customerSearchService.searchByEmail(encodeURIComponent(email));

      return customer;
    } catch (e) {
      //  Ignore
    }

    return null;
  }

  function getCustomers() {
    return new Set(customers);
  }

  function deleteCustomer(customer) {
    const customersSet = getCustomers();
    customersSet.delete(customer);
    setCustomers(Array.from(customersSet));
    setDeletedCustomers([...deletedCustomers, customer]);
  }

  function addCustomer() {
    setErrorMessage('');
    if (!selectedAutocompleteCustomer) {
      setErrorMessage('Please select valid customer from the dropdown.');
      return;
    }

    setAddedCustomers([...addedCustomers, selectedAutocompleteCustomer]);
    setCustomers(Array.from(getCustomers().add(selectedAutocompleteCustomer)));
    setSelectedAutocompleteCustomer(null);
  }

  async function loadCountries() {
    try {
      const { data } = await countryService.getCountries();
      setCountries(data.countries);
    } catch (e) {
      setErrorMessage('Unable to load countries, please refresh and try again');
    }
  }

  async function loadStates(countryId) {
    try {
      const { data } = await countryService.getStates(countryId);
      setStates(data.states);
    } catch (e) {
      /** Ignore */
    }
  }

  async function fetchCustomers(field = null, order = null, page = 1) {
    setLoadingCustomers(true);
    try {
      const data = await customerParentService.getCustomers(customerParent.id, field, order, page);
      setCustomers(prepareCustomers(data.data));
      setTotal(data.total);
      setItemsPerPage(data.size);
      setCurrentPage(data.currentPage);
      setBrokerSettings((values) => ({
        ...values,
        ...{ iaaInventoryStats: data.iaaInventoryStats, shippingLatePaymentFeeStats: data.shippingLatePaymentFeeStats },
      }));
    } catch (e) {
      /** Ignore */
    }
    setLoadingCustomers(false);
  }

  useEffect(() => {
    (async () => {
      await loadCountries();
    })();
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [customerParent]);

  function onChangeBrokerSettings(newValues) {
    setBrokerSettings((values) => ({ ...values, ...newValues }));
  }

  function onChangeBrokerName(value) {
    setBrokerName(value);
  }

  return (
    <>
      <form method="get">
        <input type="hidden" name="sort" id="sort" value={currentQueryParams?.sort} />
        <input type="hidden" name="sortOrder" id="sortOrder" value={currentQueryParams?.sortOrder} />
      </form>

      {errorMessage && (
        <div className="m-b-lg">
          <div className="row m-b-lg">
            <div className="col-lg-12 text-danger mb-b-sm">{errorMessage}</div>
          </div>
        </div>
      )}

      {content.isFormShown && (
        <div className="m-b-lg">
          <h3>Create Bidder</h3>
          <BidderForm setForm={form.set} customer={customerParent.adminCustomer} />
          <DocumentsUpload setForm={form.set} />
          <Submit
            ctaLabel="Create Bidder"
            additionalParams={{ brokerId: customerParent.id }}
            customer={customerParent.adminCustomer}
          />
        </div>
      )}

      <div className="row">
        <div className={customerParent ? 'col-md-4' : 'col-md-12'}>
          <h1>
            {customerParent ? (
              <BrokerName id={customerParent.id} name={customerParent.name} onChange={onChangeBrokerName} />
            ) : (
              <>
                Create Broker
                <BrokerName onChange={onChangeBrokerName} />
              </>
            )}
          </h1>
          <div className="m-b-lg">
            <BrokerSettings
              brokerSettings={brokerSettings}
              setErrorMessage={setErrorMessage}
              onChange={onChangeBrokerSettings}
            />
          </div>
        </div>
        {customerParent && (
          <>
            <div className="col-md-4">
              <Terms customerParent={customerParent} allowToAdd={isAdmin} />
              <Files customerParent={customerParent} allowToUpload={isAdmin} />
              <Stats customerParent={customerParent} />
            </div>
            <div className="col-md-4">
              <Notes customerParent={customerParent} allowToAdd={isAdmin} />
            </div>
          </>
        )}
      </div>

      <Formik
        initialValues={{
          adminEmail: '',
          adminFirstName: '',
          adminLastName: '',
          adminCountry: '',
          adminState: '',
          adminAddress: '',
          adminCity: '',
          adminZip: '',
          adminPhone: '',
          adminLocale: '',
          adminCompany: '',
          adminImages: [],
          emailOnRegistration: true,
          edit,
          customers,
        }}
        validationSchema={CustomerParentFormValidationSchema}
        enableReinitialize
        onSubmit={onFormSubmit}
      >
        {({
          values,
          touched,
          errors,
          setFieldValue,
          setFieldTouched,
          setValues,
          setFieldError,
          isSubmitting,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="edit" value={edit} />
            {!content.isFormShown && !edit && (
              <div className="m-b-lg">
                <h3>New Broker Admin</h3>
                <div className="row">
                  <Input
                    id="adminEmail"
                    name="adminEmail"
                    className="col-lg-3"
                    placeholder="Email"
                    disabled={disableAdminFields}
                    loading={disableAdminFields}
                    value={values.adminEmail}
                    error={errors.adminEmail}
                    touched={touched.adminEmail}
                    onChange={setFieldValue}
                    onBlur={(name, value) => {
                      setFieldTouched(name, value);

                      if (errors.adminEmail) {
                        return;
                      }

                      (async () => {
                        setDisableAdminFields(true);

                        const customer = await fetchCustomerByEmail(values.adminEmail);
                        if (customer) {
                          setValues(
                            {
                              ...values,
                              adminFirstName: customer.firstName,
                              adminLastName: customer.lastName,
                              adminAddress: customer.address,
                              adminCity: customer.city,
                              adminZip: customer.zip,
                              adminPhone: customer.phoneNumber,
                              adminLocale: customer.locale || 'en',
                              adminCompany: customer.company,
                              emailOnRegistration: false,
                            },
                            false,
                          );

                          const countryId = get(customer, 'country.id');
                          if (countryId) {
                            setFieldValue('adminCountry', countryId);
                            setFieldTouched('adminCountry', true);
                            await loadStates(countryId);

                            setFieldValue('adminState', get(customer, 'state.id'));
                            setFieldTouched('adminState', true);
                          }
                        }

                        setDisableAdminFields(false);
                      })();
                    }}
                  />

                  <Input
                    id="adminFirstName"
                    name="adminFirstName"
                    className="col-lg-3"
                    placeholder="First Name"
                    disabled={disableAdminFields}
                    value={values.adminFirstName}
                    error={errors.adminFirstName}
                    touched={touched.adminFirstName}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  <Input
                    id="adminLastName"
                    name="adminLastName"
                    className="col-lg-3"
                    placeholder="Last Name"
                    disabled={disableAdminFields}
                    value={values.adminLastName}
                    error={errors.adminLastName}
                    touched={touched.adminLastName}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </div>

                <div className="row m-b-md">
                  <div className="col-lg-3">
                    <Select
                      id="adminCountry"
                      name="adminCountry"
                      placeholder="Country"
                      className="react-select-hollow"
                      value={values.adminCountry}
                      error={errors.adminCountry}
                      touched={touched.adminCountry}
                      onBlur={setFieldTouched}
                      onChange={async (name, value) => {
                        setFieldValue(name, value);
                        setFieldValue('adminState', null);

                        await loadStates(value);
                      }}
                      options={countries}
                      disabled={!countries.length || disableAdminFields}
                      onChangeAttribute="id"
                      formatOptionLabel={(option) => option.name}
                      isSearchable
                    />
                  </div>
                  <div className="col-lg-3">
                    <Select
                      id="adminState"
                      name="adminState"
                      placeholder="State"
                      className="react-select-hollow"
                      options={states}
                      disabled={!countries.length || !states.length || disableAdminFields}
                      value={values.adminState}
                      error={errors.adminState}
                      touched={touched.adminState}
                      onBlur={setFieldTouched}
                      onChange={setFieldValue}
                      onChangeAttribute="id"
                      formatOptionLabel={(option) => option.name}
                      isSearchable
                    />
                  </div>

                  <div className="col-lg-3">
                    <Select
                      id="adminLocale"
                      name="adminLocale"
                      placeholder="Locale"
                      className="react-select-hollow"
                      options={locales}
                      disabled={!locales.length || disableAdminFields}
                      value={values.adminLocale}
                      error={errors.adminLocale}
                      touched={touched.adminLocale}
                      onBlur={setFieldTouched}
                      onChange={setFieldValue}
                    />
                  </div>
                </div>
                <div className="row">
                  <Input
                    id="adminAddress"
                    name="adminAddress"
                    className="col-lg-3"
                    placeholder="Address"
                    disabled={disableAdminFields}
                    value={values.adminAddress}
                    error={errors.adminAddress}
                    touched={touched.adminAddress}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />

                  <Input
                    id="adminCity"
                    name="adminCity"
                    className="col-lg-3"
                    placeholder="City"
                    disabled={disableAdminFields}
                    value={values.adminCity}
                    error={errors.adminCity}
                    touched={touched.adminCity}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />

                  <Input
                    id="adminZip"
                    name="adminZip"
                    className="col-lg-3"
                    placeholder="Zipcode"
                    disabled={disableAdminFields}
                    value={values.adminZip}
                    error={errors.adminZip}
                    touched={touched.adminZip}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </div>
                <div className="row">
                  <PhoneInputPlane
                    id="adminPhone"
                    name="adminPhone"
                    className="col-lg-3"
                    placeholder="Phone"
                    disabled={disableAdminFields}
                    value={values.adminPhone}
                    error={errors.adminPhone}
                    touched={touched.adminPhone}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />

                  <Input
                    id="adminCompany"
                    name="adminCompany"
                    className="col-lg-3"
                    placeholder="Business Name"
                    disabled={disableAdminFields}
                    value={values.adminCompany}
                    error={errors.adminCompany}
                    touched={touched.adminCompany}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </div>
                <div className="form-group">
                  <FormikTickbox
                    id="emailOnRegistration"
                    name="emailOnRegistration"
                    value={Boolean(values.emailOnRegistration)}
                    onChange={setFieldValue}
                  >
                    Send email on registration
                  </FormikTickbox>
                </div>

                <div className="form-group">
                  <FormikDropzone
                    id="admin-image-upload"
                    name="adminImages"
                    label="Id document"
                    fileValues={values.adminImages}
                    accept="image/*,.pdf"
                    disabled={disableAdminFields}
                    error={errors.adminImages}
                    touched={touched.adminImages}
                    onChange={setFieldValue}
                    onTouched={setFieldTouched}
                    onError={setFieldError}
                  />
                </div>
              </div>
            )}

            <div className="row m-b-sm">
              {edit && (
                <div className="col-lg-12">
                  <SubmitButton
                    label="Update"
                    className="btn-primary"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  />
                  <hr />
                </div>
              )}
              <div className="col-lg-5">
                <CustomerSearch
                  autocompleteCustomers={autocompleteCustomers}
                  setAutocompleteCustomers={setAutocompleteCustomers}
                  setSelectedAutocompleteCustomer={setSelectedAutocompleteCustomer}
                  label="New Bidder"
                />
              </div>
              <div className="col-lg-7">
                <div className="btn-group mt-5">
                  {selectedAutocompleteCustomer && (
                    <Button label="Add" className="btn btn-primary" onClick={addCustomer} />
                  )}
                  {edit && !content.isFormShown && !selectedAutocompleteCustomer && autocompleteCustomers.length === 0 && (
                    <button type="button" className="btn btn-primary" onClick={() => content.setIsFormShown(true)}>
                      Create new bidder
                    </button>
                  )}
                </div>
              </div>
            </div>

            <SortProvider options={sortOptions.map((item) => ({ field: item.field, order: item.order }))}>
              {loadingCustomers ? (
                <SpinnerWheel size={24} thickness={2} className="is-centered" />
              ) : (
                <BiddersTable
                  brokerSettings={brokerSettings}
                  isAdmin={isAdmin}
                  customers={customers}
                  deleteCustomer={deleteCustomer}
                  fetchCustomers={fetchCustomers}
                  customerParent={customerParent}
                />
              )}
            </SortProvider>

            <div className="row m-b-lg">
              <div className="col-lg-12">
                <SubmitButton
                  label={edit ? 'Update' : 'Create'}
                  className="btn-primary pull-right"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

CustomerParentForm.propTypes = {
  customerParent: CustomerParentShape,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};

CustomerParentForm.defaultProps = {
  customerParent: undefined,
  isAdmin: false,
};

export default CustomerParentForm;
