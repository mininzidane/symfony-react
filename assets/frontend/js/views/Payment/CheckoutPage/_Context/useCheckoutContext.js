import { useContext } from 'react';
import CheckoutContext from './CheckoutContext';

function useCheckoutContext() {
  return useContext(CheckoutContext);
}

export default useCheckoutContext;
