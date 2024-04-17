import { useQuery } from 'react-query';
import CustomerService from 'backend/js/api/CustomerService';

function useCustomer(customerId) {
  const { data, isLoading } = useQuery(
    ['customer-data', customerId],
    () => new CustomerService().getCustomer(customerId),
    {},
  );

  return [data?.customer, isLoading];
}

export default useCustomer;
