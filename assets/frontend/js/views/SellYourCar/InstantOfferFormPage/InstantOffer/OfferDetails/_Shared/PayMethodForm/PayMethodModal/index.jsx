import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import Button from 'frontend/js/components/Button';
import PaymentService from 'frontend/js/api/PaymentService/';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import useBankName from 'frontend/js/hooks/useBankName';
import useStyles from './useStyles';

function PayMethodModal({ formik, isOpen, onClose }) {
  const classes = useStyles();
  const intl = useIntl();
  const { WIRE_TRANSFER, ZELLE, ACH, CHECK_BY_FEDEX } = PaymentService.METHOD;

  const [bankName, bankNameIsLoading] = useBankName(formik.values.routingNumber, {
    enabled: [ACH, WIRE_TRANSFER].includes(formik.values.payMethod),
  });

  function handleSubmit() {
    formik.validateForm().then((val) => {
      const errorFields = Object.keys(val);
      if (errorFields.length > 0) {
        formik.setTouched(
          errorFields.reduce((acc, cur) => {
            acc[cur] = true;
            return acc;
          }, {}),
          false,
        );
      } else {
        formik.submitForm();
      }
    });
  }

  const { payMethod } = formik.values;

  function getTitle() {
    if (payMethod === ZELLE) {
      return intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.title.zelle' });
    }
    if (payMethod === WIRE_TRANSFER) {
      return intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.title.wireTransfer' });
    }
    if (payMethod === ACH) {
      return intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.title.ach' });
    }
    if (payMethod === CHECK_BY_FEDEX) {
      return intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.title.fedex' });
    }
    return 'Confirmation';
  }

  useEffect(() => {
    formik.setFieldValue('bankName', bankName);
  }, [bankName]);

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={432}>
      <ModalWindowHeader onClose={onClose} title={getTitle()} />
      <ModalWindowBody className={classes.body} hasFooter>
        <div className={classes.container}>
          {payMethod === ZELLE && (
            <>
              <div>{intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.desc.zelle' })}</div>
              <InputPlane
                id="recipientName"
                name="recipientName"
                placeholder={intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.recipientsName' })}
                value={formik.values.recipientName}
                error={formik.errors.recipientName}
                touched={formik.touched.recipientName}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
              />
              <PhoneInputPlane
                id="zellePhoneNumber"
                name="zellePhoneNumber"
                value={formik.values.zellePhoneNumber}
                error={formik.errors.zellePhoneNumber}
                touched={formik.touched.zellePhoneNumber}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
              />
              <div className={classes.separator}>
                <span>{intl.formatMessage({ id: 'shared.label.or' })}</span>
              </div>
              <InputPlane
                id="zelleEmail"
                name="zelleEmail"
                placeholder={intl.formatMessage({ id: 'shared.label.email' })}
                value={formik.values.zelleEmail}
                error={formik.errors.zelleEmail}
                touched={formik.touched.zelleEmail}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
              />
            </>
          )}

          {payMethod === ACH && (
            <>
              <div>{intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.desc.ach' })}</div>
              <InputPlane
                id="routingNumber"
                name="routingNumber"
                placeholder={intl.formatMessage({
                  id: 'sellYourCarPage.payMethodForm.bankAccountRoutingNumber',
                })}
                value={formik.values.routingNumber}
                error={formik.errors.routingNumber}
                touched={formik.touched.routingNumber}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                loading={bankNameIsLoading}
                checkmark={!formik.errors.routingNumber}
              />
              {Boolean(bankName) && <div className={classes.bankName}>{bankName}</div>}

              <InputPlane
                id="accountNumber"
                name="accountNumber"
                placeholder={intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.accountNumber' })}
                value={formik.values.accountNumber}
                error={formik.errors.accountNumber}
                touched={formik.touched.accountNumber}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                mask="numbers"
              />
              <InputPlane
                id="accountNumberRepeat"
                name="accountNumberRepeat"
                placeholder={intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.repeatAccountNumber' })}
                value={formik.values.accountNumberRepeat}
                error={formik.errors.accountNumberRepeat}
                touched={formik.touched.accountNumberRepeat}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                mask="numbers"
              />
            </>
          )}

          {payMethod === WIRE_TRANSFER && (
            <>
              <InputPlane
                id="accountName"
                name="accountName"
                placeholder={intl.formatMessage({
                  id: 'sellYourCarPage.payMethodForm.accountNameBeneficiary',
                })}
                value={formik.values.accountName}
                error={formik.errors.accountName}
                touched={formik.touched.accountName}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
              />
              <InputPlane
                id="accountNumber"
                name="accountNumber"
                placeholder={intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.accountNumber' })}
                value={formik.values.accountNumber}
                error={formik.errors.accountNumber}
                touched={formik.touched.accountNumber}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                mask="numbers"
              />
              <InputPlane
                id="accountNumberRepeat"
                name="accountNumberRepeat"
                placeholder={intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.repeatAccountNumber' })}
                value={formik.values.accountNumberRepeat}
                error={formik.errors.accountNumberRepeat}
                touched={formik.touched.accountNumberRepeat}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                mask="numbers"
              />
              <InputPlane
                id="routingNumber"
                name="routingNumber"
                placeholder={intl.formatMessage({
                  id: 'sellYourCarPage.payMethodForm.bankAccountRoutingNumber',
                })}
                value={formik.values.routingNumber}
                error={formik.errors.routingNumber}
                touched={formik.touched.routingNumber}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                loading={bankNameIsLoading}
                checkmark={!formik.errors.routingNumber}
              />
              {Boolean(bankName) && <div className={classes.bankName}>{bankName}</div>}
            </>
          )}

          {payMethod === CHECK_BY_FEDEX && (
            <>
              <div>{intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.desc.fedex' })}</div>
              <InputPlane
                id="recipientName"
                name="recipientName"
                placeholder={intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.recipientsName' })}
                value={formik.values.recipientName}
                error={formik.errors.recipientName}
                touched={formik.touched.recipientName}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
              />
              <div>
                <PlacesInputPlane
                  id="address"
                  name="address"
                  label=""
                  placeholder={intl.formatMessage({
                    id: 'sellYourCarPage.payMethodForm.placeholder.enterAddress',
                  })}
                  value={formik.values.address}
                  error={formik.errors.address}
                  touched={formik.touched.address}
                  onBlur={formik.setFieldTouched}
                  disableBlurSelect
                  restrictAddress
                  country=""
                  onChange={(name, value) => {
                    if (typeof value === 'object') {
                      const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = value;
                      formik.setFieldValue(name, [gAddress, gCity, gState, gZip].filter(Boolean).join(' '));
                      formik.setFieldValue('mailingAddress', gAddress);
                      formik.setFieldValue('mailingZip', gZip);
                    } else {
                      formik.setFieldValue(name, value);
                      formik.setFieldValue('mailingAddress', '');
                      formik.setFieldValue('mailingZip', '');
                    }
                  }}
                  applyMask={(val) => {
                    if (typeof val !== 'object' || val === null) {
                      return val;
                    }
                    const { address: gAddress, city: gCity, state_code: gState, zip: gZip } = val;
                    return [gAddress, gCity, gState, gZip].filter((frag) => !!frag).join(', ');
                  }}
                  onError={formik.setFieldError}
                  isShowGoogleMapIcon={false}
                  className={classes.input}
                />
              </div>
              <InputPlane
                id="mailingApartment"
                name="mailingApartment"
                placeholder={intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.mailingApartment' })}
                value={formik.values.mailingApartment}
                error={formik.errors.mailingApartment}
                touched={formik.touched.mailingApartment}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
              />
            </>
          )}
        </div>
      </ModalWindowBody>
      <ModalWindowFooter className={classes.footer}>
        <Button label={<FormattedMessage id="shared.done" />} isLoading={formik.isSubmitting} onClick={handleSubmit} />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

PayMethodModal.propTypes = {
  formik: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PayMethodModal;
