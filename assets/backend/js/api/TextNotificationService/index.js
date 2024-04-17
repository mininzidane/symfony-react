import BaseApiService from '../BaseApiService';

class TextNotificationService extends BaseApiService {
  getTextNotifications(locale) {
    return this.get(this.buildProtectedRequestPath(`api/v1/text-notifications?locale=${locale}`)).then(
      ({ data }) => data,
    );
  }
}

export default TextNotificationService;
