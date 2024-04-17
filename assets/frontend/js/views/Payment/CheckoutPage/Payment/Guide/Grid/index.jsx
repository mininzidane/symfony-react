/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import RouterService from 'frontend/js/api/RouterService';
import CustomerService from 'frontend/js/api/CustomerService';
import WireTransferService from 'frontend/js/api/WireTransferService';
import Card from 'frontend/js/components/Card';
import Amount from 'frontend/js/components/Amount';
import Button from 'frontend/js/components/Button';
import Link from 'frontend/js/components/Link';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Loader from 'frontend/js/views/Shared/Loader';
import PaymentService from 'frontend/js/api/PaymentService';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import WireTransferDownloadCta from './WireTransferDownloadCta';
import useCheckoutContext from '../../../_Context/useCheckoutContext';
import CopyBlock from './CopyBlock';
import MailSvg from './img/ic_mail.svg';
import MoneySvg from './img/ic_money.svg';
import CardsSvg from './img/cards.svg';
import CardSvg from './img/ic_card.svg';
import DocumentsUploadSchema from './DocumentsUploadSchema';
import useStyles from './useStyles';

function Grid({ method }) {
  const [token, setToken] = useState('');
  const [isSubmissionError, setIsSubmissionError] = useState(false);
  const { amount, setIsInvoiceUploaded, setPaymentGuide, invoices } = useCheckoutContext();
  const { email, id: customerId } = useCustomerHelper();
  const classes = useStyles();
  const { METHOD, PAYMENT_SYSTEM_ACCOUNT } = PaymentService;
  const isZelle = method === METHOD.ZELLE;
  const isMoneyGram = method === METHOD.MONEYGRAM;
  const isWireTransfer = method === METHOD.WIRE_TRANSFER;

  useEffect(() => {
    CustomerService.getUploadToken().then((data) => setToken(data.uploadToken));
  }, []);

  function onSubmit(values, { setSubmitting }) {
    const wireTransferService = new WireTransferService();
    const formData = new FormData();

    formData.append('amount', amount);

    for (let i = 0; i < values.receipts.length; i++) {
      formData.append(`wt_document_${i}`, values.receipts[i]);
    }

    function handleSuccess() {
      setIsInvoiceUploaded(true);
      ScrollService.scrollToTop();
    }

    wireTransferService
      .uploadPaymentConfirmation(
        method.toLowerCase().replace(' ', '-'),
        `?customer=${customerId}&token=${token}`,
        formData,
      )
      .then(handleSuccess)
      .catch(() => setIsSubmissionError(true))
      .finally(() => setSubmitting(false));
  }

  useEffect(() => {
    window.location.hash = `${method.toLowerCase()}-instructions`;
    ScrollService.scrollToTop();
  }, []);

  useEventListener('hashchange', () => {
    if (window.location.hash === '') {
      setPaymentGuide('');
    }
  });

  return (
    <div className={classes.root}>
      <Card elevation={1} className={classes.card}>
        <div className={classes.cardContent}>
          {isZelle && (
            <>
              <div className={classes.stepLabel}>
                <img src={MoneySvg} className={classes.img} style={{ marginTop: 3 }} alt="Send" />{' '}
                <FormattedMessage id="shared.label.step" /> 1
              </div>
              <div className={classes.desc}>
                <FormattedMessage
                  id="checkoutPage.paymentMethods.zelle.step1desc"
                  values={{ amount: <Amount value={amount} fontSize={24} /> }}
                />
              </div>
              <CopyBlock
                value={PAYMENT_SYSTEM_ACCOUNT.ZELLE}
                label={<FormattedMessage id="checkoutPage.paymentMethods.zelle.payTo" />}
              />
            </>
          )}
          {isMoneyGram && (
            <>
              <div className={classes.stepLabel}>
                <img src={CardSvg} className={classes.img} alt="Send" /> <FormattedMessage id="shared.label.step" /> 1
              </div>
              <div className={classes.desc}>
                <FormattedMessage
                  id="checkoutPage.paymentMethods.moneygram.step1desc"
                  values={{
                    a: (chunk) => (
                      <Link href="https://www.moneygram.com/mgo/us/en/paybills" isTargetBlank>
                        {chunk}
                      </Link>
                    ),
                  }}
                />
              </div>

              <CopyBlock
                label={<FormattedMessage id="checkoutPage.paymentMethods.moneygram.step1label" />}
                value={PAYMENT_SYSTEM_ACCOUNT.MONEYGRAM}
              />
            </>
          )}
          {isWireTransfer && (
            <>
              <div className={classes.stepLabel}>
                <img src={MailSvg} className={classes.img} style={{ marginTop: 4 }} alt="Send" />{' '}
                <FormattedMessage id="shared.label.step" /> 1
              </div>
              <div className={classes.desc}>
                <FormattedMessage id="checkoutPage.paymentMethods.wireTransfer.step1desc" values={{ email }} />
              </div>
              <WireTransferDownloadCta />
            </>
          )}
        </div>
      </Card>
      <Card elevation={1} className={classes.card}>
        <div className={classes.cardContent}>
          {isZelle && (
            <>
              <div className={classes.stepLabel}>
                <img src={MailSvg} className={classes.img} alt="Memo" style={{ marginTop: 5 }} />{' '}
                <FormattedMessage id="shared.label.step" /> 2
              </div>
              <div className={classes.desc}>
                <FormattedMessage id="checkoutPage.paymentMethods.zelle.step2desc" values={{ email }} />
              </div>
              <CopyBlock value={email} label={<FormattedMessage id="shared.label.memo" />} />
            </>
          )}
          {isMoneyGram && (
            <>
              <div className={classes.stepLabel}>
                <img src={MoneySvg} className={classes.img} style={{ marginTop: 3 }} alt="Memo" />{' '}
                <FormattedMessage id="shared.label.step" /> 2
              </div>
              <div className={classes.desc}>
                <FormattedMessage
                  id="checkoutPage.paymentMethods.moneygram.step2desc"
                  values={{ amount: <Amount value={amount} /> }}
                />
              </div>
              <div className={classes.cards}>
                <img src={CardsSvg} alt="Cards" />
              </div>
            </>
          )}
          {isWireTransfer && (
            <>
              <div className={classes.stepLabel}>
                <img src={MoneySvg} className={classes.img} style={{ marginTop: 3 }} alt="Memo" />{' '}
                <FormattedMessage id="shared.label.step" /> 2
              </div>
              <div className={classes.desc}>
                <FormattedMessage
                  id="checkoutPage.paymentMethods.wireTransfer.step2desc"
                  values={{ amount: <Amount value={amount} /> }}
                />
              </div>
              <CopyBlock
                value={invoices[0]?.paymentMemo}
                label={
                  <span style={{ textTransform: 'uppercase' }}>
                    <FormattedMessage id="shared.label.memo" />
                  </span>
                }
              />
            </>
          )}
        </div>
      </Card>
      <Card elevation={1} className={classes.card}>
        <div className={classes.formContainer}>
          {token ? (
            <Formik
              initialValues={{
                receipts: [],
              }}
              validationSchema={DocumentsUploadSchema}
              onSubmit={onSubmit}
              mask="numbers"
              render={({
                values,
                touched,
                errors,
                isSubmitting,
                setFieldValue,
                setFieldError,
                handleSubmit,
                setFieldTouched,
              }) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                  <FilesUpload
                    label="UPLOAD FILE(S)"
                    id="receipts"
                    name="receipts"
                    fileValues={values.receipts}
                    accept="image/png,image/jpg,image/jpeg,.pdf"
                    error={errors.receipts}
                    touched={touched.receipts}
                    onTouched={setFieldTouched}
                    onError={setFieldError}
                    isDropArea
                    isLoading={false}
                    method={method}
                    dropAreaType="receiptPhotos"
                    onChange={(name, value) => {
                      setFieldValue(name, value);
                      setIsSubmissionError(false);
                    }}
                    filesClassName={classes.files}
                    fileWrapClassName={classes.fileWrap}
                    dropAreaClassName={classes.dropArea}
                    filesContainerClassName={classes.filesContainer}
                    multiple
                  />

                  {isSubmissionError && (
                    <div className={classes.error}>
                      <FormattedMessage
                        id="wtUploadPage.couldNotSubmitTheForm"
                        values={{
                          link: (chunk) => <Link href={RouterService.getRoute('helpCenter', null, true)}>{chunk}</Link>,
                        }}
                      />
                    </div>
                  )}

                  {!!values.receipts.length && (
                    <Button
                      type="submit"
                      label={<FormattedMessage id="shared.cta.submitDocuments" />}
                      isInline
                      isLoading={isSubmitting}
                      className={classes.submitCta}
                    />
                  )}
                </form>
              )}
            />
          ) : (
            <Loader minHeight={240} />
          )}
        </div>
      </Card>
    </div>
  );
}

Grid.propTypes = {};

export default Grid;
