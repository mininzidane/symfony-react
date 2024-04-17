/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import CardIndentedContent from '../../../../LotPageCard/CardIndentedContent';
import MessageTag from '../MessageTag';
import useStyles from './useStyles';

const CustomQuoteForm = React.lazy(() => import('frontend/js/views/Shared/CustomQuoteForm'));

function CustomQuote({ lot }) {
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper(window.customer);
  const { updateShippingInformation, updateShippingQuote, getCustomQuoteParams, quoteInformationIsDirty } =
    useContext(ShippingQuoteContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function submitCustomShippingQuote() {
    setIsLoading(true);
    try {
      const payload = getCustomQuoteParams(lot);
      await ShippingOrderService.submitCustomQuoteRequest(payload);
      setIsSubmitted(true);
    } catch (error) {
      /** Ignore */
    }
    setIsLoading(false);
  }

  function handleFormSubmit(values) {
    updateShippingQuote(null);
    updateShippingInformation(values);
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (quoteInformationIsDirty) {
      submitCustomShippingQuote();
    }
  }, [quoteInformationIsDirty]);

  if (isSubmitted) {
    return <MessageTag message={<FormattedMessage id="lotPage.shipping.customQuote.requested" />} />;
  }

  if (!isAuthenticated) {
    return (
      <CardIndentedContent className={classes.root}>
        <ButtonOutlined
          label={<FormattedMessage id="lotPage.shipping.customQuote.request" />}
          onClick={() => window.dispatchEvent(new CustomEvent('openAuthModal'))}
          className="js-track-event"
          data-step="abm_shipping"
          data-substep="request_custom_quote_button_click"
          isBackgroundWhite
        />
      </CardIndentedContent>
    );
  }

  return (
    <CardIndentedContent className={classes.root}>
      <ButtonOutlined
        label={<FormattedMessage id="lotPage.shipping.customQuote.request" />}
        className="js-track-event"
        data-step="abm_shipping"
        data-substep="request_custom_quote_button_click"
        isLoading={isLoading}
        isBackgroundWhite
        onClick={() => setIsModalOpen(true)}
      />

      <SuspenseWrap fallback={null} init={isModalOpen}>
        <ModalWindow className={classes.modal} isOpen={isModalOpen} onClose={handleClose} width={377}>
          <ModalWindowHeader
            onClose={handleClose}
            title={<FormattedMessage id="lotPage.shipping.customQuote.tooltip.title" />}
          />
          <ModalWindowBody className={classes.modalBody}>
            <div className="text-md text-gray pr-30 mb-20">
              <FormattedMessage id="lotPage.shipping.customQuote.tooltip.description" />
            </div>

            <CustomQuoteForm
              onSubmit={(values) => {
                handleFormSubmit(values);
                handleClose();
              }}
            />
          </ModalWindowBody>
        </ModalWindow>
      </SuspenseWrap>
    </CardIndentedContent>
  );
}

export default CustomQuote;
