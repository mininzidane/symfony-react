/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useIntl from 'frontend/js/hooks/useIntl';
import TransactionsService from 'frontend/js/api/TransactionsService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import StringService from 'frontend/js/lib/utils/StringService';
import ButtonText from 'frontend/js/components/ButtonText';
import ButtonLink from 'frontend/js/components/ButtonLink';
import Button from 'frontend/js/components/Button';
import Amount from 'frontend/js/components/Amount';
import CheckmarkSvg from 'frontend/images/shared/various/checkmark-circle-24x24.svg';
import ModalWindow from 'frontend/js/components/ModalWindow';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import PaymentService from 'frontend/js/api/PaymentService';
import WireTransferValidationSchema from './WireTransferForm/ValidationSchema';
import WireTransferInitialValues from './WireTransferForm/InitialValues';
import WireTransferForm from './WireTransferForm';
import ACHValidationSchema from './ACHForm/ValidationSchema';
import ACHInitialValues from './ACHForm/InitialValues';
import useStyles from './useStyles';
import ACHForm from './ACHForm';
import CheckValidationSchema from './CheckForm/ValidationSchema';
import CheckInitialValues from './CheckForm/InitialValues';
import CheckForm from './CheckForm';
import DueWarning from './DueWarning';

function ReleaseConfirmModal({
  isOpen,
  onClose,
  refundType,
  bankFeed,
  amount,
  creditCard,
  token,
  isRelease,
  onReleaseSuccess,
}) {
  const transactionsService = new TransactionsService();
  const { formatCurrency } = NumberService;
  const { buildUlFromStringsArray } = StringService;
  const intl = useIntl();
  const classes = useStyles();
  const [refundDate, setRefundDate] = useState();
  const [refundAmount, setRefundAmount] = useState();
  const [refundCard, setRefundCard] = useState();
  const [refundCardType, setRefundCardType] = useState();
  const [refundNumber, setRefundNumber] = useState();
  const [totalDeposit, setTotalDeposit] = useState();
  const queryClient = useQueryClient();

  const [responseMessage, setResponseMessage] = useState('');
  const [status, setStatus] = useState('success');
  const [isRefundRequestPending, setRefundRequestPending] = useState(false);
  const [isRefundResponseReceived, setRefundResponseReceived] = useState(false);
  const isTokenRefund = PaymentService.REFUNDABLE_METHODS.includes(refundType);
  const [releaseToken, setReleaseToken] = useState(null);
  const { due, blRemainingAmount } = useCustomerHelper();
  let availableRefundAmount = blRemainingAmount / BuyerPowerService.depositToBuyerPowerRatio - parseFloat(due, 10);
  availableRefundAmount = availableRefundAmount < 0 ? 0 : availableRefundAmount;

  const translationSets = {
    creditCardReleaseConfirm: intl.formatMessage(
      {
        id: 'depositsPage.transactions.deposits.confirmModal.cardRelease',
      },
      {
        amount: formatCurrency(amount),
        creditCard,
      },
    ),
    creditCardRefundConfirm: intl.formatMessage(
      {
        id: 'depositsPage.transactions.deposits.confirmModal.cardRefund',
      },
      {
        amount: formatCurrency(amount),
        creditCard,
      },
    ),
    wireTransferRefundConfirm: intl.formatMessage(
      {
        id: 'depositsPage.transactions.deposits.confirmModal.wireTransferRelease',
      },
      {
        amount: <Amount value={parseFloat(amount, 10)} hasCurrency />,
        strong: (chunks) => <strong>{chunks}</strong>,
        br: <br />,
      },
    ),
    checkRefundConfirm: intl.formatMessage(
      {
        id: 'depositsPage.transactions.deposits.confirmModal.checkRelease',
      },
      {
        amount: <Amount value={parseFloat(amount, 10)} hasCurrency />,
        strong: (chunks) => <strong>{chunks}</strong>,
        br: <br />,
      },
    ),
    achRefundConfirm: intl.formatMessage(
      {
        id: 'depositsPage.transactions.deposits.confirmModal.achRelease',
      },
      {
        amount: <Amount value={parseFloat(amount, 10)} hasCurrency />,
        strong: (chunks) => <strong>{chunks}</strong>,
        br: <br />,
      },
    ),
    errorMessage: intl.formatMessage({ id: 'shared.error.somethingWentWrong' }),
    pleaseEnterWireInfo: intl.formatMessage({
      id: 'depositsPage.transactions.deposits.confirmModal.pleaseEnterWireInfo',
    }),
    pleaseEnterBankDetails: intl.formatMessage({
      id: 'depositsPage.transactions.deposits.confirmModal.pleaseEnterBankDetails',
    }),
    pleaseEnterMailingAddress: intl.formatMessage({
      id: 'depositsPage.transactions.deposits.confirmModal.pleaseEnterMailingAddress',
    }),
    titleSuccess: intl.formatMessage({
      id: 'depositsPage.transactions.deposits.confirmModal.titleSuccess',
    }),
    titleError: intl.formatMessage({
      id: 'depositsPage.transactions.deposits.confirmModal.titleError',
    }),
  };

  function updatePendingRefundsCounter() {
    queryClient.setQueryData('customer-bootstrap', (oldData) => ({
      ...oldData,
      pendingRefundsCount: oldData.pendingRefundsCount + 1,
    }));
  }

  function requestRefund(payload) {
    setRefundRequestPending(true);

    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    transactionsService
      .refund(token, formData)
      .then((response) => {
        setStatus('success');
        setResponseMessage(response.messages[0]);
        setReleaseToken(token);

        if (response.refund) {
          setRefundDate(response.refund.requested);
          setRefundCard(response.refund.refundCardNumber);
          setRefundCardType(response.refund.refundCardType);
          setRefundAmount(response.refund.actualAmount);
          setRefundNumber(response.refund.confirmationToken);
          setTotalDeposit(response.customer.blAmount);
          updatePendingRefundsCounter();
        }
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
          setResponseMessage(translationSets.errorMessage);
        }
      })
      .finally(() => {
        setRefundResponseReceived(true);
        setRefundRequestPending(false);
      });
  }

  const wireTransferFormik = useFormik({
    initialValues: WireTransferInitialValues,
    validationSchema: WireTransferValidationSchema,
    onSubmit(values) {
      requestRefund(values);
    },
  });

  const checkFormik = useFormik({
    initialValues: CheckInitialValues,
    validationSchema: CheckValidationSchema,
    onSubmit(values) {
      requestRefund(values);
    },
  });

  const achFormik = useFormik({
    initialValues: {
      ...ACHInitialValues,
      senderName: bankFeed?.senderName || '',
      name: bankFeed?.senderName || '',
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
      onClose();
      wireTransferFormik.resetForm();
      checkFormik.resetForm();
      achFormik.resetForm();
      if (releaseToken) {
        onReleaseSuccess(releaseToken, refundType);
        setReleaseToken(null);
      }
    }
  }

  function handleConfirmation() {
    if (isTokenRefund) {
      requestRefund({ confirm: isRelease });
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
    <ModalWindow isOpen={isOpen} onClose={handleClose} size={isRefundResponseReceived ? 'lg' : 'md'}>
      <ModalWindowHeader
        onClose={isRefundRequestPending ? null : handleClose}
        title={
          isRefundResponseReceived ? (
            <>{status === 'success' ? translationSets.titleSuccess : translationSets.titleError}</>
          ) : (
            <FormattedMessage id="depositsPage.transactions.deposits.confirmModal.title" />
          )
        }
      />

      <ModalWindowBody hasFooter className={isRefundResponseReceived ? classes.modalBody : null}>
        <>
          {isRefundResponseReceived ? (
            <>
              {status === 'success' ? (
                <div className={classes.successText}>
                  <img src={CheckmarkSvg} width={42} heigh={42} alt="Checkmark" />
                  {isRelease ? (
                    <div>
                      <FormattedMessage
                        id="depositsPage.transactions.deposits.confirmModal.successCardTitle"
                        className={classes.successTitle}
                        values={{
                          date: DateTimeService.toLocaleDate(new Date(refundDate), {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }),
                          amount: <Amount value={refundAmount} hasCurrency />,
                          card: `${refundCardType} ****${refundCard}`,
                        }}
                      />
                      <FormattedMessage
                        id="depositsPage.transactions.deposits.confirmModal.successCardSubtitle"
                        values={{ number: refundNumber }}
                        className={classes.successSubtitle}
                      />
                      <FormattedMessage
                        id="depositsPage.transactions.deposits.confirmModal.successDescription"
                        values={{ deposit: <Amount value={totalDeposit} hasCurrency /> }}
                        className={classes.successDesc}
                      />
                    </div>
                  ) : (
                    <div>
                      <FormattedMessage
                        id="depositsPage.transactions.deposits.confirmModal.successRefund.title"
                        className={classes.successTitle}
                      />
                      <FormattedMessage
                        id="depositsPage.transactions.deposits.confirmModal.successRefund.description"
                        className={classes.refundSuccessDesc}
                        values={{
                          amount: (
                            <Amount
                              value={availableRefundAmount < refundAmount ? availableRefundAmount : refundAmount}
                              hasCurrency
                              isCurrencyBold
                            />
                          ),
                          a: (chunk) => (
                            <ButtonLink
                              label={chunk}
                              onClick={() => document.getElementById('pending-refunds-tab').click()}
                            />
                          ),
                          div: (chunk) => <div className={classes.linkWrap}>{chunk}</div>,
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className={classes.errorText} dangerouslySetInnerHTML={{ __html: responseMessage }} />
              )}
            </>
          ) : (
            <>
              {isTokenRefund && (
                <div>
                  {isRelease ? translationSets.creditCardReleaseConfirm : translationSets.creditCardRefundConfirm}
                </div>
              )}

              {refundType === 'Wire Transfer' && (
                <>
                  <div className={classes.requestTitle}>{translationSets.wireTransferRefundConfirm}</div>
                  <div className="mt-15">{translationSets.pleaseEnterWireInfo}</div>
                  <WireTransferForm formik={wireTransferFormik} />
                </>
              )}

              {refundType === 'Check' && (
                <>
                  <div className={classes.requestTitle}>{translationSets.checkRefundConfirm}</div>
                  <div className="mt-15">{translationSets.pleaseEnterMailingAddress}</div>
                  <CheckForm formik={checkFormik} />
                </>
              )}

              {refundType === 'ACH' && (
                <>
                  {parseInt(due, 10) ? (
                    <DueWarning due={due} />
                  ) : (
                    <div className={classes.requestTitle}>{translationSets.achRefundConfirm}</div>
                  )}
                  <div className="mt-15">{translationSets.pleaseEnterBankDetails}</div>
                  <ACHForm formik={achFormik} bankFeed={bankFeed} />
                </>
              )}
            </>
          )}
        </>
      </ModalWindowBody>

      <ModalWindowFooter>
        <>
          {isRefundResponseReceived ? (
            <Button label={<FormattedMessage id="shared.cta.ok" />} onClick={handleClose} isInline />
          ) : (
            <>
              {!isRefundRequestPending && (
                <ButtonText
                  label={<FormattedMessage id="depositsPage.transactions.deposits.confirmModal.cancel" />}
                  onClick={handleClose}
                />
              )}

              <Button
                label={<FormattedMessage id="depositsPage.transactions.deposits.confirmModal.confirm" />}
                isLoading={isRefundRequestPending}
                onClick={handleConfirmation}
                isInline
              />
            </>
          )}
        </>
      </ModalWindowFooter>
    </ModalWindow>
  );
}

ReleaseConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReleaseSuccess: PropTypes.func.isRequired,
  refundType: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  isRelease: PropTypes.bool,
  bankFeed: PropTypes.object,
  amount: PropTypes.string,
  creditCard: PropTypes.string,
};

ReleaseConfirmModal.defaultProps = {
  amount: '',
  creditCard: '',
  isRelease: false,
  bankFeed: null,
};

export default ReleaseConfirmModal;
