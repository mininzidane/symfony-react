/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import useShippingCountries from 'frontend/js/hooks/useShippingCountries';
import useDestinations from 'frontend/js/hooks/useDestinations';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import useLoadPreorder from 'frontend/js/hooks/useLoadPreorder';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import CardIndentedContent from '../../../../LotPageCard/CardIndentedContent';
import MessageTag from '../MessageTag';
import useStyles from './useStyles';

const ShippingPromotionForm = React.lazy(() => import('frontend/js/views/Shared/ShippingPromotionForm'));

function Preorder({ lot }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { customer } = window;
  const { isAuthenticated } = useCustomerHelper(customer);
  const {
    shippingCountryId,
    shippingStateCode,
    shippingAddress,
    shippingCity,
    shippingZip,
    shippingDestinationId,
    shippingQuote,
    isDomestic,
    isBorderCrossing,
    updateShippingQuote,
    updateShippingInformation,
  } = useContext(ShippingQuoteContext);
  const countries = useShippingCountries();
  const destinations = useDestinations(shippingCountryId);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [updatedQuote, setUpdatedQuote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { preorder, hasPreorder, handlePreorderUpdate } = useLoadPreorder(lot.id, lot.inventoryAuction);

  function handleClose() {
    if (updatedQuote && updatedQuote.quote && updatedQuote.shippingInfo) {
      const { shippingInfo, quote } = updatedQuote;

      updateShippingInformation(shippingInfo, false);
      updateShippingQuote(quote);
      setUpdatedQuote(null);
    }
    setIsModalOpen(false);
  }

  function handleQuoteUpdate(quote, payload) {
    const { destination, type } = quote;
    let shippingInfo = {
      countryId: payload.country,
      destinationId: quote.destination.id,
      address: payload.address,
      phoneNumber: payload.phone,
      comment: payload.comment,
      consignee: payload.consignee,
    };

    if (type === ShippingOrderService.TypeDomestic) {
      shippingInfo.countryId = ShippingOrderService.usCountryObj.id;
    }

    if (destination.zip) {
      shippingInfo = {
        ...shippingInfo,
        city: destination.zip.city,
        stateCode: destination.zip.stateCode,
        zip: destination.zip.zip,
      };
    }

    setUpdatedQuote({ quote, shippingInfo });
  }

  function handleSubmit({ shippingOrder }) {
    enqueueSnackbar(intl.formatMessage({ id: 'shipping.shippingOrderHasBeenPlaced' }), { variant: 'success' });
    setIsSubmitted(true);
    handlePreorderUpdate(shippingOrder);
  }

  useEffect(() => {
    if (hasPreorder) {
      setIsSubmitted(true);
    }
  }, [preorder]);

  if (!isAuthenticated) {
    return (
      <CardIndentedContent>
        <ButtonOutlined
          label={<FormattedMessage id="lotPage.shipping.preorderNow" />}
          onClick={() => window.dispatchEvent(new CustomEvent('openAuthModal'))}
          isBackgroundWhite
        />
      </CardIndentedContent>
    );
  }

  if (isSubmitted) {
    return <MessageTag message={<FormattedMessage id="shipping.preorderHasBeenPlaced" />} />;
  }

  return (
    <CardIndentedContent className={classes.root}>
      <ButtonOutlined
        onClick={() => setIsModalOpen(true)}
        label={<FormattedMessage id="lotPage.shipping.preorderNow" />}
        isBackgroundWhite
      />

      <SuspenseWrap fallback={null} init={isModalOpen}>
        <ModalWindow className={classes.modal} isOpen={isModalOpen} onClose={handleClose} width={377}>
          <ModalWindowHeader
            onClose={handleClose}
            title={intl.formatMessage({ id: 'shipping.confirmShippingPreorder' })}
          />
          <ModalWindowBody className={classes.modalBody}>
            <ShippingPromotionForm
              classes={{
                root: classes.shippingFormRoot,
                footer: classes.shippingFormFooter,
              }}
              countries={countries}
              destinations={destinations}
              isDrivable={lot.drivable}
              originZip={lot.physicalZip}
              lotId={lot.id}
              auction={lot.inventoryAuction}
              vin={lot.vin}
              country={shippingCountryId}
              destination={shippingDestinationId}
              isBorderCrossing={isBorderCrossing()}
              shippingType={isDomestic() ? ShippingOrderService.TypeDomestic : ShippingOrderService.TypeInternational}
              quoteDomestic={isDomestic() ? shippingQuote : undefined}
              quoteIntl={!isDomestic() ? shippingQuote : undefined}
              location={{
                address: shippingAddress,
                city: shippingCity,
                state_code: shippingStateCode,
                zip: shippingZip,
              }}
              onSubmit={handleSubmit}
              index="shipping_promo"
              orderSource="lot_page_preorder"
              onQuoteUpdate={handleQuoteUpdate}
            />
          </ModalWindowBody>
        </ModalWindow>
      </SuspenseWrap>
    </CardIndentedContent>
  );
}

export default Preorder;
