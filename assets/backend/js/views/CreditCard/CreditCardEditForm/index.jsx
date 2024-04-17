import React, { useEffect, useState } from 'react';
import Input from 'backend/js/components/Form/Input';
import Select from 'backend/js/components/Form/Select';
import { Formik } from 'formik';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import ReactDOM from 'react-dom';
import get from 'lodash/get';
import CountryService from 'backend/js/api/CountryService';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import SubmitButton from 'backend/js/components/SubmitButton';
import CreditCardService from 'backend/js/api/CreditCardService';
import FlashMessage from 'backend/js/components/FlashMessage';
import PropTypes from 'prop-types';
import CreditCardEditFormValidationSchema from './CreditCardEditFormValidationSchema';

function CreditCardEditForm({ creditCardData, customerData, countries }) {
  function getValueFromContent(field) {
    if (!creditCardData) {
      return '';
    }

    return get(creditCardData, field, '');
  }

  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultFlash = { message: '', type: '' };
  const [flash, setFlash] = useState(defaultFlash);
  const [billingAsProfile, setBillingAsProfile] = useState(Boolean(getValueFromContent('billingAsProfile')));

  const countryService = new CountryService();
  const creditCardService = new CreditCardService();

  async function onFormSubmit(values) {
    setLoading(true);

    try {
      await creditCardService.edit(values.token, values);
      setFlash({ message: 'Edit successful', type: 'success' });
    } catch (serverError) {
      setFlash({ message: serverError, type: 'error' });
    }
    setLoading(false);
  }

  async function onChangeCountry(countryId) {
    setLoading(true);

    try {
      const statesResponse = await countryService.getStates(countryId);
      const statesFormatted = statesResponse.data.states.map((state) => ({ label: state.name, value: state.id }));
      setStates(statesFormatted);
    } catch (serverError) {
      let messages = 'An error occurred while processing this request.';
      if (serverError) {
        const {
          response: {
            data: { errors },
          },
        } = serverError;

        if (errors) {
          messages = Object.values(errors.errors).join(' ');
        }
      }

      setFlash({ message: messages, type: 'error' });
    }

    setLoading(false);
  }

  useEffect(() => {
    const country = getValueFromContent('country.id');
    onChangeCountry(country);
  }, []);

  return (
    <div className="wrapper wrapper-content">
      {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
      <div className="ibox float-e-margins">
        <div className="ibox-content">
          {loading && <SpinnerWheel isCentered size={40} thickness={3} />}
          <>
            <Formik
              initialValues={{
                token: getValueFromContent('token'),
                cvv: getValueFromContent('cvv'),
                expMonth: getValueFromContent('exp_month'),
                expYear: getValueFromContent('exp_year'),
                country: getValueFromContent('country.id'),
                state: getValueFromContent('state.id'),
                city: getValueFromContent('city'),
                zip: getValueFromContent('zip'),
                address: getValueFromContent('address'),
                billingAsProfile,
                preferred: Boolean(getValueFromContent('preferred')),
              }}
              onSubmit={onFormSubmit}
              validationSchema={CreditCardEditFormValidationSchema}
            >
              {({ values, touched, errors, setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <Input
                        label="Cvv"
                        id="cvv"
                        name="cvv"
                        value={values.cvv}
                        error={errors.cvv}
                        touched={touched.cvv}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <Input
                        label="Exp Month"
                        id="expMonth"
                        name="expMonth"
                        value={values.expMonth}
                        error={errors.expMonth}
                        touched={touched.expMonth}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <Input
                        label="Exp Year"
                        id="expYear"
                        name="expYear"
                        value={values.expYear}
                        error={errors.expYear}
                        touched={touched.expYear}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <Select
                        id="country"
                        label="Country"
                        name="country"
                        value={billingAsProfile ? customerData.country.id : values.country}
                        error={errors.country}
                        touched={touched.country}
                        options={countries}
                        disabled={billingAsProfile}
                        onChange={(_, value) => {
                          setFieldValue(_, value);
                          onChangeCountry(value);
                        }}
                        onBlur={setFieldTouched}
                      />
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <Select
                        id="state"
                        label="State"
                        name="state"
                        value={billingAsProfile ? customerData.state.id : values.state}
                        error={errors.state}
                        touched={touched.state}
                        options={states}
                        disabled={billingAsProfile}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <Input
                        label="City"
                        id="city"
                        name="city"
                        value={billingAsProfile ? customerData.city : values.city}
                        error={errors.city}
                        touched={touched.city}
                        disabled={billingAsProfile}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <Input
                        label="Zip"
                        id="zip"
                        name="zip"
                        value={billingAsProfile ? customerData.zip : values.zip}
                        error={errors.zip}
                        touched={touched.zip}
                        disabled={billingAsProfile}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <Input
                        label="Address"
                        id="address"
                        name="address"
                        value={billingAsProfile ? customerData.address : values.address}
                        error={errors.address}
                        touched={touched.address}
                        disabled={billingAsProfile}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <FormikTickbox
                        id="billingAsProfile"
                        name="billingAsProfile"
                        value={values.billingAsProfile}
                        onChange={(_, value) => {
                          setFieldValue(_, value);
                          setBillingAsProfile(value);
                          if (customerData.country.id !== values.country) {
                            onChangeCountry(value ? customerData.country.id : values.country);
                          }
                        }}
                      >
                        Billing As Profile
                      </FormikTickbox>
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <FormikTickbox id="preferred" name="preferred" value={values.preferred} onChange={setFieldValue}>
                        Preferred
                      </FormikTickbox>
                    </div>
                  </div>
                  <div className="row m-b-sm">
                    <div className="col-lg-3">
                      <SubmitButton
                        label="Submit"
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
        </div>
      </div>
    </div>
  );
}

CreditCardEditForm.propTypes = {
  creditCardData: PropTypes.object.isRequired,
  customerData: PropTypes.object.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
};

CreditCardEditForm.defaultProps = {
  countries: [],
};

const $el = document.getElementById('credit-card-edit-form');
if ($el) {
  const creditCardData = JSON.parse($el.getAttribute('data-credit-card-data'));
  const countries = JSON.parse($el.getAttribute('data-countries'));
  const customerData = JSON.parse($el.getAttribute('data-customer-data'));

  ReactDOM.render(
    <CreditCardEditForm
      creditCardData={creditCardData}
      customerData={customerData}
      countries={countries.map((country) => ({ label: country.name, value: country.id }))}
    />,
    $el,
  );
}
