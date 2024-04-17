import { useQuery } from 'react-query';
import LotService from 'frontend/js/api/LotService';
import ValidationService from 'frontend/js/lib/utils/ValidationService';

function useVinDecode(vin, opts = {}) {
  const { data, isLoading } = useQuery(['vin-decode-data', vin], () => LotService.vinDecode(vin), {
    enabled: ValidationService.validateVin(vin),
    ...opts,
  });

  return [data, isLoading];
}

export default useVinDecode;
