import get from 'lodash/get';
import { useQuery } from 'react-query';
import LotService from 'backend/js/api/LotService';

function useVehicleHistory(vehicleVin) {
  const { data, isLoading } = useQuery(['acp-sales-history', vehicleVin], () => LotService.getHistory(vehicleVin), {
    enabled: Boolean(vehicleVin),
    cacheTime: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return [get(data, 'lots'), isLoading];
}

export default useVehicleHistory;
