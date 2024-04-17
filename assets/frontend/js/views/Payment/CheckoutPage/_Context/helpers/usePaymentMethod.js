import { useEffect, useState } from 'react';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import PaymentService from 'frontend/js/api/PaymentService';

function usePaymentMethod(options) {
  const [method, setMethod] = useState(null);
  const { activeCreditCardsCount } = useCustomerHelper();

  useEffect(() => {
    if (options) {
      let defaultMethod = options[0];

      if (activeCreditCardsCount > 0 && options.includes(PaymentService.METHOD.CREDIT_CARD)) {
        defaultMethod = PaymentService.METHOD.CREDIT_CARD;
      }

      setMethod(defaultMethod);
    }
  }, [options]);

  return [method, setMethod];
}

export default usePaymentMethod;
