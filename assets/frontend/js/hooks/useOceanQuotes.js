import { useQuery } from 'react-query';
import get from 'lodash/get';
import QuoteService from 'frontend/js/api/QuoteService';
import CountryService from 'frontend/js/api/CountryService';

function useOceanQuotes(iso2 = CountryService.getUserCountryIso2()) {
  const { data } = useQuery(['ocean-quotes-data', iso2], () => QuoteService.getQuotes(iso2));

  const quotes = get(data, 'quotes', []);
  const destination = get(data, 'destination');

  return { quotes, destination };
}

export default useOceanQuotes;
