import BaseApiService from '../BaseApiService';

class WonBidFakerService extends BaseApiService {
  createBid(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/won-bid-faker`), payload).then((data) => data.data);
  }
}

export default WonBidFakerService;
