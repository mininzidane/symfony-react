import { useQuery } from 'react-query';
import get from 'lodash/get';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CustomerService from 'frontend/js/api/CustomerService';

function useNotificationSettings() {
  const { isAuthenticated } = useCustomerHelper();

  const { isLoading, data } = useQuery('customer-data', () => CustomerService.getCustomer(), {
    enabled: isAuthenticated,
  });

  const phone = get(data, 'customer.mobilePhone');
  const method = get(data, 'customer.metaInformation.saved_searches_default_type');
  const frequency = get(data, 'customer.metaInformation.saved_searches_default_frequency');

  const result = {
    phone,
    method,
    frequency,
  };

  return [result, isLoading && !data];
}

export default useNotificationSettings;
