import BaseApiService from '../BaseApiService';
import RouterService from '../RouterService';

const { serializeQueryParams } = RouterService;

class CustomerNotesService extends BaseApiService {
  addNote(formData) {
    return this.post(this.buildRequestPath(`customer-notes/inventory`, true), formData).then((data) => data.data);
  }

  getAllNotes(params) {
    return this.get(this.buildRequestPath(`customer-notes/inventory?${serializeQueryParams(params)}`, true)).then(
      (data) => data.data,
    );
  }

  markAsRead(stockNumber, auction, timestamp) {
    return this.post(this.buildRequestPath('customer-notes/mark-as-read', true), {
      stockNumber,
      auction,
      timestamp,
    }).then((data) => data.data);
  }

  getNoteStats(params) {
    return this.get(this.buildRequestPath(`customer-notes/inventory-stats?${serializeQueryParams(params)}`, true)).then(
      (data) => data.data,
    );
  }
}

export default CustomerNotesService;
