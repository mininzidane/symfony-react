import { useQuery } from 'react-query';
import get from 'lodash/get';
import CreditCardsService from 'frontend/js/api/CreditCardsService';

function useCreditCard(token) {
  const { data, isLoading, refetch } = useQuery(
    ['credit-card-data', token],
    () => CreditCardsService.getCreditCard(token),
    { cacheTime: 0, enabled: false },
  );

  return [refetch, data && get(data, 'creditCard', null), isLoading];
}

export default useCreditCard;
