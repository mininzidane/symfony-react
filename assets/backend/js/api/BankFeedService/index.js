import BaseApiService from '../BaseApiService';

class BankFeedService extends BaseApiService {
  getPayment(id) {
    return this.get(this.buildProtectedRequestPath(`api/v1/bank-feed/${id}`)).then((data) => data);
  }

  submitPayment(id, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/bank-feed/${id}/submit-payment`), payload).then(
      (data) => data,
    );
  }
}

export default BankFeedService;
