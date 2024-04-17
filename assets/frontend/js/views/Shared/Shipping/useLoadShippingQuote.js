import { useContext, useEffect, useState } from 'react';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import useLoadPreorder from 'frontend/js/hooks/useLoadPreorder';

function useLoadShippingQuote(lot, preorderIsAvailable = true) {
  const { getQuoteParams, updateShippingQuote, quoteInformationIsDirty } = useContext(ShippingQuoteContext);
  const [isLoading, setIsLoading] = useState(false);
  const { loading: preorderLoading } = useLoadPreorder(lot.id, lot.inventoryAuction, preorderIsAvailable);

  async function getShippingQuote() {
    setIsLoading(true);
    try {
      const payload = getQuoteParams(lot);
      if (!ShippingOrderService.areQuoteParamsValid(payload)) {
        throw new Error('Not valid params');
      }
      const quote = await ShippingOrderService.getQuote(payload);
      updateShippingQuote(quote);
    } catch (error) {
      updateShippingQuote(null);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (quoteInformationIsDirty && !preorderLoading) {
      getShippingQuote();
    }
  }, [quoteInformationIsDirty, preorderLoading]);

  return isLoading;
}

export default useLoadShippingQuote;
