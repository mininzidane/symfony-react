import LotService from 'frontend/js/api/LotService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function useCounterBiddingAvailable(lot) {
  const { consignments } = useCustomerHelper();
  const isCopartAuction = lot?.inventoryAuction === LotService.AUCTION_COPART;
  return Boolean(isCopartAuction && consignments?.includes(String(lot.id)));
}

export default useCounterBiddingAvailable;
