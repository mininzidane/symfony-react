import { useMemo } from 'react';
import PaymentService from 'frontend/js/api/PaymentService';

function useInvoiceType(invoice) {
  return useMemo(() => {
    let isLotPurchase = false;
    let isShipping = false;
    let isMembership = false;
    let isShippingACP = false;
    let isLotPurchaseACP = false;

    if (!invoice) {
      return { isShipping, isLotPurchase, isMembership, isShippingACP, isLotPurchaseACP };
    }

    isLotPurchase = Boolean(invoice.lotPurchase);
    isShipping = Boolean(invoice.shippingOrder);

    if (!isShipping && !isLotPurchase) {
      const membershipMap = [
        PaymentService.PRODUCT_SERVICE.MEMBERSHIP_AUTO_RENEWAL_BASIC,
        PaymentService.PRODUCT_SERVICE.MEMBERSHIP_AUTO_RENEWAL_ADVANCED,
        PaymentService.PRODUCT_SERVICE.MEMBERSHIP_AUTO_RENEWAL_PREMIUM,
        PaymentService.PRODUCT_SERVICE.MEMBERSHIP_UPGRADE_BASIC,
        PaymentService.PRODUCT_SERVICE.MEMBERSHIP_UPGRADE_ADVANCED,
        PaymentService.PRODUCT_SERVICE.MEMBERSHIP_UPGRADE_PREMIUM,
        PaymentService.PRODUCT_SERVICE.ADVANCED_TO_PREMIUM_UPGRADE,
      ];
      isMembership = invoice.items.some((item) => membershipMap.includes(item?.productService?.objectKey));

      if (!isMembership) {
        isShippingACP = invoice.items.some(
          (item) => PaymentService.PRODUCT_SERVICE.GROUND_TRANSPORTATION === item?.productService?.objectKey,
        );
        isLotPurchaseACP = invoice.items.some(
          (item) => PaymentService.PRODUCT_SERVICE.AUCTION_FINAL_BID === item?.productService?.objectKey,
        );
        if (isShippingACP && isLotPurchaseACP) {
          isLotPurchaseACP = false;
          isShippingACP = false;
        }
      }
    }

    return { isShipping, isLotPurchase, isMembership, isShippingACP, isLotPurchaseACP };
  }, [invoice]);
}

export default useInvoiceType;
