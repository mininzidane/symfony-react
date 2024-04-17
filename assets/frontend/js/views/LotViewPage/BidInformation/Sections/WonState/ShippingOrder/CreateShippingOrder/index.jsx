import React, { useState, useEffect, useContext, Suspense } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import ShippingTo from 'frontend/js/views/Shared/Shipping/ShippingTo';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import LotPurchaseShape from 'frontend/js/lib/propshapes/LotPurchaseShape';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import useLoadShippingQuote from 'frontend/js/views/Shared/Shipping/useLoadShippingQuote';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import SyncDefaultShippingInfo from 'frontend/js/views/Shared/Shipping/SyncDefaultShippingInfo';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Button from 'frontend/js/components/Button';
import useShippingCountries from 'frontend/js/hooks/useShippingCountries';
import useDestinations from 'frontend/js/hooks/useDestinations';
import ContentPopover from 'frontend/js/components/ContentPopover';

const CustomQuoteForm = React.lazy(() => import('frontend/js/views/Shared/CustomQuoteForm'));
const ShippingPromotionForm = React.lazy(() => import('frontend/js/views/Shared/ShippingPromotionForm'));

function CreateShippingOrder({ lot, lotPurchase, setShippingOrder }) {
  const {
    shippingQuote,
    updateFromShippingOrder,
    initShippingFromCustomer,
    customerDataInited,
    updateShippingInformation,
    updateShippingQuote,
    getCustomQuoteParams,
    shippingFirstName,
    shippingLastName,
    shippingCountryId,
    shippingStateCode,
    shippingAddress,
    shippingCity,
    shippingZip,
    shippingDestinationId,
    isBorderCrossing,
    isDomestic,
  } = useContext(ShippingQuoteContext);
  const intl = useIntl();
  const isLoading = useLoadShippingQuote(lot, false);
  const countries = useShippingCountries();
  const destinations = useDestinations(shippingCountryId);
  const [isSubmittedCustomQuote, setIsSubmittedCustomQuote] = useState(false);

  const { activeShippingOrder: shippingOrder } = lotPurchase;

  function handleFormSubmit(values) {
    updateShippingQuote(null);
    updateShippingInformation(values);
  }

  function handleSubmit({ shippingOrder: createdShippingOrder, isAddShippingToMyInvoice = false }) {
    if (isAddShippingToMyInvoice) {
      setShippingOrder(createdShippingOrder);
    } else {
      RouterService.redirect('shippingPayment', null, false, { token: createdShippingOrder.token });
    }
  }

  async function handleSubmitCustomQuote(values) {
    updateShippingQuote(null);
    updateShippingInformation(values, false);
    const payload = getCustomQuoteParams(lot);
    try {
      await ShippingOrderService.submitCustomQuoteRequest(payload);
      setIsSubmittedCustomQuote(true);
    } catch (error) {
      /** ignore */
    }
  }

  useEffect(() => {
    (async () => {
      if (!customerDataInited) {
        await initShippingFromCustomer(window.customer);
      }
      if (shippingOrder) {
        await updateFromShippingOrder(shippingOrder);
      }
    })();
  }, [shippingOrder]);

  if (isSubmittedCustomQuote) {
    return (
      <div className="text-green">
        <FormattedMessage id="shipping.status.yourCustomQuoteRequestHasBeenSubmitted" />
      </div>
    );
  }

  return (
    <>
      <SyncDefaultShippingInfo lot={lot} />
      <div>
        <strong>{intl.formatMessage({ id: 'shared.label.to' })}</strong>
      </div>
      {shippingFirstName && (
        <div>
          {shippingFirstName} {shippingLastName}
        </div>
      )}
      <ShippingTo onChange={handleFormSubmit} />

      <ContentPopover
        trigger={
          <Button
            label={intl.formatMessage({ id: 'shipping.orderShipping' })}
            size="md"
            className="mt-15"
            isNowrap
            isTargetBlank
            isThinBorder
          />
        }
        popoverTitle={intl.formatMessage({ id: 'lotsWonPage.shippingOrder' })}
        popoverClass=""
        popoverOptions={{ placement: 'bottom' }}
      >
        {({ close }) => (
          <>
            {isLoading ? (
              <SpinnerWheel size={14} thickness={2} />
            ) : (
              <Suspense fallback={<SpinnerWheel size={14} thickness={2} />}>
                {shippingQuote ? (
                  <ShippingPromotionForm
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
                    shippingType={
                      isDomestic() ? ShippingOrderService.TypeDomestic : ShippingOrderService.TypeInternational
                    }
                    quoteDomestic={isDomestic() ? shippingQuote : undefined}
                    quoteIntl={!isDomestic() ? shippingQuote : undefined}
                    location={{
                      address: shippingAddress,
                      city: shippingCity,
                      state_code: shippingStateCode,
                      zip: shippingZip,
                    }}
                    onSubmit={(values) => {
                      close();
                      handleSubmit(values);
                    }}
                    index={`lot${lot.id}`}
                    orderSource="lot_page"
                    isPreorder={false}
                    lotPurchaseToken={lotPurchase?.token}
                  />
                ) : (
                  <>
                    <div>
                      <FormattedMessage id="lotPage.shipping.customQuote.tooltip.description" />
                    </div>
                    <CustomQuoteForm
                      onSubmit={(values) => {
                        handleSubmitCustomQuote(values);
                        close();
                      }}
                    />
                  </>
                )}
              </Suspense>
            )}
          </>
        )}
      </ContentPopover>
    </>
  );
}

CreateShippingOrder.propTypes = {
  lot: LotShape.isRequired,
  lotPurchase: LotPurchaseShape,
  setShippingOrder: PropTypes.func.isRequired,
};

CreateShippingOrder.defaultProps = {
  lotPurchase: {},
};

export default CreateShippingOrder;
