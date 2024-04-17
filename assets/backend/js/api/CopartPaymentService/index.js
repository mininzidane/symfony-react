import BaseApiService from '../BaseApiService';

class CopartPaymentService extends BaseApiService {
  processPayment(id, method) {
    return this.post(this.buildProtectedRequestPath(`api/v1/copart-payment/${id}/process/${method}`)).then(
      (data) => data,
    );
  }
}

export default CopartPaymentService;
