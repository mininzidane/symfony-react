import BaseApiService from '../BaseApiService';

class ClearVinService extends BaseApiService {
  getReportByVin(vin) {
    return this.get(this.buildProtectedRequestPath(`cv-report/vin-${vin}`));
  }
}
export default ClearVinService;
