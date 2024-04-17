import { useContext } from 'react';
import BillingInformationContext from './BillingInformationContext';

function useBillingInformationContext() {
  return useContext(BillingInformationContext);
}

export default useBillingInformationContext;
