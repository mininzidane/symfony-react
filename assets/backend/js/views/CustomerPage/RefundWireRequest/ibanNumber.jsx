import React, { useState } from 'react';
import { isValidIBAN } from 'ibantools';
import PropTypes from 'prop-types';
import PaymentService from 'backend/js/api/PaymentService';
import Input from 'backend/js/components/Form/Input';

function IbanNumber({ value }) {
  const paymentService = new PaymentService();
  const [touched, setTouched] = useState(false);
  const [ibanNumber, setIbanNumber] = useState(value);
  const [error, setError] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [bankNameLoading, setBankNameLoading] = useState(false);

  function onIbanChanged(v) {
    setBankNameLoading(true);
    paymentService
      .ibanDetails(v)
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
    <>
      <Input
        id="ibanNumber"
        name="ibanNumber"
        value={ibanNumber}
        touched={touched}
        onChange={(field, v) => {
          setError(null);
          setIbanNumber(v);
          setBankName(null);
          if (!isValidIBAN(v)) {
            setError('IBAN is not valid');
          }
        }}
        label="IBAN Number"
        className="mb-0"
        labelClassName="col-sm-2"
        inputWrapperClassName="col-sm-10"
        onBlur={(field, v) => {
          setTouched(v);
          setBankName(null);
          if (!ibanNumber || error) {
            return;
          }
          onIbanChanged(ibanNumber);
        }}
        error={error}
        success={bankName}
        checkmark={!error && ibanNumber}
        loading={!error && ibanNumber && bankNameLoading && !bankName}
      />
    </>
  );
}

IbanNumber.propTypes = {
  value: PropTypes.string,
};

IbanNumber.defaultProps = {
  value: '',
};

export default IbanNumber;
