import BaseApiService from '../BaseApiService';

class LotPurchaseService extends BaseApiService {
  reassignConsignment(lotPurchaseToken, payload) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/lot_purchase/${lotPurchaseToken}/reassign-consignment`),
      payload,
    ).then((data) => data);
  }

  reassignPurchase(lotPurchaseToken, payload) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/lot_purchase/${lotPurchaseToken}/reassign-purchase`),
      payload,
    ).then((data) => data.data);
  }

  getLotPurchaseByCustomerAndInventory(customer, auction, stockNumber) {
    return this.post(this.buildProtectedRequestPath(`api/v1/lot_purchase/details`), {
      customer,
      auction,
      stockNumber,
    }).then((data) => data.data);
  }
}

export default LotPurchaseService;
