import RouterService from 'frontend/js/api/RouterService';
import PaymentService from 'frontend/js/api/PaymentService';

function usePaymentPayload(product, coupon) {
  const payload = {};

  if (coupon) {
    payload.couponCode = coupon.code;
  }

  // eslint-disable-next-line default-case
  switch (product) {
    case PaymentService.PRODUCT.INVOICE: {
      const { token } = RouterService.match('invoicePayment');
      payload.invoice = token;
      break;
    }
    case PaymentService.PRODUCT.SHIPPING: {
      const { token } = RouterService.match('shippingPayment');
      payload.shippingOrder = token;
      break;
    }
    case PaymentService.PRODUCT.DEPOSIT: {
      const amount = RouterService.getQueryParam('amount');
      payload.depositIncrease = String(amount);

      const maxPossibleBid = RouterService.getQueryParam('maxPossibleBid');
      if (maxPossibleBid > 0) {
        payload.maxPossibleBid = String(maxPossibleBid);
      }
      break;
    }
    case PaymentService.PRODUCT.MEMBERSHIP: {
      const { plan } = RouterService.match('membershipPayment');
      payload.newMembershipPlan = plan;
      break;
    }
    case PaymentService.PRODUCT.CV_REPORT: {
      payload.newCvReport = 1;
      break;
    }
  }

  const lotId = RouterService.getQueryParam('lotId');
  if (lotId) {
    payload.lotId = lotId;
  }

  const auction = RouterService.getQueryParam('auction');
  if (auction) {
    payload.auction = auction;
  }

  return payload;
}

export default usePaymentPayload;
