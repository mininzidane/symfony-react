/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import classnames from 'classnames';
import Amount from 'frontend/js/components/Amount';
import Button from 'frontend/js/components/Button';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import BootstrapService from 'frontend/js/api/BootstrapService';
import RouterService from 'frontend/js/api/RouterService';
import PaymentService from 'frontend/js/api/PaymentService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowContainer from 'frontend/js/components/ModalWindow/Container';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useCreditCardsCustomer from 'frontend/js/hooks/useCreditCardsCustomer';
import useIntl from 'frontend/js/hooks/useIntl';
import ProductCard from './ProductCard';
import Agreement from './Agreement';
import ReportPromoText from './ReportPromoText';
import SuccessText from './SuccessText';
import SuccessActions from './SuccessActions';
import ErrorText from './ErrorText';
import ErrorActions from './ErrorActions';
import FormLabel from './FormLabel';
import useStyles from './useStyles';

function ClearVinReportCheckoutModal({ lot, isOpen, setOpen, reportHash }) {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [modalState, setModalState] = useState('form');
  const [cvReportData, setCvReportData] = useState({});
  const classes = useStyles();
  const NEW_CARD_LABEL = 'new';
  const intl = useIntl();
  const [creditCards, isLoadingCreditCards] = useCreditCardsCustomer(true);
  const cvReportPrice = BootstrapService.getAppValue('cvReportPrice');
  const hasCards = creditCards.length > 0;

  const formik = useFormik({
    initialValues: {
      selectedCard: creditCards[0]?.id || NEW_CARD_LABEL,
    },
    onSubmit: async (values) => {
      setIsPaymentProcessing(true);
      try {
        const response = await PaymentService.purchaseCvReport({
          lot: lot.id,
          reportHash,
          creditCardId: values.selectedCard,
          amount: cvReportPrice,
          auction: lot.inventoryAuction,
        });

        setCvReportData(response.cvReport);
        setModalState('success');
      } catch (e) {
        setModalState('error');
      }
      setIsPaymentProcessing(false);
    },
    enableReinitialize: true,
  });

  const isNewCard = formik.values.selectedCard === NEW_CARD_LABEL;

  function handleModalClose() {
    if (isPaymentProcessing) {
      return;
    }

    setOpen(false);
    setModalState('form');
  }

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={handleModalClose}
      className={classnames({ [classes.iframeModalBody]: modalState === 'report' })}
      size={modalState === 'report' ? 'fullscreen' : 'sm'}
    >
      {modalState === 'form' && (
        <>
          <ModalWindowHeader
            title={<FormattedMessage id="lotPage.clearvinPromo.clearvinReportConfirmation" />}
            onClose={handleModalClose}
          />
          <ModalWindowBody className={classes.root}>
            <ReportPromoText />

            {isLoadingCreditCards ? (
              <div className={classes.spinner}>
                <SpinnerWheel size={24} thickness={2} />
              </div>
            ) : (
              <ModalWindowContainer>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                  <div>
                    <FormLabel text={<FormattedMessage id="shared.label.vinNumber" />} />
                    <InputPlane id="vin" name="vin" value={lot.vin} isLabelOnTop disabled />
                  </div>

                  <div>
                    <FormLabel text={<FormattedMessage id="shared.label.paymentMethod" />} />

                    {hasCards && (
                      <SelectPlane
                        id="selectedCard"
                        name="selectedCard"
                        value={formik.values.selectedCard}
                        convertMobileSelectValue={NumberService.castToNumberSafe}
                        disabled={isPaymentProcessing}
                        options={[
                          ...creditCards.map((card) => ({
                            label: `${card.type} ***** ${card.last4}`,
                            value: card.id,
                          })),
                          { label: intl.formatMessage({ id: 'shared.label.payWithNewCard' }), value: NEW_CARD_LABEL },
                        ]}
                        onChange={(name, value) => {
                          formik.setFieldValue(name, value);
                        }}
                      />
                    )}
                  </div>

                  <ProductCard
                    label={<FormattedMessage id="shared.label.clearVinReport" />}
                    price={<Amount value={cvReportPrice} hasCurrency hasCents />}
                  />

                  {isNewCard ? (
                    <Button
                      href={RouterService.getRoute('cvReportPayment', {
                        lotId: lot.id,
                        newCard: true,
                        auction: lot.inventoryAuction,
                      })}
                      label={<FormattedMessage id="shared.label.checkout" />}
                      onClick={() => setIsPaymentProcessing(true)}
                      isLoading={isPaymentProcessing}
                    />
                  ) : (
                    <Button
                      type="submit"
                      label={<FormattedMessage id="shared.cta.buyNow" />}
                      isLoading={isPaymentProcessing}
                    />
                  )}

                  <Agreement />
                </form>
              </ModalWindowContainer>
            )}
          </ModalWindowBody>
        </>
      )}

      {modalState === 'success' && (
        <>
          <ModalWindowHeader
            title={<FormattedMessage id="shared.label.payment.success" />}
            onClose={handleModalClose}
          />

          <ModalWindowBody className={classes.root}>
            <SuccessText lot={lot} />
            <SuccessActions
              downloadUrl={cvReportData.pdfReportUri}
              report={cvReportData.report}
              onViewClick={() => setModalState('report')}
            />
          </ModalWindowBody>
        </>
      )}

      {modalState === 'error' && (
        <>
          <ModalWindowHeader title={<FormattedMessage id="shared.label.paymentError" />} onClose={handleModalClose} />

          <ModalWindowBody className={classes.root}>
            <ErrorText />
            <ErrorActions onCancelClick={handleModalClose} onTryAgainClick={() => setModalState('form')} />
          </ModalWindowBody>
        </>
      )}

      {modalState === 'report' && (
        <>
          <ModalWindowHeader
            title={<FormattedMessage id="lotPage.clearvinPromo.clearvinReport" />}
            onClose={handleModalClose}
          />

          <ModalWindowBody className={classes.root}>
            <iframe
              srcDoc={cvReportData.report}
              title={<FormattedMessage id="lotPage.clearvinPromo.clearvinReport" />}
              className={classes.iframe}
            />
          </ModalWindowBody>
        </>
      )}
    </ModalWindow>
  );
}

export default ClearVinReportCheckoutModal;
