import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';

function useToolbarBuyerPower() {
  const { id: customerId, blAmount, blUsedAmount, isAuthenticated } = useCustomerHelper();
  const buyerPowerAmount = blAmount - blUsedAmount;
  const isBadgeShown =
    isAuthenticated && buyerPowerAmount === 0 && !LocalStorageService.get(`user${customerId}_is_bp_visited`);

  return { buyerPowerAmount, isBadgeShown };
}

export default useToolbarBuyerPower;
