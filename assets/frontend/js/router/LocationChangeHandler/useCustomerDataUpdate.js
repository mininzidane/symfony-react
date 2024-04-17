import { useQuery } from 'react-query';
import { useEffect } from 'react';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CustomerService from 'frontend/js/api/CustomerService';

function useCustomerDataUpdate() {
  const { setCustomer } = useCustomerHelper();
  const { data, isStale, isLoading, refetch } = useQuery('customer-object', () => CustomerService.getCustomer(), {
    cacheTime: 5 * 1000,
    staleTime: 5 * 1000,
    structuralSharing: false,
    notifyOnChangePropsExclusions: [],
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const { isLoggedIn, customer } = data;

    if (window.customer?.id !== customer?.id) {
      RouterService.reload();
    } else if (isLoggedIn) {
      setCustomer(customer);
    }
  }, [data]);

  return () => {
    if (isStale && !isLoading) {
      refetch();
    }
  };
}

export default useCustomerDataUpdate;
