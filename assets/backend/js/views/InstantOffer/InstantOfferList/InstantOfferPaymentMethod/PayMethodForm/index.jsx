import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import BaseApiService from 'backend/js/api/BaseApiService';
import SubmitButton from 'backend/js/components/SubmitButton';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import Input from 'backend/js/components/Form/Input';
import Select from 'backend/js/components/Form/Select';
import useBankName from 'backend/js/views/InstantOffer/InstantOfferList/InstantOfferPaymentMethod/PayMethodForm/useBankName';
import InstantOfferPayMethodFormValidationSchema from './InstantOfferPayMethodFormValidationSchema';
import FormikTickbox from '../../../../../components/Form/FormikTickbox';
import PlacesInput from '../../../../../components/Form/PlacesInputPlane';

const ZELLE = 'Zelle';
const ACH = 'ACH';
const WIRE_TRANSFER = 'Wire Transfer';
const CHECK_BY_FEDEX = 'Check by FedEx';

function PayMethodForm({ instantOffer, setFlash, setInstantOfferChangeLogs, setModalContent, payMethods }) {
  const instantOfferService = new InstantOfferService();

  async function onSubmitPayMethod(values, { setSubmitting, setFieldError }) {
    setSubmitting(true);
    setFlash({ message: '', type: 'error' });

    if (!values.sameAsPickupAddress && (!values.address || !values.zip)) {
      setFieldError('mailingAddress', 'Required');
    }

    try {
      const response = await instantOfferService.editPayMethod(values.ref, {
        payMethod: values.payMethod,
        payMethodAdditionalInfo: {
          zelleEmailPhone: values.zelleEmailPhone,
          accountName: values.accountName,
          accountNumber: values.accountNumber,
          routingNumber: values.routingNumber,
          nameOnCheck: values.nameOnCheck,
          mailingApartment: values.mailingApartment,
        },
        mailingAddress: values.sameAsPickupAddress ? null : values.address,
        mailingZip: values.sameAsPickupAddress ? null : values.zip,
      });

      setFlash({ message: 'Pay method saved successfully', type: 'success' });
      instantOffer.payMethod = response.instantOffer.payMethod;
      instantOffer.payMethodAdditionalInfo = response.instantOffer.payMethodAdditionalInfo;
      instantOffer.mailingAddress = response.instantOffer.mailingAddress;
      instantOffer.mailingZip = response.instantOffer.mailingZip;
      instantOffer.mailingCity = response.instantOffer.mailingCity;
      instantOffer.mailingStateCode = response.instantOffer.mailingStateCode;
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    setSubmitting(false);
  }

  const { values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit } =
    useFormik({
      initialValues: {
        ref: instantOffer.ref,
        payMethod: instantOffer.payMethod || CHECK_BY_FEDEX,
        zelleEmailPhone: instantOffer.payMethodAdditionalInfo?.zelleEmailPhone || '',
        accountName: instantOffer.payMethodAdditionalInfo?.accountName || '',
        accountNumber: instantOffer.payMethodAdditionalInfo?.accountNumber || '',
        accountNumberRepeat: '',
        routingNumber: instantOffer.payMethodAdditionalInfo?.routingNumber || '',
        bankName: '',
        sameAsPickupAddress: !instantOffer.mailingAddress,
        mailingAddress: instantOffer.mailingAddress,
        mailingApartment: instantOffer.payMethodAdditionalInfo?.mailingApartment || '',
        nameOnCheck: instantOffer.payMethodAdditionalInfo?.nameOnCheck || instantOffer.fullName,
      },
      enableReinitialize: true,
      validationSchema: InstantOfferPayMethodFormValidationSchema,
      onSubmit: onSubmitPayMethod,
    });

  const [bankName, bankNameIsLoading] = useBankName(values.routingNumber, {
    enabled: [ACH, WIRE_TRANSFER].includes(values.payMethod),
  });

  useEffect(() => {
    if (bankName || !bankNameIsLoading) {
      setFieldValue('bankName', bankName);
    } else {
      setFieldValue('bankName', '');
    }
  }, [bankName, bankNameIsLoading]);

  return (
    <form onSubmit={handleSubmit}>
      <Select
        id="payMethod"
        name="payMethod"
        placeholder="Pay Method"
        className="react-select-hollow m-b "
        value={values.payMethod}
        error={errors.payMethod}
        touched={touched.payMethod}
        onBlur={setFieldTouched}
        options={payMethods.map((payMethod) => ({
          label: payMethod,
          value: payMethod,
        }))}
        onChange={setFieldValue}
        onError={setFieldError}
      />

      {values.payMethod === ZELLE && (
        <Input
          id="zelleEmailPhone"
          name="zelleEmailPhone"
          placeholder="Enter Phone or Email registered with Zelle to receive payments"
          value={values.zelleEmailPhone}
          error={errors.zelleEmailPhone}
          touched={touched.zelleEmailPhone}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          onError={setFieldError}
        />
      )}

      {values.payMethod === ACH && (
        <>
          <Input
            id="routingNumber"
            name="routingNumber"
            placeholder="Bank Account Routing number"
            value={values.routingNumber}
            error={errors.routingNumber || (!bankNameIsLoading && errors.bankName)}
            touched={touched.routingNumber}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
            loading={bankNameIsLoading}
            success={bankName}
          />

          <Input
            id="accountNumber"
            name="accountNumber"
            placeholder="Account Number"
            value={values.accountNumber}
            error={errors.accountNumber}
            touched={touched.accountNumber}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />
          <Input
            id="accountNumberRepeat"
            name="accountNumberRepeat"
            placeholder="Repeat Account Number"
            value={values.accountNumberRepeat}
            error={errors.accountNumberRepeat}
            touched={touched.accountNumberRepeat}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />
        </>
      )}

      {values.payMethod === WIRE_TRANSFER && (
        <>
          <Input
            id="accountName"
            name="accountName"
            placeholder="Account Name (Beneficiary)"
            value={values.accountName}
            error={errors.accountName}
            touched={touched.accountName}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />
          <Input
            id="accountNumber"
            name="accountNumber"
            placeholder="Account Number"
            value={values.accountNumber}
            error={errors.accountNumber}
            touched={touched.accountNumber}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />
          <Input
            id="accountNumberRepeat"
            name="accountNumberRepeat"
            placeholder="Repeat Account Number"
            value={values.accountNumberRepeat}
            error={errors.accountNumberRepeat}
            touched={touched.accountNumberRepeat}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />
          <Input
            id="routingNumber"
            name="routingNumber"
            placeholder="Bank Account Routing number"
            value={values.routingNumber}
            error={errors.routingNumber || (!bankNameIsLoading && errors.bankName)}
            touched={touched.routingNumber}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
            loading={bankNameIsLoading}
            success={bankName}
          />
        </>
      )}

      {values.payMethod === CHECK_BY_FEDEX && (
        <>
          <Input
            id="nameOnCheck"
            name="nameOnCheck"
            placeholder="Name on Check"
            value={values.nameOnCheck}
            error={errors.nameOnCheck}
            touched={touched.nameOnCheck}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />
          <FormikTickbox
            id="sameAsPickupAddress"
            name="sameAsPickupAddress"
            value={values.sameAsPickupAddress}
            onChange={setFieldValue}
          >
            Same as pickup address
          </FormikTickbox>
          <br />
          {values.sameAsPickupAddress && <p>{instantOffer.pickupAddress}</p>}
          {!values.sameAsPickupAddress && (
            <>
              <PlacesInput
                id="mailingAddress"
                name="mailingAddress"
                placeholder="Mailing Address"
                value={values.mailingAddress}
                error={errors.mailingAddress}
                touched={touched.mailingAddress}
                className="form-group"
                restrictAddress
                applyMask={(val) => {
                  if (typeof val !== 'object' || val === null) {
                    return val;
                  }

                  const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = val;
                  return [gAddress, gCity, gState, gZip].filter(Boolean).join(' ');
                }}
                onChange={(name, value) => {
                  if (typeof value === 'object') {
                    const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = value;
                    setFieldValue(name, [gAddress, gCity, gState, gZip].filter(Boolean).join(' '));
                    setFieldValue('zip', gZip);
                    setFieldValue('address', gAddress);
                  } else {
                    setFieldValue(name, value);
                    setFieldValue('address', '');
                    setFieldValue('zip', '');
                  }
                }}
                onBlur={setFieldTouched}
                onError={setFieldError}
                label=""
              />
              <Input
                id="mailingApartment"
                name="mailingApartment"
                placeholder="Apt/Suite/Unit (Optional)"
                value={values.mailingApartment}
                error={errors.mailingApartment}
                touched={touched.mailingApartment}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                onError={setFieldError}
              />
            </>
          )}
        </>
      )}

      <SubmitButton
        label="Save"
        className="btn-primary"
        isLoading={isSubmitting}
        disabled={isSubmitting || bankNameIsLoading}
      />
    </form>
  );
}

PayMethodForm.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setFlash: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  payMethods: PropTypes.array,
};

PayMethodForm.defaultProps = {
  payMethods: [],
};

export default PayMethodForm;
