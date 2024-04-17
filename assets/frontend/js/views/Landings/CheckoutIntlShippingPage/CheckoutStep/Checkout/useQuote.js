import { useState, useEffect } from 'react';
import RouterService from 'frontend/js/api/RouterService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

function useQuote() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestError, setIsRequestError] = useState(false);

  function getQuote() {
    const params = RouterService.getCurrentQueryParams();
    let payload = {};
    if (params.quote_id && params.ground_quote) {
      payload = { quote_id: params.quote_id, ground_quote: params.ground_quote };
    } else if (params.ref_id) {
      payload = { ref_id: params.ref_id };
    }

    if (Object.keys(payload).length) {
      setIsLoading(true);
      return ShippingOrderService.loadExistingOrder(payload)
        .then((response) => {
          setQuote(response);
        })
        .catch(() => {
          setIsRequestError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    setIsLoading(false);
    return true;
  }

  useEffect(() => {
    getQuote();
  }, []);

  return { quote, isLoading, isRequestError };
}

export default useQuote;
