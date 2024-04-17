import { useQuery } from 'react-query';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';

function useUSPorts(destinationId, coords = {}) {
  const payload = { destinationId, ...coords };

  const { data } = useQuery(['us-ports-data', payload], () => ShippingOrderService.getUSPorts(payload), {
    enabled: Boolean(destinationId && coords.lat && coords.lon),
    cacheTime: 15 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return data || [];
}

export default useUSPorts;
