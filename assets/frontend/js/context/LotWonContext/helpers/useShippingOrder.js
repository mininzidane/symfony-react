import { useState } from 'react';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import useServerError from 'frontend/js/hooks/useServerError';

function useShippingOrder(invoice) {
  const [isRemoved, setIsRemoved] = useState(false);
  const [currentShippingOrder, setCurrentShippingOrder] = useState(null);
  const { errorMsg, resetError, extractAndSetErrorMsg } = useServerError();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitCancellation, setIsSubmitCancellation] = useState(false);
  const [isSubmittedCustomQuote, setIsSubmittedCustomQuote] = useState(false);
  const { lotPurchase, shippingOrder: shipping } = invoice;

  let shippingOrder = null;
  if (!isRemoved) {
    if (currentShippingOrder) {
      shippingOrder = currentShippingOrder;
    } else if (lotPurchase?.activeShippingOrder) {
      shippingOrder = lotPurchase.activeShippingOrder;
      shippingOrder.lotPurchase = lotPurchase;
    } else if (lotPurchase?.cancelledAndUnpaidShippingOrder) {
      shippingOrder = lotPurchase.cancelledAndUnpaidShippingOrder;
    } else if (!lotPurchase && shipping) {
      shippingOrder = shipping;
    }
  }

  function changeShippingOrder(newShippingOrder) {
    resetError();
    setIsRemoved(false);
    setCurrentShippingOrder(newShippingOrder);
  }

  async function removeShippingOrder(token) {
    resetError();
    try {
      setIsLoading(true);
      setIsSubmitCancellation(true);
      await ShippingOrderService.removeShippingOrder(token);
      setIsRemoved(true);
    } catch (error) {
      extractAndSetErrorMsg(error);
    }
    setIsLoading(false);
  }

  async function submitCustomShippingQuote(payload) {
    resetError();
    setIsLoading(true);
    try {
      await ShippingOrderService.submitCustomQuoteRequest(payload);
      setIsSubmittedCustomQuote(true);
    } catch (error) {
      extractAndSetErrorMsg(error);
    }
    setIsLoading(false);
  }

  function getShippingQuoteDestination() {
    const shippingQuote = shippingOrder?.orderInformation?.quote;
    if (shippingQuote) {
      if (shippingQuote.type === ShippingOrderService.TypeInternational) {
        return {
          type: shippingQuote.type,
          port: shippingOrder?.destinationName,
          country: shippingOrder?.destinationCountryName,
          usPort: shippingOrder?.originName,
          usState: shippingOrder?.destinationName?.split(',')[1]?.trim() || null,
        };
      }
      if (shippingQuote.type === ShippingOrderService.TypeDomestic) {
        return {
          type: shippingQuote.type,
          city: shippingOrder?.destinationCity,
          state: shippingOrder?.destinationState,
          zip: shippingOrder?.destinationZip,
        };
      }
      if (shippingQuote.type === ShippingOrderService.TypeBorderCrossing) {
        return {
          type: shippingQuote.type,
          city: shippingOrder?.destinationName,
          usState: shippingOrder?.originName,
        };
      }
    }
    return {};
  }

  const orderToken = shippingOrder && shippingOrder.token;
  const isCancelled = shippingOrder && shippingOrder.orderStatus === ShippingOrderService.Status.Cancelled;
  const isActiveOrder =
    orderToken &&
    (!isCancelled || (shippingOrder && !shippingOrder.paid && shippingOrder.invoice?.balanceRemaining > 0));

  return {
    shippingOrder,
    isActiveOrder,
    isCancelled,
    isRemoved,
    isLoading,
    isSubmitCancellation,
    isSubmittedCustomQuote,
    errorMsg,
    resetError,
    changeShippingOrder,
    removeShippingOrder,
    submitCustomShippingQuote,
    getShippingQuoteDestination,
  };
}

export default useShippingOrder;
