import PurchaseService from 'frontend/js/api/PurchaseService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function useRelistAvailable(lotPurchase, invoice) {
  const { blAmountFixed, balance, customerParent, isBusinessMembership } = useCustomerHelper();
  const isB2BCustomer = isBusinessMembership || customerParent !== null;
  const isVehicleRelisted = lotPurchase?.vehicleStatus === PurchaseService.VEHICLE_STATUSES.RELISTED;
  return (
    !isB2BCustomer &&
    !isVehicleRelisted &&
    lotPurchase?.eligibleForRelistByAuction &&
    Boolean(lotPurchase) &&
    !invoice.paid &&
    parseFloat(invoice.amountApplied) === 0 &&
    (!blAmountFixed || (blAmountFixed && parseInt(balance, 10) > 0))
  );
}

export default useRelistAvailable;
