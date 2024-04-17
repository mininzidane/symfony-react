import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'backend/js/components/Form/Input';
import FormikDropzone from 'backend/js/components/Form/FormikDropzone';
import useBankName from 'backend/js/views/InstantOffer/InstantOfferList/InstantOfferPaymentMethod/PayMethodForm/useBankName'; // TODO
import ButtonLink from 'backend/js/components/ButtonLink';
import useStyles from './useStyles';

function ACHForm({ formik }) {
  const classes = useStyles();
  const [bankName, bankNameIsLoading] = useBankName(formik.values.routingNumber);
  const [isNameDisabled, setIsNameDisabled] = useState(Boolean(formik.values.senderName));

  function handleChangeName() {
    setIsNameDisabled((value) => {
      formik.setFieldValue('name', !value ? formik.values.senderName : '');
      return !value;
    });
  }

  const isNeedVoidedCheck = !formik.values.senderName || formik.values.senderName !== formik.values.name;

  useEffect(() => {
    formik.setFieldValue('bankName', bankName);
    if (bankName) {
      formik.setFieldTouched('routingNumber');
    }
  }, [bankName]);

  return (
    <form onSubmit={formik.handleSubmit} className="pt-2">
      <div className="mt-20">
        {formik.values.senderName && (
          <div className="ta-r" style={{ marginBottom: -18 }}>
            <ButtonLink onClick={handleChangeName} label={isNameDisabled ? 'Change Name' : 'Refund To Sender'} />
          </div>
        )}
        <Input
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          touched={formik.touched.name}
          error={formik.errors.name}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
          disabled={isNameDisabled}
        />
      </div>
      <Input
        className="mt-20"
        id="routingNumber"
        name="routingNumber"
        label="Routing Number"
        value={formik.values.routingNumber}
        touched={formik.touched.routingNumber}
        error={formik.errors.routingNumber}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
        loading={bankNameIsLoading}
        checkmark={!formik.errors.routingNumber}
      />
      {!formik.errors.routingNumber && Boolean(bankName) && <div className={classes.formHint}>{bankName}</div>}

      <Input
        className="mt-20"
        id="accountNumber"
        name="accountNumber"
        label="Account Number"
        value={formik.values.accountNumber}
        touched={formik.touched.accountNumber}
        error={formik.errors.accountNumber}
        onChange={formik.setFieldValue}
        onBlur={formik.setFieldTouched}
        onError={formik.setFieldError}
      />
      {formik.values.accountNumber && (
        <Input
          className="mt-20"
          id="confirmAccountNumber"
          name="confirmAccountNumber"
          label="Confirm Account Number"
          value={formik.values.confirmAccountNumber}
          touched={formik.touched.confirmAccountNumber}
          error={formik.errors.confirmAccountNumber}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
        />
      )}
      {isNeedVoidedCheck && (
        <div className="mt-20">
          <FormikDropzone
            id="voidedCheck"
            name="voidedCheck"
            label="Upload Voided Check"
            fileValues={formik.values.voidedCheck}
            accept="image/*,.pdf"
            error={formik.errors.voidedCheck}
            touched={formik.touched.voidedCheck}
            onChange={formik.setFieldValue}
            onTouched={formik.setFieldTouched}
            onError={formik.setFieldError}
          />
        </div>
      )}
    </form>
  );
}

ACHForm.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ACHForm;
