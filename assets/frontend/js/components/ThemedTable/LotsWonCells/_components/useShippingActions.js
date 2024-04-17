import { useContext } from 'react';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function useShippingActions() {
  const { invoice, shippingOrder: currentShippingOrder } = useLotWonContext();
  const { id, isB2BBroker } = useCustomerHelper();
  const { shippingQuote } = useContext(ShippingQuoteContext);
  const { shippingOrder, isActiveOrder, isCancelled } = currentShippingOrder;

  if (!invoice) {
    return {};
  }

  const { lotPurchase, customer } = invoice;

  const isLotPurchase = Boolean(lotPurchase);
  const isUserPurchase = id === customer.id || isB2BBroker;
  const shippingOrderToken = shippingOrder && shippingOrder.token;

  const displayShipping = isLotPurchase && (shippingOrder || !lotPurchase.pickedUp);
  const displayCustomOrder = displayShipping && !shippingQuote && !isActiveOrder;
  const displayPlaceOrder =
    displayShipping && shippingQuote && isUserPurchase && (!shippingOrderToken || (shippingOrderToken && isCancelled));
  const displayTrackMyOrder = isActiveOrder;

  return {
    displayCustomOrder,
    displayPlaceOrder,
    displayTrackMyOrder,
  };
}

export default useShippingActions;
