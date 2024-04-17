import BaseApiService from '../BaseApiService';

class SeoContentService extends BaseApiService {
  getSeoContent(seoContentId) {
    return this.get(this.buildProtectedRequestPath(`api/v1/seo-content/${seoContentId}`)).then((data) => data.data);
  }

  createSeoContent(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/seo-content`), payload).then((data) => data.data);
  }

  updateSeoContent(seoContentId, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/seo-content/${seoContentId}`), payload).then(
      (data) => data.data,
    );
  }

  deleteSeoContent(seoContentId) {
    return this.delete(this.buildProtectedRequestPath(`api/v1/seo-content/${seoContentId}`)).then((data) => data.data);
  }

  getAvailableParents() {
    return this.get(this.buildProtectedRequestPath(`api/v1/seo-content/parents`)).then((data) => data.data);
  }
}

export default SeoContentService;
