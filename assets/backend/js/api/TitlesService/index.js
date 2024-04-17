import BaseApiService from '../BaseApiService';

class TitlesService extends BaseApiService {
  receiveTitle(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/title/receive`), payload).then(({ data }) => data);
  }

  searchLotPurchase(q) {
    return this.get(this.buildProtectedRequestPath(`api/v1/title/search-purchase/${q}`)).then(({ data }) => data);
  }

  purchases(id) {
    return this.get(this.buildProtectedRequestPath(`api/v1/title-receive/${id}/purchases`)).then(({ data }) => data);
  }

  handleDocument(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/title/handle-document`), payload).then(({ data }) => data);
  }

  getHandledDocumentDetails(token) {
    return this.get(this.buildProtectedRequestPath(`api/v1/title/handle-document/${token}`)).then(({ data }) => data);
  }

  getTitleReceiveReports() {
    return this.get(this.buildProtectedRequestPath(`api/v1/title-receive/reports`)).then(({ data }) => data);
  }

  addTitleReceiveReportNote(id, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/title-receive/${id}/add-note`), payload).then(
      ({ data }) => data,
    );
  }
}

export default TitlesService;
