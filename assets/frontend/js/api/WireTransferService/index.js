import BaseApiService from '../BaseApiService';

class WireTransferService extends BaseApiService {
  getWireTransferDetails(requestParams) {
    return this.get(this.buildRequestPath(`wire-transfers/upload${requestParams}`)).then(({ data }) => data);
  }

  uploadWireTransferConfirmationFiles(requestParams, payload) {
    return this.post(this.buildRequestPath(`wire-transfers/upload${requestParams}`), payload).then(({ data }) => data);
  }

  uploadPaymentConfirmation(type, queryString, payload) {
    return this.post(this.buildRequestPath(`payment-confirmation/upload/${type}${queryString}`, true), payload).then(
      ({ data }) => data,
    );
  }

  validateUploadRequestAccess(queryString) {
    return this.get(this.buildRequestPath(`payment-document/verify${queryString}`, true));
  }
}

export default WireTransferService;
