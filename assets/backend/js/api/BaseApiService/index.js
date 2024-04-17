import * as axios from 'axios';
import get from 'lodash/get';
import BootstrapService from 'backend/js/api/BootstrapService';

export default class BaseApiService {
  constructor() {
    this.locale = 'en';
    this.apiBase = `/${this.locale}/data/v1/`;
    this.apiv2Base = `/${this.locale}/data/v2/`;
    this.externalEhApiBase = BootstrapService.getAppValue('easyhaulApiEndpoint', 'https://svc.easyhaul.com/api/v1/');
    this.protectedPath = '/abm-acp/';
    this.httpClient = axios;
    this.externalEhToken = BootstrapService.getAppValue('easyhaulExternalToken', 'A2NWMP');
  }

  buildRequestPath(requestPath, v2 = false) {
    if (v2) {
      return this.apiv2Base + requestPath;
    }

    return this.apiBase + requestPath;
  }

  buildProtectedRequestPath(requestPath) {
    return this.protectedPath + requestPath;
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

  delete(url, params = {}) {
    return this.httpClient.delete(url, params);
  }

  put(url, payload = {}) {
    return this.httpClient.put(url, payload);
  }

  static objectToQueryParams(obj) {
    const params = {
      ...obj,
    };

    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  static getFilenameFromResponse(response = {}) {
    const contentDisposition = get(response, 'headers.content-disposition');
    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        return matches[1].replace(/['"]/g, '');
      }
    }

    return null;
  }

  static createDownloadFromResponse(response, fileName = 'file.txt') {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  }

  static parseErrorResponse(serverError, defaultMessage = 'An error occurred while processing this request.') {
    if (serverError) {
      const errors = get(serverError, 'response.data.errors', {});
      if (errors) {
        const parsedErrors = [];
        Object.keys(errors).forEach((key) => {
          if (key !== 'error') {
            parsedErrors.push(errors[key]);
          }
        });

        return Object.values(parsedErrors.length ? parsedErrors : errors).join(' ');
      }
    }

    return defaultMessage;
  }
}

export const BaseApiServiceInstance = new BaseApiService();
