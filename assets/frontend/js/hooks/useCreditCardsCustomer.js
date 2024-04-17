import { useQuery } from 'react-query';
import get from 'lodash/get';
import CreditCardsService from 'frontend/js/api/CreditCardsService';

function useCreditCardsCustomer(includeBin = false) {
  const { data, isLoading } = useQuery(['credit-cards-data', includeBin], () =>
    CreditCardsService.getCreditCards(includeBin),
  );

  return [get(data, 'creditCards', []), isLoading];
}

export default useCreditCardsCustomer;
