import { useQuery } from 'react-query';
import get from 'lodash/get';
import InstantOfferService from 'frontend/js/api/InstantOfferService';

function useColorsOptions() {
  const { data } = useQuery('instant-offer-data', () => InstantOfferService.getColors());

  return get(data, 'color', []);
}

export default useColorsOptions;
