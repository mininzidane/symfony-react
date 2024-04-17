import BaseApiService from '../BaseApiService';

class DynamicPageService extends BaseApiService {
  createDynamicPage(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/dynamic-pages`), payload).then((data) => data.data);
  }

  updateDynamicPage(dynamicPageId, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/dynamic-pages/${dynamicPageId}`), payload).then(
      (data) => data.data,
    );
  }

  deleteDynamicPage(dynamicPageId) {
    return this.delete(this.buildProtectedRequestPath(`api/v1/dynamic-pages/${dynamicPageId}`)).then(
      (data) => data.data,
    );
  }
}

DynamicPageService.imageUploadUrl = '/abm-acp/api/v1/dynamic-pages/upload-image';

export default DynamicPageService;
