import { useQuery } from 'react-query';
import ValidationService from 'backend/js/lib/ValidationService';
import InstantOfferService from 'backend/js/api/InstantOfferService';

function useBankName(routingNumber, opts) {
  const instantOfferService = new InstantOfferService();
  const result = useQuery(['routingNumber', routingNumber], () => instantOfferService.routingNumber(routingNumber), {
    ...opts,
    enabled: (opts?.enabled ?? true) && ValidationService.bankRoutingNumber.test(String(routingNumber).trim()),
    retry: 1,
  });

  return [result.data?.name, result.isLoading];
}

export default useBankName;
