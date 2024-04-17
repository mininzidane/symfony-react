import BaseApiService from '../BaseApiService';

class SiteMetaService extends BaseApiService {
  getSiteMessageInformation(messageType) {
    return this.get(this.buildProtectedRequestPath(`api/v1/site-meta/site-message?messageType=${messageType}`)).then(
      ({ data }) => data,
    );
  }

  submitSiteMessageInformation(payload = {}) {
    return this.post(this.buildProtectedRequestPath('api/v1/site-meta/site-message'), payload).then(({ data }) => data);
  }
}

export default SiteMetaService;
