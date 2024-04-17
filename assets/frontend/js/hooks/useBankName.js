import { useQuery } from 'react-query';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import RoutingService from 'frontend/js/api/RoutingService';

function useBankName(routingNumber, opts) {
  const routingService = new RoutingService();
  const result = useQuery(['routingNumber', routingNumber], () => routingService.routingNumber(routingNumber), {
    ...opts,
    enabled: (opts?.enabled ?? true) && ValidationService.bankRoutingNumberRegex.test(String(routingNumber).trim()),
    retry: 1,
  });

  return [result.data?.name, result.isLoading];
}

export default useBankName;
