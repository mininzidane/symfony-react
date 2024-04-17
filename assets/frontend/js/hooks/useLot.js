import get from 'lodash/get';
import { useQuery } from 'react-query';
import LotService from 'frontend/js/api/LotService';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

function useLot(idOrVin, auction, withNavData = false, opts = {}) {
  const { data, isLoading } = useQuery(
    ['lot-info-data', `Lot:${idOrVin}_${auction?.toLowerCase()}`],
    () => LotService.getLotInfo({ query: String(idOrVin), auction: auction?.toLowerCase(), navdata: true }),
    {
      enabled:
        LotService.FAKE_LOT_ID !== idOrVin &&
        (ValidationService.validateStockNumber(idOrVin) || ValidationService.validateVin(idOrVin)),
      cacheTime: 5 * 60 * 1000,
      staleTime: 15 * 1000,
      ...opts,
    },
  );

  return [withNavData ? data : get(data, 'lot'), isLoading];
}

export default useLot;
