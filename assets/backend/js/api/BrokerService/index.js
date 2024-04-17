import { BaseApiServiceInstance } from 'backend/js/api/BaseApiService';

const BrokerService = {
  addBidder({ brokerId, ...payload }) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/customer-parent/${brokerId}/add-bidder`),
      payload,
    ).then((data) => data.data);
  },
};

export default BrokerService;
