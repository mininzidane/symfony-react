import { useQuery } from 'react-query';
import PriceHistoryService from 'backend/js/api/PriceHistoryService';

function useLocations(opts = {}) {
  const { data, isLoading } = useQuery(['locations-data'], () => new PriceHistoryService().getLotSoldLocations(), opts);

  return [data?.locations || [], isLoading];
}

export default useLocations;
