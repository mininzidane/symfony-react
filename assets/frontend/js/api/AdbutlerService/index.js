import BaseApiService from '../BaseApiService';

class AdbutlerService extends BaseApiService {
  getAdvertisement(url) {
    return this.get(url).then(({ data }) => data);
  }
}

export default AdbutlerService;
