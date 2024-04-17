import * as axios from 'axios';
import BootstrapService from 'frontend/js/api/BootstrapService';
import RouterService from 'frontend/js/api/RouterService';
import LanguageService from 'frontend/js/api/LanguageService';

class BaseApiService {
  constructor() {
    this.locale = LanguageService.getCurrentLocale();
    this.apiBase = `/${this.locale}/data/v1/`;
    this.apiv2Base = `/${this.locale}/data/v2/`;
    this.statsApiBase = 'https://svc.autobidmaster.com/';
    this.externalEhApiBase = BootstrapService.getAppValue('easyhaulApiEndpoint', 'https://svc.easyhaul.com/api/v1/');
    this.externalApiBase = '/';
    this.externalToken = BootstrapService.getAppValue('easyhaulExternalToken', 'A2NWMP');
    this.httpClient = axios;
  }

  buildRequestPath(requestPath, v2 = false) {
    if (v2) {
      return this.apiv2Base + requestPath;
    }

    return this.apiBase + requestPath;
  }

  buildStatsRequestPath(requestPath) {
    return this.statsApiBase + requestPath;
  }

  buildExternalEhRequestPath(requestPath) {
    return this.externalEhApiBase + requestPath;
  }

  get(url, params = {}) {
    return this.httpClient.get(url, params);
  }

  post(url, payload = {}) {
    return this.httpClient.post(url, payload);
  }

  put(url, payload = {}) {
    return this.httpClient.put(url, payload);
  }

  patch(url, payload = {}) {
    return this.httpClient.patch(url, payload);
  }

  delete(url, payload = {}) {
    return this.httpClient.delete(url, { params: payload });
  }

  objectToQueryParams(obj, attachExternalToken = false) {
    const params = { ...obj };
    if (attachExternalToken && !params.token) {
      params.token = this.externalToken;
    }

    return RouterService.serializeQueryParams(params);
  }
}

export const BaseApiServiceInstance = new BaseApiService();

export default BaseApiService;
