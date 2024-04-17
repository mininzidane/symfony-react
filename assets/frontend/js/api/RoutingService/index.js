import BaseApiService from '../BaseApiService';

class RoutingService extends BaseApiService {
  routingNumber = (value) => this.get(this.buildRequestPath(`routing/${value}/number`, true)).then(({ data }) => data);
}

export default RoutingService;
