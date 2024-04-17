import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from 'backend/js/components/Form/Input';
import PaymentService from 'backend/js/api/PaymentService';
import CountryService from 'frontend/js/api/CountryService';
import useStyles from './useStyles';

function WireTransferForm({ formik }) {
  const classes = useStyles();
  const paymentService = new PaymentService();
  const [bankName, setBankName] = useState(null);
  const [bankNameLoading, setBankNameLoading] = useState(false);

  useEffect(() => {
    if (formik.errors.ibanNumber) {
      setBankName(null);
    }
  }, [formik.errors.ibanNumber]);

  function onIbanChanged(value) {
    setBankNameLoading(true);
    paymentService
      .ibanDetails(value)
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
      <h3 className="mt-20">Account Information</h3>
      <Input
        className="mt-20"
        id="ibanNumber"
        name="ibanNumber"
        label="IBAN Number"
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
      {bankName && <div className={classes.formHint}>{bankName}</div>}

      <Input
        className="mt-20"
        id="account"
        name="account"
        label="Account Name (Beneficiary)"
        value={formik.values.account}
        touched={formik.touched.account}
        error={formik.errors.account}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
      />

      <div className="hr-line-dashed" />

      <Input
        className="mt-20"
        id="swiftCode"
        name="swiftCode"
        label="Swift Code or National ID"
        value={formik.values.swiftCode}
        touched={formik.touched.swiftCode}
        error={formik.errors.swiftCode}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
      />

      <div className="hr-line-dashed" />

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
      />

      {formik.values.country === CountryService.COUNTRIES.usa.code && (
        <>
          <Input
            className="mt-20"
            id="state"
            name="state"
            label="State"
            value={formik.values.state}
            touched={formik.touched.state}
            error={formik.errors.state}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
          />

          <Input
            className="mt-20"
            id="zipCode"
            name="zipCode"
            label="Zip Code"
            value={formik.values.zipCode}
            touched={formik.touched.zipCode}
            error={formik.errors.zipCode}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
          />
        </>
      )}

      {formik.values.country === CountryService.COUNTRIES.unitedKingdom.code && (
        <Input
          className="mt-20"
          id="intlRoutingCode"
          name="intlRoutingCode"
          label="IRC"
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
