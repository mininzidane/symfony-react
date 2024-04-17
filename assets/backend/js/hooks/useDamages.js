import { useQuery } from 'react-query';
import PriceHistoryService from 'backend/js/api/PriceHistoryService';

function useDamages(opts = {}) {
  const { data, isLoading } = useQuery(['damages-data'], () => new PriceHistoryService().getLotSoldDamages(), opts);

  return [data?.damages || [], isLoading];
}

export default useDamages;
