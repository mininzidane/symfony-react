import BaseApiService from '../BaseApiService';

class AlertsService extends BaseApiService {
  createAlert(payload) {
    return this.post(this.buildRequestPath('alert', true), payload).then(({ data }) => data);
  }
}

export default AlertsService;
