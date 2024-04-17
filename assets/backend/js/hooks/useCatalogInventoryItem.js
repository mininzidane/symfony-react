import { useQuery } from 'react-query';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import InventoryService from 'backend/js/api/InventoryService';

function useCatalogInventoryItem(idOrVin, opts = {}) {
  const { data, isLoading } = useQuery(
    ['catalog-inventory-item-data', String(idOrVin)],
    () => InventoryService.getCatalogInventoryItem(String(idOrVin)),
    { enabled: ValidationService.validateStockNumber(idOrVin) || ValidationService.validateVin(idOrVin), ...opts },
  );

  return [data?.lots || [], isLoading];
}

export default useCatalogInventoryItem;
