import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useDestinations from 'frontend/js/hooks/useDestinations';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import Select from 'backend/js/components/Form/Select';
import CountryService from 'backend/js/api/CountryService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import { useFormik } from 'formik';

function BrokerSettings({ brokerSettings, onChange, setErrorMessage }) {
  const [countries, setCountries] = useState([]);
  const [preferredCountryName, setPreferredCountryName] = useState('');
  const [preferredDestinationName, setPreferredDestinationName] = useState('');
  const [editPreferredPortAndCountry, setEditPreferredPortAndCountry] = useState(false);
  const destinations = useDestinations(brokerSettings.preferredCountry);

  const countryService = new CountryService();

  async function loadCountries() {
    try {
      const { data } = await countryService.getCountries();
      setCountries(data.countries);
    } catch (e) {
      setErrorMessage('Unable to load countries, please refresh and try again');
    }
  }

  useEffect(() => {
    (async () => {
      await loadCountries();
    })();
  }, []);

  useEffect(() => {
    setPreferredCountryName('');
    if (countries && brokerSettings.preferredCountry) {
      countries.forEach((country) => {
        if (country.id === brokerSettings.preferredCountry) {
          setPreferredCountryName(country.name);
        }
      });
    }
  }, [countries, brokerSettings.preferredCountry]);

  useEffect(() => {
    setPreferredDestinationName('');
    if (destinations && brokerSettings.preferredDestination) {
      destinations.forEach((destination) => {
        if (destination.id === brokerSettings.preferredDestination) {
          setPreferredDestinationName(destination.name);
        }
      });
    }
  }, [destinations, brokerSettings.preferredDestination]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...brokerSettings,
      preferredCheckbox: Boolean(brokerSettings.preferredCountry),
    },
    onSubmit: onChange,
  });

  useEffect(() => {
    formik.submitForm();
  }, [formik.values]);

  return (
    <>
      <h3>Broker Settings</h3>
      <div className="form-group">
        <FormikTickbox
          id="showAllAssignedBidders"
          name="showAllAssignedBidders"
          value={Boolean(formik.values.showAllAssignedBidders)}
          onChange={formik.setFieldValue}
        >
          Show all assigned bidders on Lots Won page
          <TooltipOnHover
            content={
              <>
                Allow Broker Admin to see and search via Bidders&apos; name on Lots Won page. If disabled Broker Admin
                will see only his own purchases.
              </>
            }
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="useBrokerAdminForInvoices"
          name="useBrokerAdminForInvoices"
          value={Boolean(formik.values.useBrokerAdminForInvoices)}
          onChange={formik.setFieldValue}
        >
          Show only Broker Admin details on all invoices
          <TooltipOnHover
            content={<>Show Broker Admin name and address on each invoice for his Bidders.</>}
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="ccBrokerAdminOnPurchaseEmails"
          name="ccBrokerAdminOnPurchaseEmails"
          value={Boolean(formik.values.ccBrokerAdminOnPurchaseEmails)}
          onChange={formik.setFieldValue}
        >
          CC Broker Admin on purchase emails
          <TooltipOnHover
            content={<>Broker Admin gets an email once Broker Admin or any Bidder win a vehicle.</>}
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="displayOnlyLotPurchase"
          name="displayOnlyLotPurchase"
          value={Boolean(formik.values.displayOnlyLotPurchase)}
          onChange={formik.setFieldValue}
        >
          Display only lot purchase for brokers
          <TooltipOnHover
            content={<>Show only purchases without shipping on Lots Won page.</>}
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="preferredCheckbox"
          name="preferredCheckbox"
          value={formik.values.preferredCheckbox}
          onChange={(name, value) => {
            formik.setFieldValue(name, value);
            if (!value) {
              formik.setFieldValue('preferredDestination', null);
              formik.setFieldValue('preferredCountry', null);
            } else {
              setEditPreferredPortAndCountry(true);
            }
          }}
        >
          Choose preferred port and country
          <TooltipOnHover
            content={
              <>
                Once Broker Admin has assigned port, we’ll place shipping orders for each vehicle to this specific port
                for Broker Admin and each Bidder.
              </>
            }
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        {formik.values.preferredCheckbox && (
          <>
            <label htmlFor="editPreferred">
              Preferred port:&nbsp;
              {preferredDestinationName && preferredCountryName && (
                <>
                  {preferredDestinationName}, {preferredCountryName}&nbsp;
                </>
              )}
            </label>
            &nbsp;&nbsp;
            <button
              type="button"
              id="editPreferred"
              className="btn btn-sm"
              onClick={() => setEditPreferredPortAndCountry(true)}
            >
              <i className="glyphicon glyphicon-edit" />
            </button>
            {editPreferredPortAndCountry && (
              <div className="row m-b-md">
                <div className="col-lg-6">
                  <Select
                    id="preferredCountry"
                    name="preferredCountry"
                    placeholder="Country"
                    className="react-select-hollow"
                    value={formik.values.preferredCountry}
                    error={formik.errors.preferredCountry}
                    touched={formik.touched.preferredCountry}
                    onBlur={formik.setFieldTouched}
                    onChange={(name, value) => {
                      formik.setFieldValue(name, value);
                      formik.setFieldValue('preferredDestination', null);
                    }}
                    options={countries}
                    disabled={!countries.length}
                    onChangeAttribute="id"
                    formatOptionLabel={(option) => option.name}
                    isSearchable
                  />
                </div>
                <div className="col-lg-6">
                  <Select
                    id="preferredDestination"
                    name="preferredDestination"
                    placeholder="Port"
                    className="react-select-hollow"
                    options={destinations}
                    disabled={!countries.length || !destinations.length}
                    value={formik.values.preferredDestination}
                    error={formik.errors.preferredDestination}
                    touched={formik.touched.preferredDestination}
                    onBlur={formik.setFieldTouched}
                    onChange={formik.setFieldValue}
                    onChangeAttribute="id"
                    formatOptionLabel={(option) => option.name}
                    isSearchable
                  />
                </div>
              </div>
            )}
          </>
        )}
        <FormikTickbox
          id="billTransactionFeeToBrokerAdmin"
          name="billTransactionFeeToBrokerAdmin"
          value={Boolean(formik.values.billTransactionFeeToBrokerAdmin)}
          onChange={formik.setFieldValue}
        >
          Bill transaction fee to Broker Admin
          <TooltipOnHover
            content={
              <>
                Broker Admin is billed for each purchase of his Bidders. Bidders don’t see transaction fees on invoices.
              </>
            }
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="allowToChooseSchedule"
          name="allowToChooseSchedule"
          value={Boolean(formik.values.allowToChooseSchedule)}
          onChange={formik.setFieldValue}
        >
          Allow to choose schedule
          <TooltipOnHover
            content={
              <>
                Once enabled Broker Admin can choose schedule for his Bidders. Broker Admin chooses between options:
                Volume Buyer and One-time Buyer which correspond to lower and higher fees.
              </>
            }
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="displayIaaInventory"
          name="displayIaaInventory"
          value={Boolean(formik.values.displayIaaInventory)}
          onChange={formik.setFieldValue}
        >
          Display IAA inventory ({brokerSettings.iaaInventoryStats})
          <TooltipOnHover
            content={<>Once enabled Broker Admin and his Bidders can see IAA inventory in their search results.</>}
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="allowToSetFixedBP"
          name="allowToSetFixedBP"
          value={Boolean(formik.values.allowToSetFixedBP)}
          onChange={formik.setFieldValue}
        >
          Allow to set fixed Buyer Power
          <TooltipOnHover
            content={<>Allow Broker Admin to set fixed limits for bidding and number of purchases under account</>}
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="allowToChangeTransactionFee"
          name="allowToChangeTransactionFee"
          value={Boolean(formik.values.allowToChangeTransactionFee)}
          onChange={formik.setFieldValue}
        >
          Allow to change transaction fee
          <TooltipOnHover
            content={<>If enabled Broker Admin can change transaction fee for Bidders</>}
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="allowToAddTowingMarkup"
          name="allowToAddTowingMarkup"
          value={Boolean(formik.values.allowToAddTowingMarkup)}
          onChange={formik.setFieldValue}
        >
          Allow To Add Towing Markup
          <TooltipOnHover
            content={<>Once enabled Broker Admin is allowed to add towing markup to his bidders.</>}
            trigger={<i className="fa fa-question-circle text-navy" />}
            triggerProps={{ style: { border: 0, padding: 0, background: 'none' } }}
            triggerClassName="ml-2"
          />
        </FormikTickbox>
        <FormikTickbox
          id="disableStorageEmails"
          name="disableStorageEmails"
          value={Boolean(formik.values.disableStorageEmails)}
          onChange={formik.setFieldValue}
        >
          Disable Storage and Purchase LP Emails
        </FormikTickbox>
        <FormikTickbox
          id="autoApplyEnabled"
          name="autoApplyEnabled"
          value={Boolean(formik.values.autoApplyEnabled)}
          onChange={formik.setFieldValue}
        >
          Auto-apply bank feed payments
        </FormikTickbox>
        <FormikTickbox
          id="mandatoryInsurance"
          name="mandatoryInsurance"
          value={Boolean(formik.values.mandatoryInsurance)}
          onChange={formik.setFieldValue}
        >
          Auto-apply Insurance
        </FormikTickbox>
        <FormikTickbox
          id="shippingLatePaymentFee"
          name="shippingLatePaymentFee"
          value={Boolean(formik.values.shippingLatePaymentFee)}
          onChange={formik.setFieldValue}
        >
          Shipping LP Fees ({brokerSettings.shippingLatePaymentFeeStats})
        </FormikTickbox>
        <FormikTickbox
          id="shippingPeakSeasonFee"
          name="shippingPeakSeasonFee"
          value={Boolean(formik.values.shippingPeakSeasonFee)}
          onChange={formik.setFieldValue}
        >
          Shipping Peak Season Fee
        </FormikTickbox>
      </div>
    </>
  );
}

BrokerSettings.propTypes = {
  brokerSettings: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default BrokerSettings;
