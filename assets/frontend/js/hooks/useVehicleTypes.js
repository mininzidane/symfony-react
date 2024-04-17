import { useQuery } from 'react-query';
import get from 'lodash/get';
import LotService from 'frontend/js/api/LotService';

function useVehicleTypes() {
  const { data } = useQuery('vehicle-types-data', () => LotService.getVehicleTypes());

  return get(data, 'vehicle_type.values.all', []);
}

export default useVehicleTypes;
