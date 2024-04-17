import BaseApiService from '../BaseApiService';

class BootstrapApiService extends BaseApiService {
  getBootstrapByApi() {
    return this.get(this.buildRequestPath('bootstrap', true)).then(({ data }) => data);
  }

  getCustomerBootstrapByApi() {
    return this.get(this.buildRequestPath('customer-bootstrap', true)).then((data) => data.data.bootstrap);
  }
}

export default new BootstrapApiService();
