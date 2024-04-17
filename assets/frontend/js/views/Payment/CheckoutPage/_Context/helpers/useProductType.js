import PaymentService from 'frontend/js/api/PaymentService';
import RouterService from 'frontend/js/api/RouterService';

function useProductType() {
  if (RouterService.test('invoicePayment') && RouterService.getQueryParam('purchaseWithShipping')) {
    return PaymentService.PRODUCT.PURCHASE_WITH_SHIPPING;
  }

  if (RouterService.test('invoicePayment')) {
    return PaymentService.PRODUCT.INVOICE;
  }

  if (RouterService.test('shippingPayment')) {
    return PaymentService.PRODUCT.SHIPPING;
  }

  if (RouterService.test('buyerPowerPayment')) {
    return PaymentService.PRODUCT.DEPOSIT;
  }

  if (RouterService.test('membershipPayment')) {
    return PaymentService.PRODUCT.MEMBERSHIP;
  }

  if (RouterService.test('cvReportPayment')) {
    return PaymentService.PRODUCT.CV_REPORT;
  }

  return PaymentService.PRODUCT.DEPOSIT;
}

export default useProductType;
