import BaseApiService from '../BaseApiService';

class CreditCardService extends BaseApiService {
  edit(token, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/edit-card/${token}`), payload).then((data) => data);
  }
}

export default CreditCardService;
