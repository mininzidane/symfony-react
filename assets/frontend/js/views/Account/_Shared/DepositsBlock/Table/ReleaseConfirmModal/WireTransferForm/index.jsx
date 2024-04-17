import React, { useState, useEffect } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PaymentService from 'frontend/js/api/PaymentService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CountryService from 'frontend/js/api/CountryService';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function WireTransferForm({ formik }) {
  const intl = useIntl();
  const [bankName, setBankName] = useState(null);
  const [bankNameLoading, setBankNameLoading] = useState(false);
  const { countryId: customerCountryId } = useCustomerHelper();

  useEffect(() => {
    if (formik.errors.ibanNumber) {
      setBankName(null);
    }
  }, [formik.errors.ibanNumber]);

  const translationSets = {
    accountNumber: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.accountNumber' }),
    swiftCode: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.swiftCode' }),
    ibanNumber: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.ibanNumber' }),
    beneficiary: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.beneficiary' }),
    bankName: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.bankName' }),
    address: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.address' }),
    city: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.city' }),
    state: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.state' }),
    zipCode: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.zipCode' }),
    intlRoutingCode: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.intlRoutingCode' }),
  };

  function onIbanChanged(value) {
    setBankNameLoading(true);
    PaymentService.ibanDetails(value)
      .then((result) => {
        setBankName(result.bankName);
      })
      .catch(() => {
        /** Ignore */
      })
      .finally(() => {
        setBankNameLoading(false);
      });
  }

  return (
    <form onSubmit={formik.handleSubmit} className="pt-2">
      <InputPlane
        className="mt-10 pt-2"
        id="swiftCode"
        name="swiftCode"
        label={translationSets.swiftCode}
        value={formik.values.swiftCode}
        touched={formik.touched.swiftCode}
        error={formik.errors.swiftCode}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
      />

      <InputPlane
        className="mt-10 pt-2"
        id="ibanNumber"
        name="ibanNumber"
        label={translationSets.ibanNumber}
        value={formik.values.ibanNumber}
        touched={formik.touched.ibanNumber}
        error={formik.errors.ibanNumber}
        onChange={formik.setFieldValue}
        onBlur={(field, value) => {
          formik.setFieldTouched(field, value);
          if (formik.errors.ibanNumber || !formik.values.ibanNumber) {
            return;
          }
          onIbanChanged(formik.values.ibanNumber);
        }}
        checkmark={!formik.errors.ibanNumber && !!formik.values.ibanNumber}
        loading={!formik.errors.ibanNumber && !!formik.values.ibanNumber && bankNameLoading && !bankName}
      />
      {bankName && <div className="form-hint-plane text-green fw-7">{bankName}</div>}

      <InputPlane
        className="mt-10 pt-2"
        id="account"
        name="account"
        label={translationSets.beneficiary}
        value={formik.values.account}
        touched={formik.touched.account}
        error={formik.errors.account}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
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
      />

      {formik.values.country === CountryService.COUNTRIES.usa.code && (
        <>
          <InputPlane
            className="mt-10 pt-2"
            id="state"
            name="state"
            label={translationSets.state}
            value={formik.values.state}
            touched={formik.touched.state}
            error={formik.errors.state}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
          />

          <InputPlane
            className="mt-10 pt-2"
            id="zipCode"
            name="zipCode"
            label={translationSets.zipCode}
            value={formik.values.zipCode}
            touched={formik.touched.zipCode}
            error={formik.errors.zipCode}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
          />
        </>
      )}

      {customerCountryId === CountryService.COUNTRIES.unitedKingdom.code && (
        <InputPlane
          className="mt-10 pt-2"
          id="intlRoutingCode"
          name="intlRoutingCode"
          label={
            <>
              {translationSets.intlRoutingCode}
              <TooltipOnHover
                disablePortal
                content={
                  <FormattedMessage id="depositsPage.transactions.deposits.confirmModal.intlRoutingCodeTooltip" />
                }
              />
            </>
          }
          value={formik.values.intlRoutingCode}
          touched={formik.touched.intlRoutingCode}
          error={formik.errors.intlRoutingCode}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
        />
      )}
    </form>
  );
}

WireTransferForm.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default WireTransferForm;
