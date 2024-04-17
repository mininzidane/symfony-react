import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import classnames from 'classnames';
import TransactionsService from 'backend/js/api/TransactionService';
import PaymentService from 'backend/js/api/PaymentService';
import NumberService from 'backend/js/lib/utils/NumberService';
import StringService from 'backend/js/lib/utils/StringService';
import Button from 'backend/js/components/Button';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'backend/js/components/ModalWindow/Footer';
import WireTransferValidationSchema from './WireTransferForm/ValidationSchema';
import WireTransferForm from './WireTransferForm';
import ACHValidationSchema from './ACHForm/ValidationSchema';
import useStyles from './useStyles';
import ACHForm from './ACHForm';
import CheckValidationSchema from './CheckForm/ValidationSchema';
import CheckForm from './CheckForm';

function RefundRequestModal({ isOpen, onClose, customer, masterTransaction, onReleaseSuccess }) {
  const classes = useStyles();
  const { formatCurrency } = NumberService;
  const { buildUlFromStringsArray } = StringService;

  const { refundType, senderName, amount, token, memo, date } = masterTransaction;

  const [responseMessage, setResponseMessage] = useState('');
  const [status, setStatus] = useState('success');
  const [isRefundRequestPending, setRefundRequestPending] = useState(false);
  const [isRefundResponseReceived, setRefundResponseReceived] = useState(false);
  const isTokenRefund = PaymentService.REFUNDABLE_METHODS.includes(refundType);

  function requestRefund(payload) {
    setRefundRequestPending(true);

    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const transactionsService = new TransactionsService();
    transactionsService
      .refund(customer.id, token, formData)
      .then((response) => {
        setStatus('success');
        onReleaseSuccess(masterTransaction, response?.messages);
      })
      .catch((e) => {
        setStatus('error');

        const response = e.response ? e.response.data : null;
        if (response && response.errors && response.errors.error) {
          if (Array.isArray(response.errors.error)) {
            setResponseMessage(buildUlFromStringsArray(response.errors.error));
          } else {
            setResponseMessage(response.errors.error);
          }
        } else {
          setResponseMessage('Something went wrong.');
        }
      })
      .finally(() => {
        setRefundResponseReceived(true);
        setRefundRequestPending(false);
      });
  }

  const wireTransferFormik = useFormik({
    initialValues: {
      swiftCode: '',
      ibanNumber: '',
      account: '',
      city: customer?.city || '',
      state: customer?.stateName || '',
      zipCode: customer?.zip || '',
      country: customer?.countryId || '',
      intlRoutingCode: '',
    },
    validationSchema: WireTransferValidationSchema,
    enableReinitialize: true,
    onSubmit(values) {
      requestRefund(values);
    },
  });

  const checkFormik = useFormik({
    initialValues: {
      name: `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || '',
      address: customer?.address || '',
      city: customer?.city || '',
      state: Number(customer?.stateId) || '',
      zip_code: customer?.zip || '',
      country: customer?.countryId || '',
    },
    validationSchema: CheckValidationSchema,
    onSubmit(values) {
      requestRefund(values);
    },
  });

  const achFormik = useFormik({
    initialValues: {
      senderName: senderName || '',
      name: senderName || '',
      voidedCheck: [],
      routingNumber: '',
      accountNumber: '',
      confirmAccountNumber: '',
    },
    enableReinitialize: true,
    validationSchema: ACHValidationSchema,
    onSubmit(values) {
      const payload = { ...values };
      if (payload.voidedCheck?.length > 0) {
        const [file] = payload.voidedCheck;
        payload.file = file;
      }
      delete payload.voidedCheck;
      delete payload.bankName;
      delete payload.senderName;

      requestRefund(payload);
    },
  });

  function handleClose() {
    if (!isRefundRequestPending) {
      setResponseMessage('');
      setRefundRequestPending(false);
      setRefundResponseReceived(false);
      wireTransferFormik?.resetForm();
      checkFormik?.resetForm();
      achFormik?.resetForm();
      onClose();
    }
  }

  function handleConfirmation() {
    if (isTokenRefund) {
      requestRefund({ confirm: true });
    }

    if (refundType === 'Wire Transfer') {
      wireTransferFormik.handleSubmit();
    }

    if (refundType === 'Check') {
      checkFormik.handleSubmit();
    }

    if (refundType === 'ACH') {
      achFormik.handleSubmit();
    }
  }

  return (
    <ModalWindow isOpen={isOpen} onClose={handleClose} size="md">
      <ModalWindowHeader
        onClose={isRefundRequestPending ? null : handleClose}
        title={isRefundResponseReceived && status === 'error' ? 'Release Deposit Error' : 'Refund Request'}
      />

      <ModalWindowBody hasFooter>
        <>
          {isRefundResponseReceived ? (
            <>
              <div
                className={classnames({ [classes.errorText]: status === 'error' })}
                dangerouslySetInnerHTML={{ __html: responseMessage }}
              />
            </>
          ) : (
            <>
              {isTokenRefund && (
                <>
                  <div>Payment Date: {date}</div>
                  <div>Amount: {formatCurrency(amount)}</div>
                  <div>Description: {memo}</div>
                </>
              )}

              {refundType === 'Wire Transfer' && (
                <>
                  <h2 className="mt-0">Pending Refunds</h2>
                  <div>
                    The Refund of <strong>{formatCurrency(amount)}</strong> will be sent by wire transfer to the account
                    information you provide.
                  </div>
                  <WireTransferForm formik={wireTransferFormik} />
                </>
              )}

              {refundType === 'Check' && (
                <>
                  <h2 className="mt-0">Pending Refunds</h2>
                  <div>
                    The Refund of <strong>{formatCurrency(amount)}</strong> will be sent by company check to the mailing
                    address you provide. <br />
                    Please enter the mailing address:
                  </div>
                  <CheckForm formik={checkFormik} />
                </>
              )}

              {refundType === 'ACH' && (
                <>
                  <h2 className="mt-0">Pending Refunds</h2>
                  <div>
                    Please provide bank details to get your Refund of <strong>{formatCurrency(amount)}</strong> by ACH.{' '}
                    <br /> <br /> if the Sender of the payment was a 3rd party, the refund will need to be processed to
                    their account details.
                  </div>
                  <ACHForm formik={achFormik} />
                </>
              )}
            </>
          )}
        </>
      </ModalWindowBody>

      <ModalWindowFooter>
        <>
          {isRefundResponseReceived ? (
            <Button label="Ok" size="md" onClick={handleClose} isInline />
          ) : (
            <>
              {!isRefundRequestPending && (
                <Button label="Cancel" className="btn btn-warning" onClick={handleClose} style={{ minWidth: 142 }} />
              )}

              <Button
                label="Confirm Refund Request"
                className="btn btn-primary"
                isLoading={isRefundRequestPending}
                onClick={handleConfirmation}
              />
            </>
          )}
        </>
      </ModalWindowFooter>
    </ModalWindow>
  );
}

RefundRequestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReleaseSuccess: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  masterTransaction: PropTypes.shape({
    refundType: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    isRelease: PropTypes.bool,
    senderName: PropTypes.string,
    memo: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.string,
  }).isRequired,
};

export default RefundRequestModal;
