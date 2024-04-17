import get from 'lodash/get';
import { useQuery } from 'react-query';
import CustomerService from 'frontend/js/api/CustomerService';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

function useEmailExistenceCheck(email, opts = {}) {
  const { data, isLoading } = useQuery(['check-email-existence', email], () => CustomerService.checkEmail(email), {
    enabled: ValidationService.validateEmail(email),
    ...opts,
  });

  return [get(data, 'exists'), isLoading];
}

export default useEmailExistenceCheck;
