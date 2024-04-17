import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import ButtonLink from 'frontend/js/components/ButtonLink';
import PaymentService from 'frontend/js/api/PaymentService/';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import CheckmarkRoundGreenSvg from 'frontend/images/shared/various/checkmark-round-green.svg';
import PlacesInputPlane from 'frontend/js/components/Form/PlaneTheme/PlacesInputPlane';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import MyLocation from 'frontend/js/components/MyLocation';
import PayMethodCard from './PayMethodCard';
import PayMethodModal from './PayMethodModal';
import validationSchema from './validationSchema';
import McAfeeLogoSvg from './img/mcafee_logo_bw.svg';
import NortonSecuredLogoSvg from './img/norton_secured_logo_bw.svg';
import EyeSvg from './img/eye-21x12.svg';
import useStyles from './useStyles';

function PayMethodForm({ instantOffer, onSuccess }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [isPayMethodModalOpen, setIsPayMethodModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(instantOffer?.payMethod);

  const [isAccountVisible, setIsAccountVisible] = useState(false);
  const [isRoutingNumberVisible, setIsRoutingNumberVisible] = useState(false);

  const { WIRE_TRANSFER, ZELLE, ACH, CHECK_BY_FEDEX } = PaymentService.METHOD;

  const initialValues = useMemo(() => {
    const { payMethodAdditionalInfo } = instantOffer || {};
    return {
      ref: instantOffer.ref,
      payMethod: instantOffer?.payMethod || CHECK_BY_FEDEX,
      zellePhoneNumber: payMethodAdditionalInfo?.zelleEmailPhone?.match(/\+[0-9-]+/g)?.toString() || '',
      zelleEmail: payMethodAdditionalInfo?.zelleEmailPhone?.match(/\S+?@\S+/g)?.toString() || '',
      recipientName: payMethodAdditionalInfo?.recipientName || '',
      accountName: payMethodAdditionalInfo?.accountName || '',
      accountNumber: payMethodAdditionalInfo?.accountNumber || '',
      accountNumberRepeat: payMethodAdditionalInfo?.accountNumber || '',
      routingNumber: payMethodAdditionalInfo?.routingNumber || '',
      bankName: payMethodAdditionalInfo?.bankName || '',
      address: instantOffer.mailingAddress || '',
      mailingApartment: payMethodAdditionalInfo?.mailingApartment || '',
    };
  }, [instantOffer]);

  // function confirmPayment() {
  //   setIsPayMethodModalOpen(true);
  // }

  function handlePayMethodModalClose() {
    setIsPayMethodModalOpen(false);
  }

  async function onSubmitPayMethod(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      const response = await InstantOfferService.editPayMethod(values.ref, {
        payMethod: values.payMethod,
        mailingAddress: values.payMethod === CHECK_BY_FEDEX ? values.mailingAddress : null,
        mailingZip: values.payMethod === CHECK_BY_FEDEX ? values.mailingZip : null,
        payMethodAdditionalInfo: {
          recipientName: [ZELLE, CHECK_BY_FEDEX].includes(values.payMethod) ? values.recipientName : '',
          zelleEmailPhone:
            values.payMethod === ZELLE ? [values.zellePhoneNumber, values.zelleEmail].filter(Boolean).join(', ') : '',
          accountName: values.payMethod === WIRE_TRANSFER ? values.accountName : '',
          accountNumber: [ACH, WIRE_TRANSFER].includes(values.payMethod) ? values.accountNumber : '',
          routingNumber: [ACH, WIRE_TRANSFER].includes(values.payMethod) ? values.routingNumber : '',
          mailingApartment: values.payMethod === CHECK_BY_FEDEX ? values.mailingApartment : '',
        },
      });
      onSuccess(response.instantOffer);
      setIsSubmitted(true);
      handlePayMethodModalClose();
    } catch (err) {
      const error = Object.values(err.response?.data?.errors || {})[0];
      enqueueSnackbar(error || intl.formatMessage({ id: 'form.error.general' }), { variant: 'error' });
    }

    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    validateOnMount: true,
    onSubmit: onSubmitPayMethod,
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

  const paymentSystemMap = {
    [ZELLE]: 'Zelle',
    [ACH]: 'ACH',
    [WIRE_TRANSFER]: 'Wire Transfer',
    [CHECK_BY_FEDEX]: 'Fedex Check',
  };

  const currentAccount = useMemo(() => {
    const { zelleEmailPhone, accountNumber } = instantOffer?.payMethodAdditionalInfo || {};
    if (instantOffer?.payMethodAdditionalInfo) {
      if (instantOffer.payMethod === ZELLE && zelleEmailPhone) {
        return isAccountVisible
          ? zelleEmailPhone
          : zelleEmailPhone?.replace(/(\S{1,4}).*?(@\S+)/g, '$1****$2').replace(/\+[0-9-]+(.{4})/g, '****$1');
      }
      if ([ACH, WIRE_TRANSFER].includes(instantOffer.payMethod) && accountNumber) {
        return isAccountVisible ? accountNumber : String(accountNumber).replace(/.+(.{4})/, '****$1');
      }
    }
    return null;
  }, [instantOffer, isAccountVisible]);

  const currentRoutingNumber = useMemo(() => {
    const { routingNumber } = instantOffer?.payMethodAdditionalInfo || {};
    if (routingNumber) {
      return isRoutingNumberVisible ? routingNumber : String(routingNumber).replace(/.+(.{4})/, '****$1');
    }
    return null;
  }, [instantOffer, isRoutingNumberVisible]);

  function toggleAccountVisible() {
    setIsAccountVisible((value) => !value);
  }

  function toggleRoutingNumberVisible() {
    setIsRoutingNumberVisible((value) => !value);
  }

  if (isSubmitted) {
    return (
      <div className={classes.root}>
        <div className={classes.success}>
          <img src={CheckmarkRoundGreenSvg} alt="Checkmark" width="24px" height="24px" className={classes.checkmark} />
          <div className={classes.successTitle}>
            {intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.success.title' })}
          </div>

          <div className={classes.desc}>
            <FormattedMessage
              id="sellYourCarPage.payMethodForm.success.desc"
              values={{
                payMethod: paymentSystemMap[instantOffer.payMethod],
              }}
            />{' '}
            <span className="ws-n">
              (
              <ButtonLink label={intl.formatMessage({ id: 'shared.cta.edit' })} onClick={() => setIsSubmitted(false)} />
              )
            </span>
          </div>

          {instantOffer.payMethod !== CHECK_BY_FEDEX && (
            <div className={classes.row}>
              <div>
                {intl.formatMessage(
                  { id: 'sellYourCarPage.payMethodForm.account' },
                  { payMethod: paymentSystemMap[instantOffer.payMethod] },
                )}
                :
              </div>
              <div className={classes.visibilityToggleRow}>
                <strong>{currentAccount}</strong>
                <div
                  className={classnames(classes.visibilityToggle, isAccountVisible && 'is-visible')}
                  role="button"
                  tabIndex={0}
                  onClick={toggleAccountVisible}
                  onKeyPress={toggleAccountVisible}
                >
                  <img height="12" width="21" src={EyeSvg} className="d-b" alt="Toggle" />
                </div>
              </div>
            </div>
          )}

          {instantOffer.payMethodAdditionalInfo?.routingNumber && (
            <div className={classes.row}>
              <div>{intl.formatMessage({ id: 'shared.label.routingNumber' })}:</div>
              <div className={classes.visibilityToggleRow}>
                <strong>{currentRoutingNumber}</strong>
                <div
                  className={classnames(classes.visibilityToggle, isRoutingNumberVisible && 'is-visible')}
                  role="button"
                  tabIndex={0}
                  onClick={toggleRoutingNumberVisible}
                  onKeyPress={toggleRoutingNumberVisible}
                >
                  <img height="12" width="21" src={EyeSvg} className="d-b" alt="Toggle" />
                </div>
              </div>
            </div>
          )}

          {instantOffer.payMethodAdditionalInfo?.accountName && (
            <div className={classes.row}>
              <div>{intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.accountName' })}:</div>
              <strong>{instantOffer.payMethodAdditionalInfo.accountName}</strong>
            </div>
          )}

          {instantOffer.payMethod === CHECK_BY_FEDEX && instantOffer.fullMailingAddress && (
            <div className={classes.row}>
              {intl.formatMessage({ id: 'shared.label.address' })}: <strong>{instantOffer.fullMailingAddress}</strong>
            </div>
          )}

          {instantOffer.payMethodAdditionalInfo?.recipientName && (
            <div className={classes.row}>
              <div>{intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.recipientsName' })}:</div>
              <strong>{instantOffer.payMethodAdditionalInfo.recipientName}</strong>
            </div>
          )}

          <div className={classes.row}>
            <div>{intl.formatMessage({ id: 'shared.label.amount' })}:</div>
            <strong>{NumberService.formatCurrency(instantOffer.acceptedPrice)} USD</strong>
          </div>

          <div className={classes.secureServices}>
            <img src={McAfeeLogoSvg} width={74} height={27} alt="McAfee" />
            <img src={NortonSecuredLogoSvg} width={81} height={37} alt="NortonSecured" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>{intl.formatMessage({ id: 'sellYourCarPage.payMethodForm.title' })}</div>
      <div className={classes.form}>
        {/*
          <PayMethodCard
            name="payMethod"
            payMethod={ZELLE}
            value={formik.values.payMethod}
            onChange={formik.setFieldValue}
          />
          <PayMethodCard
            name="payMethod"
            payMethod={ACH}
            value={formik.values.payMethod}
            onChange={formik.setFieldValue}
          />
          <PayMethodCard
            name="payMethod"
            payMethod={WIRE_TRANSFER}
            value={formik.values.payMethod}
            onChange={formik.setFieldValue}
          />
        */}
        <PayMethodCard
          name="payMethod"
          payMethod={CHECK_BY_FEDEX}
          value={formik.values.payMethod}
          onChange={formik.setFieldValue}
        />
      </div>
      <div className={classes.container}>
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
            country="us"
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
            content={
              !formik.values.address ? (
                <MyLocation
                  onLocation={(data) => {
                    formik.setFieldValue('address', data.formattedAddress);
                    formik.setFieldValue('mailingAddress', data.formattedAddress);
                    formik.setFieldValue('mailingZip', data.zip || '');
                  }}
                />
              ) : null
            }
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
      </div>
      <Button
        color="blue"
        label={
          <>
            {intl.formatMessage({ id: 'shared.cta.confirmPayment' })}{' '}
            <svg width={16} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14">
              <path d="M0 7h14M8 1l6 6-6 6" stroke="#fff" strokeWidth="2" />
            </svg>
          </>
        }
        onClick={handleSubmit}
        className={classes.cta}
        isLoading={formik.isSubmitting}
        isNowrap
      />
      <div className={classes.secureServices}>
        <img src={McAfeeLogoSvg} width={74} height={27} alt="McAfee" />
        <img src={NortonSecuredLogoSvg} width={81} height={37} alt="NortonSecured" />
      </div>
      <PayMethodModal formik={formik} isOpen={isPayMethodModalOpen} onClose={handlePayMethodModalClose} />
    </div>
  );
}

PayMethodForm.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default PayMethodForm;
