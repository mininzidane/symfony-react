import BaseApiService from '../BaseApiService';

class SiteMetaService extends BaseApiService {
  getGeneralMessage() {
    return this.get(this.buildRequestPath(`site-meta/general-message`, true)).then(({ data }) => data);
  }
}

export default SiteMetaService;
