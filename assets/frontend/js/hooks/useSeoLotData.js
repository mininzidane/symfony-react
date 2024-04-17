import get from 'lodash/get';
import { useQuery } from 'react-query';
import LotService from 'frontend/js/api/LotService';

function useSeoLotData(lotId, auction) {
  const payload = { lotId, auction };
  const { data = {}, isLoading } = useQuery(['seo-content-data', payload], () => LotService.getSeoContent(payload), {
    enabled: Boolean(lotId),
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return [get(data, 'seo', {}), isLoading];
}

export default useSeoLotData;
