import get from 'lodash/get';
import { useQuery } from 'react-query';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CustomerService from 'frontend/js/api/CustomerService';

function useCustomer() {
  const { isAuthenticated } = useCustomerHelper();

  const { data, isLoading } = useQuery('customer-data', () => CustomerService.getCustomer(), {
    enabled: isAuthenticated,
  });

  return [get(data, 'customer'), isLoading];
}

export default useCustomer;
