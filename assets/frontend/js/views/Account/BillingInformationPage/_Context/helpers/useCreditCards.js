import { useQuery } from 'react-query';
import get from 'lodash/get';
import CreditCardsService from 'frontend/js/api/CreditCardsService';

function useCreditCards() {
  const { data, isLoading, refetch } = useQuery('credit-cards-data', () => CreditCardsService.getCreditCards(), {
    cacheTime: 0,
    enabled: false,
  });

  return [refetch, data && get(data, 'creditCards', []), isLoading];
}

export default useCreditCards;
