import { useQuery } from 'react-query';
import get from 'lodash/get';
import CurrencyService from 'frontend/js/api/CurrencyService';

function useExchangeRate(currency) {
  const { data } = useQuery(['exchange-rate-query', currency], () => CurrencyService.getExchangeRate(currency), {
    enabled: Boolean(currency),
  });

  return get(data, 'exchangeRate');
}

export default useExchangeRate;
