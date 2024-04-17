import get from 'lodash/get';
import { useQuery } from 'react-query';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import LotService from 'backend/js/api/LotService';

function useLot(idOrVin, auction, customerId, opts = {}) {
  const payload = { query: String(idOrVin), auction, customerId };

  const { data, isLoading, refetch } = useQuery(['lot-info-data', payload], () => LotService.getLotInfo(payload), {
    enabled: ValidationService.validateStockNumber(idOrVin) || ValidationService.validateVin(idOrVin),
    ...opts,
  });

  return [get(data, 'lot'), isLoading, refetch];
}

export default useLot;
