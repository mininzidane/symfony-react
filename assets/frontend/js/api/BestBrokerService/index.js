import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const BestBrokerService = {
  getLots() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('best-broker/lots', true)).then(
      (res) => res.data,
    );
  },
};

export default BestBrokerService;
