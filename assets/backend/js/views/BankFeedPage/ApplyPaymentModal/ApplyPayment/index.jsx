import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import BankFeedService from 'backend/js/api/BankFeedService';
import InvoiceService from 'backend/js/api/InvoiceService';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import NumberService from 'backend/js/lib/utils/NumberService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'backend/js/components/ModalWindow/Footer';
import Button from 'backend/js/components/Button';
import FlashSuccess from 'backend/js/components/Flash/FlashSuccess';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import CopartPaymentService from 'backend/js/api/CopartPaymentService';
import Select from 'backend/js/components/Form/Select';
import CustomerDetails from './CustomerDetails';
import PaymentDetails from './PaymentDetails';
import InvoiceDetails from './InvoiceDetails';
import ABMInvoiceDetails from './ABMInvoiceDetails';
import SuccessView from './SuccessView';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function ApplyPayment({ id, onClose }) {
  const classes = useStyles();
  const [openedWireConfirmation, setOpenedWireConfirmation] = useState(false);
  const [paymentId, setPaymentId] = useState(id);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isLoadingWireConfirmation, setIsLoadingWireConfirmation] = useState(false);
  const [bankFeedData, setBankFeedData] = useState(null);
  const [wireConfirmationData, setWireConfirmationData] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const getFirstSelectedInvoice = useCallback(
    () => (selectedInvoices.length ? selectedInvoices[0] : null),
    [selectedInvoices],
  );

  function getAmountTowardsInvoice() {
    const selectedInvoice = getFirstSelectedInvoice();
    if (!selectedInvoice || !selectedPayment) {
      return 0;
    }
    if (Number(selectedInvoice.due) > Number(selectedPayment.creditAmount)) {
      return selectedPayment.creditAmount;
    }
    return selectedInvoice.due;
  }

  function renderAlert({ viewDetailTitle }) {
    const { payment } = bankFeedData;
    document.getElementById(`bank_feed_${payment.id}`).remove();
    ReactDOM.render(
      <ThemeProvider>
        {selectedInvoices.map((selectedInvoice, index) => (
          <FlashSuccess>
            <SuccessView
              id={selectedInvoice.token}
              hasViewDetails={index === 0 ? Boolean(viewDetailTitle) : false}
              title={index === 0 ? viewDetailTitle : ''}
            />
          </FlashSuccess>
        ))}
      </ThemeProvider>,
      document.getElementById('react-alert'),
    );
    onClose();
    window.scroll(0, 0);
  }

  const formik = useFormik({
    initialValues: {
      paymentAppliedDate: new Date(),
      amountTowardsInvoice: '',
      paymentId,
      invoiceId: [],
      emailNotification: '1',
      amountReceived: null,
    },
    validationSchema,
    async onSubmit(values, { setSubmitting }) {
      setSubmitting(true);
      setSubmitError(null);

      const payload = {
        paymentDate: bankFeedData.payment?.releasedAt,
        vector: bankFeedData.payment?.vector,
        amountReceived: values.amountReceived,
        paymentAppliedOn: DateTimeService.format(values.paymentAppliedDate),
        emailNotification: values.emailNotification === '1' ? 1 : 0,
        customer: bankFeedData.customer?.id,
        invoices: selectedInvoices.map((invoice) => invoice.id),
        amountTowardsInvoice: values.amountTowardsInvoice.replace(/[^0-9.]/g, ''),
      };

      try {
        const bankFeedService = new BankFeedService();
        await bankFeedService.submitPayment(paymentId, payload);
        setSubmitting(false);
        setSubmitError(null);
        const isNextStep = getFirstSelectedInvoice()?.hasCopartDue;
        if (isNextStep) {
          setIsLoadingWireConfirmation(true);
          const invoiceService = new InvoiceService();
          invoiceService
            .getInvoice(getFirstSelectedInvoice().token)
            .then(({ data }) => {
              setWireConfirmationData({
                copart: data.copart,
                invoice: data.invoice,
                vehicle: data.invoice?.memo,
                comparison: data.comparison,
              });

              if (data.copart) {
                setOpenedWireConfirmation(true);
              } else {
                renderAlert({
                  viewDetailTitle: '',
                });
              }
            })
            .finally(() => {
              setIsLoadingWireConfirmation(false);
            });
        } else {
          renderAlert({
            viewDetailTitle: '',
          });
        }
      } catch (e) {
        setSubmitting(false);
        setOpenedWireConfirmation(false);
        const errors = e.response?.data?.errors;
        const status = e.response?.status;
        let messages = e.response?.data?.title;
        if (status === 400 && typeof errors === 'object') {
          messages = Object.values(errors).join(' ');
        }
        setSubmitError(messages);
      }
    },
    enableReinitialize: false,
  });

  const invoiceDetailsFormik = useFormik({
    initialValues: {
      paymentMethod: 'O',
    },
    async onSubmit(values, { setSubmitting }) {
      setSubmitting(true);
      setSubmitError(null);

      try {
        const copartPaymentService = new CopartPaymentService();
        await copartPaymentService.processPayment(getFirstSelectedInvoice().copartDueId, values.paymentMethod);
        setSubmitting(false);

        const isCopart = wireConfirmationData?.copart.items.length > 0;
        renderAlert({
          viewDetailTitle: isCopart
            ? `Payment of ${formik.values.amountTowardsInvoice} for ${wireConfirmationData?.vehicle} submitted to Copart`
            : '',
        });
      } catch (e) {
        setSubmitting(false);
        const errors = e.response?.data?.errors;
        const status = e.response?.status;
        let messages = e.response?.data?.title;
        if (status === 400 && typeof errors === 'object') {
          messages = Object.values(errors).join(' ');
        }
        setSubmitError(messages);
      }
    },
    enableReinitialize: false,
  });

  function onUnpaidChange(invoiceIds) {
    const { invoices } = bankFeedData;
    setSelectedInvoices(invoices.filter((item) => invoiceIds.includes(item.id)));
  }

  function onPaymentChange(newPaymentId) {
    setPaymentId(newPaymentId);
    formik.setFieldValue('paymentId', newPaymentId);
  }

  useEffect(() => {
    const amount = getAmountTowardsInvoice();
    const formattedAmount = NumberService.formatUsCurrencyForInput(String(amount));
    formik.setFieldValue('amountTowardsInvoice', formattedAmount);
    const selectedInvoicesIds = selectedInvoices.map((invoice) => invoice.id);
    formik.setFieldValue('invoiceId', selectedInvoicesIds);
    setWireConfirmationData(null);
  }, [selectedInvoices, selectedPayment]);

  useEffect(() => {
    setIsLoading(true);
    const bankFeedService = new BankFeedService();
    bankFeedService
      .getPayment(paymentId)
      .then(({ data }) => {
        setSelectedInvoices(data.invoices.filter((item) => item.selected));
        setSelectedPayment(data.payments.find((item) => item.selected));
        setBankFeedData(data);
        const creditAmount = data.payment?.creditAmount;
        if (creditAmount) {
          formik.setFieldValue('amountReceived', Number(creditAmount));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [paymentId]);

  if (!bankFeedData && !isLoading) {
    return null;
  }

  return (
    <>
      <ModalWindowHeader onClose={onClose} title={openedWireConfirmation ? 'Wire Confirmation' : 'Apply payment'} />
      <ModalWindowBody isOverflowVisible className={classes.body}>
        {isLoading ? (
          <div className={classes.loader}>
            <SpinnerWheel size={40} thickness={3} color="gray-dark" />
          </div>
        ) : (
          <>
            {openedWireConfirmation ? (
              <>
                <div className={classes.wireConfirmation}>
                  <InvoiceDetails invoice={wireConfirmationData.copart} comparison={wireConfirmationData.comparison} />
                  <ABMInvoiceDetails
                    invoice={wireConfirmationData.invoice}
                    invoiceId={getFirstSelectedInvoice()?.token || ''}
                    comparison={wireConfirmationData.comparison}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={classes.applyPayment}>
                  <CustomerDetails
                    formik={formik}
                    customer={bankFeedData.customer}
                    payments={bankFeedData.payments}
                    invoices={bankFeedData.invoices || []}
                    onUnpaidChange={onUnpaidChange}
                    onPaymentChange={onPaymentChange}
                  />
                  <PaymentDetails
                    formik={formik}
                    payment={bankFeedData.payment}
                    invoiceId={getFirstSelectedInvoice()?.token || null}
                    invoiceDue={getFirstSelectedInvoice()?.due || null}
                  />
                </div>
              </>
            )}
            {submitError && <div className={classes.error}>{submitError}</div>}
          </>
        )}
      </ModalWindowBody>
      {!isLoading && (
        <ModalWindowFooter className={classes.footer}>
          <Button label="Cancel" className="btn btn-default" onClick={onClose} style={{ minWidth: 142 }} />
          {openedWireConfirmation ? (
            <>
              <div style={{ width: '500px', justifyContent: 'space-between', display: 'flex' }}>
                <div style={{ lineHeight: '38px', fontWeight: 'bold' }}>Payment Method:</div>
                <div style={{ width: '200px' }}>
                  <Select
                    id="paymentMethod"
                    name="paymentMethod"
                    placeholder=""
                    className="react-select-hollow"
                    value={invoiceDetailsFormik.values.paymentMethod}
                    touched={invoiceDetailsFormik.touched.paymentMethod}
                    error={invoiceDetailsFormik.errors.paymentMethod}
                    onBlur={invoiceDetailsFormik.setFieldTouched}
                    onChange={invoiceDetailsFormik.setFieldValue}
                    options={[
                      { label: 'ePay', id: 'O' },
                      { label: 'Credit Card', id: 'P' },
                    ]}
                    onChangeAttribute="id"
                    formatOptionLabel={(option) => option.label}
                  />
                </div>
                <Button
                  isLoading={invoiceDetailsFormik.isSubmitting}
                  className="btn btn-primary"
                  label={`Pay ${NumberService.formatUsCurrency(wireConfirmationData.copart.due, true)}`}
                  onClick={invoiceDetailsFormik.submitForm}
                  style={{ minWidth: 142 }}
                />
              </div>
            </>
          ) : (
            <>
              {!selectedInvoices.length ? (
                <Button
                  isLoading={formik.isSubmitting}
                  className="btn btn-primary"
                  label="Apply to deposit"
                  onClick={formik.submitForm}
                  style={{ minWidth: 142 }}
                />
              ) : (
                <Button
                  isLoading={formik.isSubmitting || isLoadingWireConfirmation}
                  className="btn btn-primary"
                  label="Apply"
                  onClick={formik.submitForm}
                  style={{ minWidth: 142 }}
                />
              )}
            </>
          )}
        </ModalWindowFooter>
      )}
    </>
  );
}

ApplyPayment.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ApplyPayment;
