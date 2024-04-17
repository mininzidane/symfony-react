import { useQueryClient, useQuery } from 'react-query';
import get from 'lodash/get';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import LotService from 'frontend/js/api/LotService';

function useLoadPreorder(lotId, auction = null, preorderIsAvailable = true) {
  const id = parseInt(lotId, 10);
  const { customer } = window;
  const queryClient = useQueryClient();

  const payload = { id, auction };

  const { data, isLoading } = useQuery(
    ['lot-preorder-data', payload],
    () => ShippingOrderService.getLotPreorder(payload),
    {
      enabled:
        LotService.FAKE_LOT_ID !== lotId &&
        preorderIsAvailable &&
        Boolean(customer && customer.id) &&
        ValidationService.validateStockNumber(id),
    },
  );
  const { shippingOrder: preorder } = data || {};
  const hasPreorder = Boolean(get(preorder, 'orderInformation', false));

  function handlePreorderUpdate(updatedOrder) {
    const existingPreorder = preorder || {};

    queryClient.setQueryData(['lot-preorder-data', payload], {
      shippingOrder: {
        ...existingPreorder,
        ...updatedOrder,
      },
    });
  }

  return { preorder, loading: isLoading, hasPreorder, handlePreorderUpdate };
}

export default useLoadPreorder;
