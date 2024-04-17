import BaseApiService from '../BaseApiService';

class FlashMessagesService extends BaseApiService {
  getFlashMessages() {
    return this.get(this.buildRequestPath(`flash-messages`, true)).then(({ data }) => data);
  }
}

export default FlashMessagesService;
