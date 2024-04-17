import { useQuery } from 'react-query';
import LotService from 'frontend/js/api/LotService';

function usePopularSearches(marketKey) {
  const { data = [] } = useQuery(['popular_searches', marketKey], () => LotService.getPopularSearches(marketKey), {});

  return { popularSearches: data };
}

export default usePopularSearches;
