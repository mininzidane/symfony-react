import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const PurchaseService = {
  cancelPurchase(token, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`purchase/${token}/cancel`, true),
      payload,
    ).then(({ data }) => data);
  },
  getCancellationFee(token) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`purchase/${token}/cancellation-fee`, true),
    ).then(({ data }) => data);
  },
};

PurchaseService.VEHICLE_STATUSES = {
  RELISTED: 'Relisted',
};

export default PurchaseService;
